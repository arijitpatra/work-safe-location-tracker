import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { RequestHistoryComponent } from './request-history/request-history.component';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { AppRoutingModule } from './app-routing.module';
import { ManagerActionComponent } from './manager-action/manager-action.component';
import { ManagerTrackLocationComponent } from './manager-track-location/manager-track-location.component';
import { MapViewComponent } from './map-view/map-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeeHomeComponent,
    RequestFormComponent,
    RequestHistoryComponent,
    ManagerHomeComponent,
    ManagerActionComponent,
    ManagerTrackLocationComponent,
    MapViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
