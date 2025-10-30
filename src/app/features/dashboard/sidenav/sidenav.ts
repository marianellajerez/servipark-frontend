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

  menuState: { [key: string]: boolean } = {
    admin: false
  };

  constructor(private auth: Auth) {}

  ngOnInit(): void {
    this.userRole = this.auth.getRole();
  }

  /**
   * Cambia el estado (abierto/cerrado) de un ítem del menú.
   * @param menuItem El ID del menú (ej. 'admin')
   */
  toggleMenu(menuItem: string): void {
    this.menuState[menuItem] = !this.menuState[menuItem];
  }

  onLogout(): void {
    this.auth.logout();
  }
}