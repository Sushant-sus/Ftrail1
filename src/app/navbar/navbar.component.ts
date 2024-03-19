import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  // @ViewChild('drawer') drawer!: MatDrawer;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {}

  toggleDrawer() {
    console.log('clicked');
    this.sidebarService.toggle();
  }
}
