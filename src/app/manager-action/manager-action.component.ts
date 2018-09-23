import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../service/fetch-data.service';
import { Request } from '../model/request';

@Component({
  selector: 'app-manager-action',
  templateUrl: './manager-action.component.html',
  styleUrls: ['./manager-action.component.scss']
})

export class ManagerActionComponent implements OnInit {

  reqList: any[];
  empId: string;
  count: number;

  constructor(public fetchData: FetchDataService) { }

  ngOnInit() {
    this.reqList = [];
    this.empId = sessionStorage.getItem('empId');
    this.fetchData.fetchRequest(this.empId).subscribe(data => {
      this.reqList = data;
      console.log(this.reqList);
      this.count = this.reqList.length;
    });
  }

  actionTaken(action, reqKey, i): any {
    console.log(action);
    if (action === 'approve') {
      console.log(action)
      this.fetchData.RequestApprove(reqKey);

    } else if (action === 'reject') {
      this.fetchData.RequestReject(reqKey)
    }
    document.getElementById(i).style.display = 'none';
    this.count--;
    this.CheckIfMagicNumberAcheived(reqKey);
  }


  CheckIfMagicNumberAcheived(reqKey) {
    this.fetchData.FetchAllRequestKey().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        console.log('start mein');
        let count = 0;
        let req1 = data[i];
        console.log(req1);
        for (let j = 0; j < data.length; j++) {
          let req2 = data[j];
          if (req1.id !== req2.id) {
            if (this.checkProximity(req1, req2)) {
              count++;
            }
          }
        }
        if (count >= 4) {
          console.log('beech mein');
          this.fetchData.ApproveRequest(req1.id);
        }
      }
    });
  }

  checkProximity(req1, req2): any {

    if (req1.data.date ===
      req2.data.date) {
      if (req1.data.workLocationId.includes('Common')) {
        if (req1.data.workLocationId ===
          req2.data.workLocationId) {
          if ((req1.data.status ===
            "Pending with Security" ||
            req1.data.status ===
            "Approved") && (req1.data.status ===
              "Pending with Security" ||
              req1.data.status ===
              "Approved")) {
            return true;
          }
        }
      } else if (req1.data.workLocationId.slice(4,
        9) === req2.data.workLocationId.slice(4,
          9)) {
        if ((req1.data.status ===
          "Pending with Security" ||
          req1.data.status ===
          "Approved") && (req1.data.status ===
            "Pending with Security" ||
            req1.data.status ===
            "Approved")) {
          return true;
        }
      }
    }
    return false;
  }

}
