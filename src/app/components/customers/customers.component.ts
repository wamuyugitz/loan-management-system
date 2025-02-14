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
  created_at: string;
  updated_at: string;
  loans: Loan[];
}

interface Loan {
  id: number;
  principalAmount: number;
  interestRate: number;
  dueDate: string;
  repaymentPeriod: number;
  frequency: string;
  status: string;
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
    'dateReceived', //Changed from 'created_at' to match template
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

  fetchCustomers() {
    this.customerService.getCustomers().subscribe((customers) => {
      this.dataSource.data = customers.map((customer) => {
        const firstLoan =
          customer.loans && customer.loans.length > 0
            ? customer.loans[0]
            : null;

        return {
          ...customer,
          loanAmount:
            firstLoan && firstLoan.principalAmount !== null
              ? Number(firstLoan.principalAmount)
              : 0,
          dateReceived:
            firstLoan && firstLoan.created_at ? firstLoan.created_at : 'N/A',
          dueDate: firstLoan && firstLoan.dueDate ? firstLoan.dueDate : 'N/A',
          status: firstLoan && firstLoan.status ? firstLoan.status : 'No Loan',
        };
      });

      console.log('Mapped Customers:', this.dataSource.data); //Verify final mapped data
    });
  }

  //Get total active loans count
  get totalActiveLoans(): number {
    return this.dataSource.data
      .flatMap((customer) => customer.loans || [])
      .filter((loan) => loan.status === 'PENDING').length;
  }

  //Get total completed loans count
  get totalCompletedLoans(): number {
    return this.dataSource.data
      .flatMap((customer) => customer.loans || [])
      .filter((loan) => loan.status === 'PAID').length;
  }

  //Get total loan amount
  get totalLoanAmount(): number {
    return this.dataSource.data
      .flatMap((customer) => customer.loans || [])
      .reduce((acc, loan) => acc + (loan.principalAmount || 0), 0);
  }

  //Filtering function
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }

  //Sorting function
  applySorting() {
    if (this.sort) {
      this.sort.active = this.sortColumn;
      this.sort.direction = this.sortDirection;
      this.sort.sortChange.emit();
    }
  }

  //Open Add Customer Modal
  openAddCustomerModal() {
    this.dialog.open(AddCustomerComponent, {
      width: '500px',
    });
  }

  //Open View More Modal
  openCustomerModal(customer: Customer) {
    this.dialog.open(CustomerModalComponent, {
      width: '500px',
      data: customer,
    });
  }

  //Delete customer from table
  deleteCustomer(customer: Customer) {
    const index = this.dataSource.data.findIndex((c) => c.id === customer.id);
    if (index !== -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription(); // Refresh table
    }
  }
}
