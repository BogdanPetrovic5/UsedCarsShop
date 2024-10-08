import { JsonPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DoCheck, HostListener, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Messages } from 'src/app/Data Transfer Objects/Messages';
import { LoadingService } from 'src/app/core/services/dashboard/loading.service';
import { MessagesService } from 'src/app/core/services/messages/messages.service';
import { WebsocketMessagesService } from 'src/app/core/services/websocket/websocket-messages.service';
import { DasboardComponent } from 'src/app/features/dasboard/dasboard.component';
import { UserSessionMenagmentService } from 'src/app/core/services/session/user-session-menagment.service';
import { Store } from '@ngrx/store';


;
@Component({
  selector: 'app-all-messages',
  templateUrl: './all-messages.component.html',
  styleUrls: ['./all-messages.component.scss']
})
export class AllMessagesComponent implements OnInit, OnDestroy{
 

    
    currentUsername:string | null = null;
    currentUrl:string | null = null;
    url:string | null = null;
    messageObject:Messages;

    isSelectedValue = sessionStorage.getItem("isSelected") || null;
  
    isLoading:boolean = false;
    messagesNotLoaded:boolean = false;
    isSelected = this.isSelectedValue === 'true' ? true : false
    
    constructor(
      private _messageService:MessagesService,
      private _router:Router,
      private _dashboard:DasboardComponent,
      private _userService:UserSessionMenagmentService,
    
    ){
 
        this.messageObject = new Messages();
    }

    ngOnInit():void{
      this.initilizeComponent()
    }
    ngOnDestroy():void{
      this._userService.removeItemFromSessionStorage("messageID");
      this._userService.removeItemFromSessionStorage("isSelected");
   
    }
    initilizeComponent(){
      this._dashboard.closeConnection()
      this.currentUsername = this._userService.getItem("Username");
      this.currentUrl = this._router.url
      this.loadMessages();
      sessionStorage.setItem("currentRoute", "Inbox")
    }
    sortMessages(){
      this.messageObject.Messages.sort((b,a) => {
        return new Date(a.dateSent).getTime() - new Date(b.dateSent).getTime();
      });
    }
    loadMessages(){
      this.isLoading = true
      this._messageService.getUserMessages(this.currentUsername).subscribe(response=>{
        this.messageObject.Messages = response;
        this.sortMessages()
        
       this.isLoading = false
      }, (error:HttpErrorResponse)=>{
        this.messagesNotLoaded = true;
        setTimeout(()=>{
          this.messagesNotLoaded = false
        }, 1500)
      })
    }

    markAsRead(messageID: any) {
      const index = this.messageObject.Messages.findIndex((message: any) => message.messageID === messageID);
      if (index !== -1) {
        this.messageObject.Messages[index].isNew = false;
       
      }
    }
    selectChat(chat:any){
      chat.isSelected = true;
      this.setToStorage(chat)
      if(chat.senderUsername !== this.currentUsername){
        this._userService.setItem("check", true);
      }else this._userService.setItem("check", false);

      let wsUrl =`${this._userService.getItem("userID")}-${chat.adverID}-${chat.initialSenderID}`;
      wsUrl = wsUrl ? wsUrl.toString() : "";

      this._userService.setItem("wsUrl", wsUrl)
      this._router.navigate([`/Messages/Inbox/Direct/${wsUrl}`])
      
    }
    constructInboxUrl(brand:string | null, model:string | null, year:string | null){
      let url = "-" + " " +brand + " " + model + " " + year
      return url ?? null;
    }
    setToStorage(chat:any){
      this._userService.setItem("adverID", chat.adverID)
      this._userService.setItem("messageID", chat.messageID)
      this._userService.setItem("initialSenderID", chat.initialSenderID)
      this._userService.setItem("isSelected", this.isSelected)

      this.url = this.constructInboxUrl(chat.advertisement.carDto.brand,chat.advertisement.carDto.model, chat.advertisement.carDto.year )
      
      this._userService.setItem("chatUrl", this.url);
     
    }
 
}

