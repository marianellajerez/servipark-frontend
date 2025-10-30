import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.css']
})
export class SidenavComponent implements OnInit {

  userRole: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userRole = this.authService.getRole();
  }

  onLogout(): void {
    this.authService.logout();
  }
}