import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from '../../services/customers.service';
import { CustomerModalComponent } from '../customer-modal/customer-modal.component';
import { AddCustomerComponent } from '../add-customer/add-customer.component';

interface Customer {
  id: number;
  firstname: string;
  lastname: string;
  nationalid: string;
  phonenumber: string;
  startdate: string;
  updated_at: string;
  loans: Loan[];
}

interface Loan {
  principal_amount: number;
  duedate: string;
  status: string;
  created_at: string;
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'loanAmount',
    'dateReceived',
    'dueDate',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<Customer>([]);

  pageSize = 10;
  sortColumn = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private customerService: CustomerService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchCustomers();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    });
  }

  // Fetch Customers with Correct Loan Mapping
  fetchCustomers() {
    this.customerService.getCustomers().subscribe((customers) => {
      this.dataSource.data = customers.map((customer) => ({
        ...customer,
        loanAmount: customer.loans?.[0]?.principal_amount ?? 0,
        dateReceived: customer.loans?.[0]?.startdate ?? 'N/A',
        dueDate: customer.loans?.[0]?.duedate ?? 'N/A',
        status: customer.loans?.[0]?.status ?? 'No Loan',
      }));
    });
  }

  // Calculate Total Active Loans
  get totalActiveLoans(): number {
    return this.dataSource.data
      .flatMap((c) => c.loans || [])
      .filter((l) => l.status === 'PENDING').length;
  }

  // Calculate Total Completed Loans
  get totalCompletedLoans(): number {
    return this.dataSource.data
      .flatMap((c) => c.loans || [])
      .filter((l) => l.status === 'PAID').length;
  }

  // Calculate Total Loan Amount
  get totalLoanAmount(): number {
    return this.dataSource.data
      .flatMap((c) => c.loans || [])
      .reduce((sum, l) => sum + (l.principal_amount || 0), 0);
  }

  // Apply Table Filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // Apply Sorting
  applySorting() {
    if (this.sort) {
      this.sort.active = this.sortColumn;
      this.sort.direction = this.sortDirection;
      this.sort.sortChange.emit();
    }
  }

 
  getStatusClass(status: string): string {
    const statusClassMap: { [key: string]: string } = {
      PENDING: 'pending-loan',
      APPROVED: 'approved-loan',
      REJECTED: 'rejected-loan',
      DISBURSED: 'disbursed-loan',
      IN_REPAYMENT: 'in_repayment-loan',
      PAID: 'paid-loan',
      DEFAULTED: 'defaulted-loan',
    };

    return statusClassMap[status] || 'unknown-loan';
  }

  // Open Add Customer Modal
  openAddCustomerModal() {
    this.dialog.open(AddCustomerComponent, { width: '500px' });
  }

  // Open Customer Modal
  openCustomerModal(customer: Customer) {
    this.dialog.open(CustomerModalComponent, {
      width: '500px',
      data: customer,
    });
  }

  // Delete Customer
  deleteCustomer(customer: Customer) {
    const index = this.dataSource.data.findIndex((c) => c.id === customer.id);
    if (index !== -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    }
  }
}
