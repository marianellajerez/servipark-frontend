import { Component, OnInit } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {

  userName: string | null = null;
  userEmail: string | null = null;
  userRole: string | null = null;

  isMenuOpen = false;

  constructor(private auth: Auth) {}

  ngOnInit(): void {
    this.userName = this.auth.getCurrentUser();
    this.userRole = this.auth.getRole();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onLogout(): void {
    this.auth.logout();
  }
}