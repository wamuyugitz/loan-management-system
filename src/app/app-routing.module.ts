import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoansComponent } from './components/loans/loans.component';
import { CustomersComponent } from './components/customers/customers.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { LoanFormComponent } from './components/loans/loan-form/loan-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Login & Signup pages (No Sidenav)
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // Protected Routes (With Sidenav)
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
  path:'add-customer',
  component:AddCustomerComponent
},
{
  path:'loan-form',
  component:LoanFormComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
