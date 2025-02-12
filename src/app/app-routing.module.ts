import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoansComponent } from './components/loans/loans.component';
import { LoanFormComponent } from './components/loans/loan-form/loan-form.component';
import { RepaymentScheduleComponent } from './components/loans/repayment-schedule/repayment-schedule.component';
import { ChartsComponent } from './components/charts/charts.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerFormComponent } from './components/customers/customer-form/customer-form.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: SidenavComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'loans', component: LoansComponent },
    ],
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'loans',
    component: LoansComponent,
  },
  {
    path: 'loan-form',
    component: LoanFormComponent,
  },
  {
    path: 'repayment-schedule',
    component: RepaymentScheduleComponent,
  },
  {
    path: 'charts',
    component: ChartsComponent,
  },
  {
    path: 'customers',
    component: CustomersComponent,
  },
  {
    path: 'customer-form',
    component: CustomerFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
