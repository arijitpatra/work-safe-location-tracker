import { User } from './../model/userDetails';
import { Request } from '../model/request';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  users: Observable<any[]>;
  requests: Observable<any[]>;
  constructor(public db: AngularFireDatabase) {
  }

  fetchUserDetails(empId): Observable<User[]> {
    this.users = this.db.list('/userDetails', ref => ref.orderByChild('empId').equalTo(empId)).valueChanges();
    return this.users;
  }

  updateLogInStatus(empId: string): any {
    this.db.object('/userDetails/' + empId.slice(2)).update({
      isLoggedIn: 'true'
    });
  }

  fetchRequest(empId): any {
    return this.db.list('/request', ref => ref.orderByChild('managerId').equalTo(empId)).snapshotChanges().pipe(map(acton => {
      return acton.map(a => {
        const data = a.payload.val();
        const id = a.payload.key;
        return {id, data };
      });
    }));
  }

  saveRequest(requestVar: any) {
    this.db.list('/request').push( {
      empId : requestVar.empId,
      name: requestVar.name,
      date : requestVar.date,
      reason: requestVar.reason,
      status: requestVar.status,
      inTime : requestVar.inTime,
      managerId : requestVar.managerId,
      outTime: requestVar.outTime,
      workLocationId: requestVar.workLocationId
    });
    return true;
  }

  RequestApprove(reqKey: string) {
    console.log(reqKey);
    this.db.object('/request/' + reqKey).update({
      status: 'Pending with Security'
    });
  }

  RequestReject(reqKey: string){
    console.log(reqKey);
    this.db.object('/request/' + reqKey).update({
      status: 'Request rejected by Manager'
    });
  }

  FetchAllRequest(): Observable<any[]>{
    return this.db.list('/request').valueChanges();
  }

  FetchAllRequestKey(): any {
    return this.db.list('/request').snapshotChanges().pipe(map(acton => {
      return acton.map(a => {
        const data = a.payload.val();
        const id = a.payload.key;
        return {id, data };
      });
    }));
  }

  ApproveRequest(reqKey): any {
    console.log('function hit');
    this.db.object('/request/' + reqKey).update({
      status: 'Approved'
    });
  }

  updatePosition(empId, pos): any {
    this.db.object('/userDetails/' + empId.slice(2)).update({
      latitude: pos.lat,
      longitude: pos.lng
    });
  }



}
