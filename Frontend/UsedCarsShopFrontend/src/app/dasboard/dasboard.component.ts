import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Router, NavigationExtras,ActivatedRoute  } from '@angular/router';
import { Advertisement } from '../Data Transfer Objects/Advertisements';
@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.scss']
})
export class DasboardComponent {
    
    advertisementObject: Advertisement;
    public username:any
    public dashboard = true
    public adverForm = false
    public adver = false
    public options = false
    currentPage = 1;
    pageSize= 1;
    constructor(private dashService:DashboardService, private router:Router, private route:ActivatedRoute){
      this.advertisementObject = new Advertisement();
    }
    ngOnInit(){
        this.route.queryParams.subscribe(params =>{
          this.currentPage = +params['page'] || 1;
          this.pageSize = +params['pageSize'] || 6; 
          this.updateUrl();
          
          this.loadAdvertisements()
        })
        this.username = localStorage.getItem("Username")
       
    }
    updateUrl(): void {
      this.router.navigate([], { relativeTo: this.route, queryParams: { page: this.currentPage } });
    }
    changeToForm(){
      this.adverForm = true
      this.dashboard = false
      this.adver = false
    }
    toDashboard(){
      this.loadAdvertisements()
      this.adverForm = false
      this.dashboard = true
      this.adver = false
    }
    showDropdown(){
      this.options = true
    }
    closeDropdown(){
      this.options = false
    }
    logout(){
      this.router.navigate(["/Login"]);
      localStorage.removeItem("Username");
      localStorage.removeItem("Token");
    }

    navigateToAdvertisement(card:any){
       
        this.router.navigate(['/Advertisement']);
        this.dashService.setCard(card);
    }
    nextPage(){
      this.currentPage += 1;
      this.loadAdvertisements()
      this.updateUrl()
    }
    prevPage(){
      this.currentPage -= 1;
      this.loadAdvertisements()
      this.updateUrl()
    }
    loadAdvertisements(){
      this.username = localStorage.getItem("Username")
        this.dashService.getAllAdvers(this.currentPage).subscribe(response =>{

          this.advertisementObject.Advertisements = response
          for(let i = 0;i < this.advertisementObject.Advertisements.length; i++){
            for(let j = 0; j < this.advertisementObject.Advertisements[i].imagePaths.length; j++)
            {
              
              this.advertisementObject.Advertisements[i].imagePaths[j].imagePath = this.advertisementObject.Advertisements[i].imagePaths[j].imagePath.replace(/\\/g, "/")
            }
              
            
            
          }
          console.log(this.advertisementObject.Advertisements)
          
        })
    }
}
