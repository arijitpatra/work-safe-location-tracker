import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../service/fetch-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  empId: string;
  password: string;
  role: number;
  name: string;

  credentialsMismatch = false;

  constructor(public fetchService: FetchDataService, public router: Router) { }

  ngOnInit() {
  }

  logIn() {
    if (this.empId != null && this.password != null) {
      this.fetchService.fetchUserDetails(this.empId).subscribe(data => {
        if (data.length > 0) {
          if (this.password === (data[0].password).toString()) {
            this.fetchService.updateLogInStatus(this.empId);
            this.role = data[0].role;
            this.name = data[0].name;
            this.credentialsMismatch = false;
            sessionStorage.setItem('empId', this.empId);
            this.updatePosition(this.empId);
            if (this.role === 1) {
              this.router.navigate(['EmployeeDetail']);
            } else if (this.role === 2) {
              this.router.navigate(['managerDashboard']);
            }
          } else {
            this.credentialsMismatch = true;
          }
        } else {
          this.credentialsMismatch = true;
        }
      });
    } else {
      this.credentialsMismatch = true;
    }
  }

  updatePosition(empId) {
    let pos: any;
    console.log('yahan');
    console.log(pos);
    const self = this;
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        self.fetchService.updatePosition(empId, pos);
        console.log('jahan');
        console.log(pos);
      }, function () {
        this.handleLocationError(true);
      }, { enableHighAccuracy: true });
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false);
    }
    console.log('wahan');
    console.log(pos);
    if(pos !== undefined){
      this.fetchService.updatePosition(empId, pos);
    }
  }

  handleLocationError(browserHasGeolocation) {
    if(browserHasGeolocation == false){
      //show message
    }
  }
}


