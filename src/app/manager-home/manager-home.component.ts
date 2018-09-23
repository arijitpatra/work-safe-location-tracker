import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchDataService } from '../service/fetch-data.service';

@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.scss']
})
export class ManagerHomeComponent implements OnInit {

  empId: string;
  name: string;
  emailId: string;
  cubicleId: string;

  constructor( public fetchData: FetchDataService, public router: Router ) { }

  ngOnInit() {
    this.empId = sessionStorage.getItem('empId');
    this.fetchData.fetchUserDetails(this.empId).subscribe(data =>{
      if(data[0].isLoggedIn === 'true'){
        this.emailId = data[0].emailId;
        this.name = data[0].name;
        this.cubicleId = data[0].cubicleId;
      } else {
        this.router.navigate(['logIn']);
      }
    });
  }

  navigateToAction() {
    this.router.navigate(['ManagerAction']);
  }

  navigateToTrack() {
    this.router.navigate(['EmployeeTracking']);
  }

}
