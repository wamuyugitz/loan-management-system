import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from '../../services/customers.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent {
  customer: any = {};
  attachLoan: boolean = false;
  loan: any = {
    interestRate: null,
    dueDate: null,
    frequency: null,
    status: null,
    repaymentPeriod: null,
    principalAmount: null,
  };

  constructor(
    private customersService: CustomerService,
    private dialogRef: MatDialogRef<AddCustomerComponent>
  ) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      alert('Please fill in all required fields!');
      return;
    }

    const customerData = {
      firstname: this.customer.firstname,
      lastname: this.customer.lastname,
      phoneNumber: this.customer.phoneNumber,
      nationalIdentityCard: this.customer.nationalIdentityCard,
      loans: this.attachLoan
        ? [
            {
              interestRate: this.loan.interestRate,
              dueDate: this.loan.dueDate,
              frequency: this.loan.frequency,
              status: this.loan.status,
              repaymentPeriod: this.loan.repaymentPeriod,
              principalAmount: this.loan.principalAmount,
            },
          ]
        : [],
    };

    this.customersService.addCustomer(customerData).subscribe(
      () => {
        alert('Customer added successfully!');
        this.dialogRef.close(true);
      },
      (error) => {
        alert('Error adding customer!');
        console.error(error);
      }
    );
  }

  toggleAttachLoan() {
    this.attachLoan = !this.attachLoan;
  }

  onCancel() {
    this.dialogRef.close();
  }
}
