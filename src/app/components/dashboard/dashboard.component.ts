import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['customer', 'amount', 'status'];
  dataSource!: MatTableDataSource<{
    customer: string;
    amount: number;
    status: string;
  }>;

  pageSize = 10;
  sortColumn = 'customer';
  sortDirection: 'asc' | 'desc' = 'asc';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Initialize the data source with dummy data
    this.dataSource = new MatTableDataSource([
      { customer: 'John Doe', amount: 5000, status: 'Approved' },
      { customer: 'Jane Smith', amount: 12000, status: 'Pending' },
      { customer: 'Alice Brown', amount: 7500, status: 'Paid' },
      { customer: 'Mark Johnson', amount: 3200, status: 'Rejected' },
      { customer: 'Emily Davis', amount: 9800, status: 'Approved' },
      { customer: 'John Kamau', amount: 5000, status: 'Approved' },
      { customer: 'Nara Smith', amount: 12000, status: 'Pending' },
      { customer: 'Mike Brown', amount: 7500, status: 'Paid' },
      { customer: 'Matthew Johnson', amount: 3200, status: 'Rejected' },
      { customer: 'Jamal Karim', amount: 9800, status: 'Approved' },
      { customer: 'Wamuyu Wangari', amount: 5000, status: 'Approved' },
      { customer: 'Naomi Gitonga', amount: 12000, status: 'Pending' },
      { customer: 'Mike Todd', amount: 8500, status: 'Paid' },
      { customer: 'Eliud Muriuki', amount: 3200, status: 'Rejected' },
      { customer: 'Ann Kinanu', amount: 98000, status: 'Approved' },
    ]);
  }

  ngOnInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    if (this.dataSource) {
      this.dataSource.filter = filterValue;
    }
  }

  applySorting() {
    if (this.sort) {
      this.sort.active = this.sortColumn;
      this.sort.direction = this.sortDirection;
      this.sort.sortChange.emit(); // Trigger sorting
    }
  }

  updatePageSize() {
    if (this.paginator) {
      this.paginator.pageSize = this.pageSize;
    }
  }
}
