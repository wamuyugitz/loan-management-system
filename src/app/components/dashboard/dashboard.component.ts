import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  statistics = {
    totalDisbursed: 0,
    totalPaid: 0,
    outstandingBalance: 0,
    activeLoans: 0,
    paidOffLoans: 0,
  };

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.fetchStatistics();
  }

  fetchStatistics() {
    this.loanService.getLoanStatistics().subscribe({
      next: (data) => {
        this.statistics = data;
      },
      error: (err) => console.error('Failed to fetch loan statistics:', err),
    });
  }
}
