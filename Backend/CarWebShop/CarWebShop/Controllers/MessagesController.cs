﻿using Microsoft.AspNetCore.Mvc;
using CarWebShop.Data;
using CarWebShop.Dto;
using CarWebShop.Utilities;
using Microsoft.Data.SqlClient;
using CarWebShop.Repository;
using CarWebShop.Interfaces;

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
        public MessagesController(DataContext dataContext, UserUtility userUtility, IConfiguration configuration, IMessagesRepository messagesRepository)
        {
            _configuration = configuration;
            _userUtility = userUtility;
            _dataContext = dataContext;
            _messagesRepository = messagesRepository;
        }
        [HttpPost("SendMessage")]
        public IActionResult sendMessage(MessageDto messageDto)
        {
            int receiverID = _userUtility.GetUserIdByUsername(messageDto.ReceiverUsername);
            int senderID = _userUtility.GetUserIdByUsername(messageDto.SenderUsername);

            string connectionString = _configuration.GetConnectionString("DefaultConnection");
            SqlConnection sqlConnection = new SqlConnection(connectionString);
            sqlConnection.Open();
            string query = "INSERT INTO Messages(SenderID, ReceiverID, AdverID, DateSent, Message) VALUES (@SenderID, @ReceiverID, @AdverID, GetDate(), @Message)";

            using(SqlCommand command = new SqlCommand(query, sqlConnection))
            {
                command.Parameters.AddWithValue("@SenderID", senderID);
                command.Parameters.AddWithValue("@ReceiverID", receiverID);
                command.Parameters.AddWithValue("@AdverID", messageDto.AdverID);
                command.Parameters.AddWithValue("@Message",  messageDto.Message);

                int rowsAffected = command.ExecuteNonQuery();
                if (rowsAffected > 0)
                {
                    return Ok();
                }else return StatusCode(500, "Failed to insert message into the database.");
            }
           
        }
        [HttpGet("GetMessages/{username}/{adverID}")]
        public IActionResult GetMessages(string username, int adverID)
        {
            int userID = _userUtility.GetUserIdByUsername(username);

            var messages = _messagesRepository.GetMessages(userID, adverID);
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