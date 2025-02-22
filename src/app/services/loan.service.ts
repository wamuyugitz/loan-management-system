import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

const API_BASE_URL = 'http://172.16.8.12:8000';
const LOANS_API = `${API_BASE_URL}/loans`;
const CUSTOMERS_API = `${API_BASE_URL}/customers`;
const STATISTICS_API = `${API_BASE_URL}/loans/statistics`;

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  // Fetch all loans
  getLoans(): Observable<any> {
    return this.http.get<any[]>(LOANS_API, this.httpOptions);
  }

  // Add a new loan
  addLoan(loanData: any): Observable<any> {
    console.log('Sending loan data:', loanData);
    return this.http.post<any[]>(LOANS_API, loanData, this.httpOptions);
  }

  // Delete a loan
  deleteLoan(loanId: number): Observable<any> {
    return this.http.delete(`${LOANS_API}/${loanId}`, this.httpOptions);
  }

  // Update an existing loan
  updateLoan(loanId: number, updatedLoan: any): Observable<any> {
    return this.http.put(
      `${LOANS_API}/${loanId}`,
      updatedLoan,
      this.httpOptions
    );
  }

  // Get eligible customers
  getEligibleCustomers(): Observable<any[]> {
    return this.http
      .get<any[]>(CUSTOMERS_API, this.httpOptions)
      .pipe(
        map((customers: any[]) =>
          customers.filter(
            (customer: { loans: any[] }) =>
              !customer.loans.length ||
              customer.loans.every((loan: any) => loan.status === 'PAID')
          )
        )
      );
  }

  getLoanStatistics(): Observable<any> {
    return this.http.get<any>(STATISTICS_API, this.httpOptions);
  }
}
