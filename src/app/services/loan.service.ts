import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_BASE_URL = 'http://172.16.8.24:8080'; // 🔄 Update if needed
const LOANS_API = `${API_BASE_URL}/loans`;

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

  // ✅ Fetch all loans
  getLoans(): Observable<any> {
    return this.http.get(LOANS_API, this.httpOptions);
  }

  // ✅ Fetch loan by customer ID
  getLoansByCustomer(customerId: number): Observable<any> {
    return this.http.get(
      `${LOANS_API}?customerId=${customerId}`,
      this.httpOptions
    );
  }

  // ✅ Add a new loan
  addLoan(loanData: any): Observable<any> {
    return this.http.post(LOANS_API, loanData, this.httpOptions);
  }

  // ✅ Update loan status (e.g., Approving or Marking as Paid)
  updateLoanStatus(
    loanId: number,
    status: 'ACTIVE' | 'PAID' | 'DEFAULTED'
  ): Observable<any> {
    return this.http.patch(
      `${LOANS_API}/${loanId}`,
      { status },
      this.httpOptions
    );
  }

  // ✅ Delete a loan (if applicable)
  deleteLoan(loanId: number): Observable<any> {
    return this.http.delete(`${LOANS_API}/${loanId}`, this.httpOptions);
  }
}
