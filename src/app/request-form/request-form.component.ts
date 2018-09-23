import { Router } from '@angular/router';
import { Request } from './../model/request';
import { FetchDataService } from './../service/fetch-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent implements OnInit {

  name: string;
  cubicleId: string;
  managerId: string;
  approverId: string;
  date: any;
  timeIn: any;
  timeOut: any;
  reason: any;
  selectedCubicleId: string;
  empId: string;
  invalidEntry = false;

  constructor(public fetchData: FetchDataService, public router: Router) { }

  ngOnInit() {
    this.empId = sessionStorage.getItem('empId');
    this.fetchData.fetchUserDetails(this.empId).subscribe(data => {
      if (data[0].isLoggedIn === 'true') {
        this.cubicleId = data[0].cubicleId;
        this.managerId = data[0].managerId;
        this.name = data[0].empId;
        this.fetchData.fetchUserDetails(this.managerId).subscribe(res => {
          this.approverId = res[0].emailId;
        });
      }
    });
  }

  requestSubmit() {
    if (this.validateForm()) {
    // console.log(this.date);
    this.invalidEntry = false;
      const requestVar = {
        date : this.date,
        name : this.name,
        reason : this.reason,
        empId : this.empId,
        inTime : this.timeIn,
        outTime : this.timeOut,
        status : 'Pending with Manager',
        managerId : this.managerId,
        workLocationId : this.selectedCubicleId
      };
      const onSuccess = this.fetchData.saveRequest(requestVar);
      if(onSuccess) {
        this.router.navigate(['EmployeeDetail']);
      }
    } else {
      this.invalidEntry = true;
  }
    // console.log(requestVar);
  }

  validateForm(): boolean {
    // tslint:disable-next-line:max-line-length
    if ( this.date === '' || this.date === undefined || this.reason === '' || this.reason === undefined || this.empId === '' || this.empId === undefined || this.timeIn === '' || this.timeIn === undefined || this.timeOut === '' || this.timeOut === undefined || this.managerId === '' || this.managerId === undefined || this.selectedCubicleId === '' || this.selectedCubicleId === undefined) {
        return false;
    } else {
      return true;
    }
  }
}
