import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../service/fetch-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-track-location',
  templateUrl: './manager-track-location.component.html',
  styleUrls: ['./manager-track-location.component.scss']
})
export class ManagerTrackLocationComponent implements OnInit {

  approvedEmployees = [];
  loadedEmployees = false;

  constructor( public fetchData: FetchDataService, public router: Router ) { }

  ngOnInit() {
    this.fetchData.FetchAllRequest().subscribe(data => {
      console.log(data);
      this.approvedEmployees = data.filter(x => {
        return x.status === 'Approved';
      });
      this.approvedEmployees.forEach(x => {
        x.latitude = '18.5973668',
        x.longitude = '73.7069804'
      });
      console.log(this.approvedEmployees);
      if (this.approvedEmployees.length > 0) {
        this.loadedEmployees = true;
      }
    });
  }

  viewMap(employee) {
    sessionStorage.setItem('latitude' , employee.latitude);
    sessionStorage.setItem('longitude' , employee.longitude);
    // this.router.navigate(['MapView']);
    window.location.href = "https://arijitpatra.in/mapTrack.html";
  }

}




      