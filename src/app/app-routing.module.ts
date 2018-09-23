import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { LoginComponent } from './login/login.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { ManagerActionComponent } from './manager-action/manager-action.component';
import { ManagerTrackLocationComponent } from './manager-track-location/manager-track-location.component';
import { MapViewComponent } from './map-view/map-view.component';

const routes: Routes = [
    { path: '', redirectTo: '/logIn', pathMatch: 'full' },
    { path: 'logIn', component: LoginComponent },
    { path: 'EmployeeDetail', component: EmployeeHomeComponent },
    { path: 'requestForm', component: RequestFormComponent },
    { path: 'managerDashboard', component: ManagerHomeComponent },
    { path: 'ManagerAction', component: ManagerActionComponent },
    { path: 'EmployeeTracking', component: ManagerTrackLocationComponent },
    { path: 'MapView', component: MapViewComponent }
  ];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }
