import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { LoanService } from 'src/app/services/loan.service';
import { LoanFormComponent } from './loan-form/loan-form.component';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css'],
})
export class LoansComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'principalAmount',
    'interestRate',
    'dueDate',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>([]);
  totalLoans = 0;
  totalPrincipal = 0;
  averageInterest = 0;
  loansInRepayment = 0;

  constructor(
    private loanService: LoanService,
    private dialog: MatDialog // Use MatDialog here
  ) {}

  ngOnInit(): void {
    this.fetchLoans();
  }

  fetchLoans() {
    this.loanService.getLoans().subscribe((loans) => {
      this.dataSource.data = loans;
      this.totalLoans = loans.length;
      this.totalPrincipal = loans.reduce(
        (acc: number, loan: any) => acc + loan.principalAmount,
        0
      );
      this.averageInterest = loans.length
        ? loans.reduce((acc: number, loan: any) => acc + loan.interestRate, 0) /
          loans.length
        : 0;
      this.loansInRepayment = loans.filter(
        (loan: any) => loan.status === 'IN_REPAYMENT'
      ).length;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editLoan(loan: any) {
    console.log('Edit Loan:', loan);
  }

  openAddLoanModal() {
    this.dialog.open(LoanFormComponent, {
      width: '500px',
      disableClose: true,
    });
  }

  deleteLoan(loanId: number) {
    if (confirm('Are you sure you want to delete this loan?')) {
      this.loanService.deleteLoan(loanId).subscribe(() => {
        this.fetchLoans();
      });
    }
  }
}
