import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoanService } from 'src/app/services/loan.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.css'],
})
export class LoanFormComponent implements OnInit {
  @Output() loanCreated = new EventEmitter<void>();

  // Initialize loanData with the required properties
  loanData = {
    customerId: null,
    principalAmount: null,
    interestRate: null,
    repaymentPeriod: null,
    duedate: '', 
    status: 'PENDING',
  };

  eligibleCustomers: any[] = [];
  isSubmitting = false;

  constructor(
    private loanService: LoanService,
    private dialogRef: MatDialogRef<LoanFormComponent>
  ) {}

  ngOnInit(): void {
    this.loadEligibleCustomers();
  }

  loadEligibleCustomers(): void {
    this.loanService.getEligibleCustomers().subscribe({
      next: (customers) => {
        this.eligibleCustomers = customers;
      },
      error: (err) => console.error('Error fetching eligible customers:', err),
    });
  }

  submitLoan(): void {
    // Additional check: Ensure all required fields are filled
    if (
      !this.loanData.customerId ||
      !this.loanData.principalAmount ||
      !this.loanData.interestRate ||
      !this.loanData.repaymentPeriod ||
      !this.loanData.duedate ||
      !this.loanData.status
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    if (this.isSubmitting) return;
    this.isSubmitting = true;

    // Build payload according to backend requirements:
    const payload = {
      customerId:this.loanData.customerId,
      principalAmount: this.loanData.principalAmount,
      interestRate: this.loanData.interestRate,
      repaymentPeriod: this.loanData.repaymentPeriod,
      duedate: new Date(this.loanData.duedate).toISOString().split('T')[0],
      status: this.loanData.status,
    };

    this.loanService.addLoan(payload).subscribe({
      next: () => {
        alert('Loan created successfully!');
        this.loanCreated.emit();
        this.resetForm();
      },
      error: (error) => {
        console.error('Error creating loan:', error.status, error.error);
        alert(
          `Failed to create loan: ${error.error?.message || 'Unknown error'}`
        );
      },
      complete: () => (this.isSubmitting = false),
    });
  }

  resetForm(): void {
    this.loanData = {
      customerId: null,
      principalAmount: null,
      interestRate: null,
      repaymentPeriod: null,
      duedate: '',
      status: 'PENDING',
    };
  }

  onCancel() {
    this.dialogRef.close();
  }
}
