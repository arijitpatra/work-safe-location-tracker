import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchDataService } from '../service/fetch-data.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.scss']
})
export class EmployeeHomeComponent implements OnInit {

  empName = '';
  empId = '';
  cubicleId = '';
  emailId = '';
  role = '';

  constructor(private route: ActivatedRoute, private location: Location, public fetchService: FetchDataService,public router: Router) { }

  ngOnInit() {
    const empId = sessionStorage.getItem('empId');
    this.fetchService.fetchUserDetails(empId).subscribe(data => {
      console.log(data);
      if(data[0].isLoggedIn === "true"){
        if (data.length > 0) {
          this.empName = data[0].name;
          this.empId = data[0].empId;
          this.cubicleId = data[0].cubicleId;
          this.emailId = data[0].emailId;
          switch (data[0].role) {
            case 1:
              this.role = 'Employee';
              break;
            case 2:
              this.role = 'Manager';
              break;
            case 3:
              this.role = 'HR';
              break;
            case 4:
              this.role = 'Security';
              break;
            default:
              this.role = 'Trainee';
              break;
          };
      }
      else {
          this.router.navigate(['logIn']);
      }
    })
  }

  navigateToViewRequest(){
    this.router.navigate(['requestForm']);
  }

}
