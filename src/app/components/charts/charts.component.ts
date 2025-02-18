import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  private apiUrl = 'http://172.16.8.12:8000/loans/statistics';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchStatistics();
  }

  fetchStatistics() {
    this.http.get<any>(this.apiUrl).subscribe(
      (stats) => {
        this.renderLoanDistributionChart(stats);
        this.renderFinancialOverviewChart(stats);
      },
      (error) => {
        console.error('Error fetching loan statistics:', error);
      }
    );
  }

  renderLoanDistributionChart(stats: any) {
    const ctx = document.getElementById(
      'loanDistributionChart'
    ) as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Active Loans', 'Paid Off Loans', 'Outstanding Loans'],
        datasets: [
          {
            data: [
              stats.activeLoans,
              stats.paidOffLoans,
              stats.outstandingBalance,
            ],
            backgroundColor: ['#36A2EB', '#4CAF50', '#FF6384'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Loan Distribution',
            font: { size: 18 },
          },
        },
      },
    });
  }

  renderFinancialOverviewChart(stats: any) {
    const ctx = document.getElementById(
      'financialOverviewChart'
    ) as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Total Disbursed', 'Total Paid', 'Outstanding Balance'],
        datasets: [
          {
            label: 'Amount (KSH)',
            data: [
              stats.totalDisbursed,
              stats.totalPaid,
              stats.outstandingBalance,
            ],
            backgroundColor: ['#2196F3', '#4CAF50', '#FF9800'],
            borderRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Financial Overview',
            font: { size: 18 },
          },
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `KSH ${value}`,
            },
          },
        },
      },
    });
  }
}
