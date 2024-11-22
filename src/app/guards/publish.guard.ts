import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { InvitationService } from '../services/invitation.service';

@Injectable({
  providedIn: 'root'
})
export class PublishGuard implements CanActivate {
  constructor(
    private invitationService: InvitationService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const invitation = this.invitationService.getInvitation();
    const eventName = route.params['eventName'];
    
    if (!invitation.isPublished || invitation.eventName !== eventName) {
      this.router.navigate(['/admin']);
      return false;
    }
    return true;
  }
}