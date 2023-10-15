import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.scss']
})
export class DasboardComponent {
    public Advertisements = [
      {
        adverID:Number, userID:Number, adverName:String, carID:Number, userDto:{userID:Number,firstName:String, lastName:String, userName:String, phoneNumber:String}, carDto:{carID:Number, model:String, brand:String, year:String,type:String, fuelType:String}
      }
    ]
    constructor(private dashService:DashboardService){

    }
    ngOnInit(){
        this.dashService.getAllAdvers().subscribe(response =>{
          this.Advertisements = response
          console.log(this.Advertisements)
        })
    }
}
