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
  loan: any = {};

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
              principalAmount: this.loan.principalAmount,
              interestRate: this.loan.interestRate,
              repaymentPeriod: this.loan.repaymentPeriod,
              dueDate: this.loan.dueDate,
              repaymentFrequency: this.loan.repaymentFrequency,
              status: this.loan.status,
            },
          ]
        : [],
    };

    this.customersService.addCustomer(customerData).subscribe(
      (response:any) => {
        alert('Customer added successfully!');
        this.dialogRef.close(true);
      },
      (error:any) => {
        alert('Error adding customer!');
        console.error(error);
      }
    );
  }

  onCancel() {
    this.dialogRef.close();
  }
}
