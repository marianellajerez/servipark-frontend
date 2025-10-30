import { Component, OnInit } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [ CommonModule, RouterLink, RouterLinkActive ],
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.css']
})
export class Sidenav implements OnInit {

  userRole: string | null = null;

  constructor(private auth: Auth) {}

  ngOnInit(): void {
    this.userRole = this.auth.getRole();
  }

  onLogout(): void {
    this.auth.logout();
  }
}