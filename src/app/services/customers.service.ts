import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://172.16.8.24:8080/customers';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  //Fetch All Customers from API
  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  //Fetch a Single Customer by ID
  getCustomerById(customerId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${customerId}`);
  }

  //Add a New Customer (with or without a loan)
  addCustomer(customerData: any): Observable<any> {
    return this.http.post(this.apiUrl, customerData, this.httpOptions);
  }

  getCustomersWithoutLoans(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/no-loans`);
  }

  //Update Customer Information
  updateCustomer(customerId: number, updatedData: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${customerId}`,
      updatedData,
      this.httpOptions
    );
  }

  //Delete Customer
  deleteCustomer(customerId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${customerId}`, this.httpOptions);
  }
}
