import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { InvitationService } from '../services/invitation.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1';
    if (!isLocalhost) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}