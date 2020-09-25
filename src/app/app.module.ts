import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserDetailComponent } from './user-details/user-detail/user-detail.component';
import { UserDetailListComponent } from './user-details/user-detail-list/user-detail-list.component';
import { APIService } from './shared/api.service';
import { LoginDetailComponent } from './user-details/login-detail/login-detail.component';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { EmployeeDetailComponent } from './user-details/employee-detail/employee-detail.component';
import { ProfileDetailComponent } from './user-details/profile-detail/profile-detail.component';
import { PasswordRecoveryComponent } from './user-details/password-recovery/password-recovery.component'
import { menu } from './menu/menu.component';
import { QRCodeModule } from 'angularx-qrcode';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientDetailComponent } from './patient-details/patient-detail/patient-detail.component';
import { PatientDetailListComponent } from './patient-details/patient-detail-list/patient-detail-list.component';
import { WaitingRoomComponent } from './waiting-room/waiting-room.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { AccountDetailListComponent } from './account-detail-list/account-detail-list.component';
import { MedicalRecordComponent } from './medical-record/medical-record.component';
import { MedicalRecordListComponent } from './medical-record-list/medical-record-list.component'

@NgModule({
  declarations: [
    AppComponent,
    UserDetailsComponent,
    UserDetailComponent,
    UserDetailListComponent,
    LoginDetailComponent,
    AdminPortalComponent,
    EmployeeDetailComponent,
    ProfileDetailComponent,
    menu,
    PasswordRecoveryComponent,
    PatientDetailsComponent,
    PatientDetailComponent,
    PatientDetailListComponent,
    WaitingRoomComponent,
    PaymentDetailsComponent,
    AccountDetailListComponent,
    MedicalRecordComponent,
    MedicalRecordListComponent,
    AccountDetailListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CommonModule,
    //GooglePlaceModule,
    QRCodeModule
  ],
  providers: [APIService],
  bootstrap: [AppComponent]
})
export class AppModule { ToastrModule: any}
