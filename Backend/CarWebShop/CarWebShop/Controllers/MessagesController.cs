﻿using Microsoft.AspNetCore.Mvc;
using CarWebShop.Data;
using CarWebShop.Dto;
using CarWebShop.Utilities;
using Microsoft.Data.SqlClient;
using CarWebShop.Repository;
using CarWebShop.Interfaces;
using System.Text.Json;

namespace CarWebShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : Controller
    {
        private readonly UserUtility _userUtility;
        private readonly IConfiguration _configuration;
        private readonly DataContext _dataContext;
        private readonly IMessagesRepository _messagesRepository;
        private readonly WebSocketConnectionManager _webSocketManager;
        public MessagesController(DataContext dataContext, UserUtility userUtility, IConfiguration configuration, IMessagesRepository messagesRepository, WebSocketConnectionManager webSocketManager)
        {
            _configuration = configuration;
            _userUtility = userUtility;
            _dataContext = dataContext;
            _messagesRepository = messagesRepository;
            _webSocketManager = webSocketManager;
        }
        [HttpPut("OpenMessage")]
        public IActionResult openMessage(OpenMessageDto openMessageDto)
        {
            string connectionString = _configuration.GetConnectionString("DefaultConnection");
            string query = "UPDATE Messages SET IsNew = 0 WHERE MessageID = @MessageID";
            SqlConnection sqlConnection = new SqlConnection(connectionString);
            sqlConnection.Open();
            using (SqlCommand command = new SqlCommand(query, sqlConnection))
            {
                command.Parameters.AddWithValue("@MessageID", openMessageDto.MessageID);
                int rowsAffected = command.ExecuteNonQuery();

                if (rowsAffected > 0)
                {
                    return Ok();
                }
                else return BadRequest();
            }
     
        }   
      
        [HttpPost("SendMessage")]
        public async Task<IActionResult> sendMessage(MessageDto messageDto)
        {
            int receiverID = _userUtility.GetUserIdByUsername(messageDto.ReceiverUsername);
            int senderID = _userUtility.GetUserIdByUsername(messageDto.SenderUsername);


            
            
            string connectionString = _configuration.GetConnectionString("DefaultConnection");
            SqlConnection sqlConnection = new SqlConnection(connectionString);
            sqlConnection.Open();
            string query = "INSERT INTO Messages(SenderID, ReceiverID, AdverID, DateSent, Message, InitialSenderID, IsNew) VALUES (@SenderID, @ReceiverID, @AdverID, GetDate(), @Message, @InitialSenderID, @IsNew)";
          
            using (SqlCommand command = new SqlCommand(query, sqlConnection))
            {
                int initialSenderID = senderID;
                
                string checkForInitialMessage = "SELECT TOP 1 InitialSenderID FROM Messages WHERE AdverID = @AdverID AND (SenderID = @SenderID OR ReceiverID = @SenderID)";
                using (SqlCommand checkCommand = new SqlCommand(checkForInitialMessage, sqlConnection))
                {
                    checkCommand.Parameters.AddWithValue("@AdverID", messageDto.AdverID);
                    checkCommand.Parameters.AddWithValue("@SenderID", senderID);
                   
                    object result = await checkCommand.ExecuteScalarAsync();

                    if (result != null)
                    {
                       
                        initialSenderID = Convert.ToInt32(result);
                       
                    }
                    else
                    {
                       
                        initialSenderID = senderID;
                      
                    }
                }
               


                command.Parameters.AddWithValue("@SenderID", senderID);
                command.Parameters.AddWithValue("@ReceiverID", receiverID);
                command.Parameters.AddWithValue("@AdverID", messageDto.AdverID);
                command.Parameters.AddWithValue("@Message",  messageDto.Message);
                command.Parameters.AddWithValue("@InitialSenderID", initialSenderID);
                command.Parameters.AddWithValue("@IsNew", true);
                int rowsAffected = command.ExecuteNonQuery();
                if (rowsAffected > 0)
                {
                    string updateNewMessagesQuery = "UPDATE Users SET NewMessages = NewMessages + 1 WHERE UserName = @ReceiverUsername";
                    using(SqlCommand updateNewMessagesCommand = new SqlCommand(updateNewMessagesQuery, sqlConnection))
                    {
                        updateNewMessagesCommand.Parameters.AddWithValue("@ReceiverUsername", messageDto.ReceiverUsername);
                        int updateRowsAffected = updateNewMessagesCommand.ExecuteNonQuery();
                        if (updateRowsAffected == 1)
                        {
                            Console.WriteLine("New messages count incremented successfully.");
                        }
                        else if (rowsAffected == 0)
                        {
                          
                            throw new InvalidOperationException("No rows were affected. Check if the user ID is correct.");
                        }
                        else
                        {
                            
                            throw new InvalidOperationException($"Unexpected number of rows affected: {rowsAffected}. Expected exactly one row to be affected.");
                        }

                    }
                    var message = JsonSerializer.Serialize(messageDto);
                    
                   

                    var chatWebsocketTarget = $"{receiverID}-{messageDto.AdverID}-{initialSenderID}";
                    Console.WriteLine("Chat Websocket Target: " + chatWebsocketTarget);
                    try
                    {
                        await _webSocketManager.SendMessageToUserAsync(chatWebsocketTarget, message);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Failed to send message to chat WebSocket: {ex.Message}");
                      
                    }


                    var userWebsocketTarget = receiverID.ToString();
                    Console.WriteLine("User Websocket Target: " + userWebsocketTarget);
                    try
                    {
                        await _webSocketManager.SendMessageToUserAsync(userWebsocketTarget, message);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Failed to send message to user WebSocket: {ex.Message}");
                      
                    }
                    return Ok();
                }
                else return StatusCode(500, "Failed to insert message into the database.");
            }
           
        }
        [HttpGet("GetMessages/{currentUserID}/{initialSenderID}/{adverID}")]
        public IActionResult GetMessages(int currentUserID, int initialSenderId, int adverID)
        {
          
            var messages = _messagesRepository.GetMessages(currentUserID,initialSenderId, adverID);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Json(messages);
        }
        [HttpGet("GetMessages/{username}")]
        public IActionResult GetMessages(string username)
        {
            int userID = _userUtility.GetUserIdByUsername(username);

            var messages = _messagesRepository.GetMessages(userID);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Json(messages);
        }
    }
}
