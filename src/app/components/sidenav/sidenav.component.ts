import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  isExpanded = true; // ✅ Sidebar starts open

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
  }
}
