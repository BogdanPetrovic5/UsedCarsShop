import { Component, OnInit } from '@angular/core';
import { AutoLogoutService } from './core/services/authentication/auto-logout.service';
import { StateMenagmentService } from './core/services/state-menagment/state-menagment.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'UsedCarsShopFrontend';
  isExpired:boolean | null = false

  constructor(private _autoLogout:AutoLogoutService, 
    private _stateMenagmentService:StateMenagmentService
  ){
    
    this._stateMenagmentService.isSessionExpired$.subscribe((isExpired)=>{
      this.isExpired = isExpired;
    })
  }
  ngOnInit():void{
    // this._autoLogout.initTokenCheck();
  }
}
