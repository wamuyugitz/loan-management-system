import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material Modules
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LottieModule } from 'ngx-lottie';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


import player from 'lottie-web';

import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LoansComponent } from './components/loans/loans.component';
import { LoanFormComponent } from './components/loans/loan-form/loan-form.component';
import { RepaymentScheduleComponent } from './components/loans/repayment-schedule/repayment-schedule.component';
import { ChartsComponent } from './components/charts/charts.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerFormComponent } from './components/customers/customer-form/customer-form.component';
import { MatSelectModule } from '@angular/material/select';
import { CustomerModalComponent } from './components/customer-modal/customer-modal.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';


export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    SidenavComponent,
    LoansComponent,
    LoanFormComponent,
    RepaymentScheduleComponent,
    ChartsComponent,
    CustomersComponent,
    CustomerFormComponent,
    CustomerModalComponent,
    AddCustomerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule, // Added Sidenav module
    MatToolbarModule, // Added Toolbar for header
    MatIconModule, // Added Icons for navigation
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatDialogModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [MatDialog],
  bootstrap: [AppComponent],
})
export class AppModule {}
