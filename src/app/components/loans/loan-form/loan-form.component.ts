import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.css'],
})
export class LoanFormComponent implements OnInit {
  @Output() loanCreated = new EventEmitter<void>();

  loanData = {
    customerId: null,
    principalAmount: null,
    interestRate: null,
    repaymentPeriod: null,
    frequency: 'Monthly',
    status: 'PENDING',
  };

  eligibleCustomers: any[] = [];
  isSubmitting = false;

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    console.log('get eligible customers');
    this.loadEligibleCustomers();
  }

  loadEligibleCustomers(): void {
    this.loanService.getEligibleCustomers().subscribe({
      next: (customers) => {
        console.log('testin users', customers);
        this.eligibleCustomers = customers;
      },

      error: (err) => console.error('Error fetching eligible customers:', err),
    });
  }

  submitLoan(): void {
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    this.loanService.addLoan(this.loanData).subscribe({
      next: () => {
        alert('Loan created successfully!');
        this.loanCreated.emit();
        this.resetForm();
        this.closeModal();
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
      frequency: 'Monthly',
      status: 'PENDING',
    };
  }

  closeModal(): void {
    this.loanCreated.emit();
  }
}
