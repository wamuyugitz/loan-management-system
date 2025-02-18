import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from '../../services/customers.service';
import { LoanService } from '../../services/loan.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.css'],
})
export class CustomerModalComponent {
  customerForm: FormGroup;
  isEditing: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CustomerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerService: CustomerService,
    private loanService: LoanService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.customerForm = this.fb.group({
      fullname: [{ value: `${data.firstname} ${data.lastname}`, disabled: true }],
      nationalId: [{ value: data.nationalid, disabled: true }],
      phoneNumber: [data.phonenumber, Validators.required],
      principalAmount: [
        data.loans[0]?.principalAmount ?? '',
        Validators.required,
      ],
      status: [data.loans[0]?.status ?? '', Validators.required],
      dueDate: [data.loans[0]?.duedate ?? '', Validators.required],
    });

    // Initially disable fields except phoneNumber
    this.toggleFormControls(false);
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    this.toggleFormControls(this.isEditing);
  }

  toggleFormControls(enable: boolean) {
    const fields = ['phoneNumber', 'principalAmount', 'status', 'dueDate'];
    fields.forEach((field) => {
      const control = this.customerForm.get(field);
      if (control) {
        enable ? control.enable() : control.disable();
      }
    });
  }

  saveChanges() {
    if (this.customerForm.invalid) {
      this.snackBar.open('Please fill out all required fields.', 'Close', {
        duration: 3000,
        panelClass: 'error-snackbar',
      });
      return;
    }

    const updatedCustomer = {
      phonenumber: this.customerForm.get('phoneNumber')?.value,
    };

    // Update Customer Info
    this.customerService.updateCustomer(this.data.id, updatedCustomer).subscribe(
      () => {
        this.snackBar.open('Customer updated successfully!', 'Close', {
          duration: 3000,
          panelClass: 'success-snackbar',
        });

        if (this.data.loans.length > 0) {
          const updatedLoan = {
            principalAmount: this.customerForm.get('principalAmount')?.value,
            status: this.customerForm.get('status')?.value,
            duedate: this.customerForm.get('dueDate')?.value,
          };

          // Update Loan Info
          this.loanService.updateLoan(this.data.loans[0].id, updatedLoan).subscribe(
            () => {
              this.snackBar.open('Loan updated successfully!', 'Close', {
                duration: 3000,
                panelClass: 'success-snackbar',
              });
              this.dialogRef.close(true);
            },
            (error) => {
              console.error('Failed to update loan:', error);
              this.snackBar.open('Failed to update loan. Please try again.', 'Close', {
                duration: 4000,
                panelClass: 'error-snackbar',
              });
            }
          );
        } else {
          this.dialogRef.close(true);
        }
      },
      (error) => {
        console.error('Failed to update customer:', error);
        this.snackBar.open('Failed to update customer. Please try again.', 'Close', {
          duration: 4000,
          panelClass: 'error-snackbar',
        });
      }
    );
  }
}
