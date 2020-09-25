import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailComponent } from './user-details/user-detail/user-detail.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LoginDetailComponent } from './user-details/login-detail/login-detail.component';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { ProfileDetailComponent } from './user-details/profile-detail/profile-detail.component';
import { PasswordRecoveryComponent } from './user-details/password-recovery/password-recovery.component'
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { WaitingRoomComponent } from './waiting-room/waiting-room.component';
import { MedicalRecordListComponent } from './medical-record-list/medical-record-list.component';
import { AccountDetailListComponent } from './account-detail-list/account-detail-list.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { MedicalRecordComponent } from './medical-record/medical-record.component';

const routes: Routes = [ 
{ path: 'register', component: UserDetailComponent },
{ path: 'login', component: LoginDetailComponent },
{ path: 'employee', component: UserDetailsComponent },
{ path: 'admin', component: AdminPortalComponent },
{ path: 'profile', component: ProfileDetailComponent },
{ path: 'recoverpassword', component: PasswordRecoveryComponent },
{ path: 'patient', component: PatientDetailsComponent },
{ path: 'waiting-room', component: WaitingRoomComponent },
{ path: 'medical-records', component: MedicalRecordListComponent },
{ path: 'account', component: AccountDetailListComponent },
{ path: 'payment', component: PaymentDetailsComponent },
{ path: 'consult', component: MedicalRecordComponent },
{ path: '', redirectTo: '/admin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
