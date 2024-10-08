import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MessagesService } from '../messages/messages.service';
import { Store } from '@ngrx/store';
import { incrementMessages } from 'src/app/store/messages-store/messages.actions';

interface MessageEvent {
  message: string;
  receiverUsername: string;
  senderUsername: string;
  dateSent: Date;
  isNew: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketMessagesService {
  private subject: Subject<MessageEvent> | undefined;
  private ws: WebSocket | undefined;

  constructor(
    private _messagesService: MessagesService, 
    private _store:Store) {}

  public connect(url: string | null): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log(`WebSocket connected to ${url}`);
    }
    return this.subject;
  }

  private create(url: string | null): Subject<MessageEvent> {
    if(url){
      this.ws = new WebSocket(url);
    }
    

    const observable = new Observable<MessageEvent>(observer => {
      this.ws!.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(`${data.SenderUsername}:`, data);

        observer.next({
          message: data.Message,
          receiverUsername: data.ReceiverUsername,
          senderUsername: data.SenderUsername,
          dateSent: new Date(data.dateSent),
          isNew: data.isNew
        } as MessageEvent);
        if(sessionStorage.getItem("Username") !== data.SenderUsername && sessionStorage.getItem("direct") == null){
          this._messagesService.incrementUnreadMessages(1);
          this._store.dispatch(incrementMessages())
        }
       
      };

      this.ws!.onerror = (error) => {
        console.log('WebSocket error:', error);
        observer.error(error);
      };

      this.ws!.onclose = (event) => {
        console.log('WebSocket connection closed:', event);
        observer.complete();

        this.subject = undefined;
        this.ws = undefined;
      };

      return () => {
        if (this.ws) {
          this.ws.close();
        }
      };
    });

    const observer = {
      next: (data: Object) => {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify(data));
          console.log('WebSocket message sent:', data);
        }
      }
    };

    return Subject.create(observer, observable);
  }

  public close() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.close();
      this.ws = undefined;
      this.subject = undefined;
    }
  }
}
