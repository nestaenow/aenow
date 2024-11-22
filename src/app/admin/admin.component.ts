import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvitationService } from '../services/invitation.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-container">
      <h2>Upload Invitation Cards</h2>
      <div class="upload-form">
        <div>
          <h3>Front Image</h3>
          <input type="file" (change)="onFrontImageSelect($event)" accept="image/*">
          <img *ngIf="frontPreview" [src]="frontPreview" class="preview-image">
        </div>
        
        <div>
          <h3>Back Image</h3>
          <input type="file" (change)="onBackImageSelect($event)" accept="image/*">
          <img *ngIf="backPreview" [src]="backPreview" class="preview-image">
        </div>
        
        <div>
          <h3>Background Image</h3>
          <input type="file" (change)="onBackgroundImageSelect($event)" accept="image/*">
          <img *ngIf="backgroundPreview" [src]="backgroundPreview" class="preview-image">
        </div>

        <div *ngIf="isSaved">
          <h3>Event Name</h3>
          <input type="text" [(ngModel)]="eventName" placeholder="Enter event name">
          <p class="public-url" *ngIf="isPublished">
            Public URL: <a [href]="'/invite/' + eventName" target="_blank">{{getPublicUrl()}}</a>
          </p>
        </div>
        
        <div class="button-group">
          <button (click)="saveChanges()" *ngIf="!isSaved">Save Changes</button>
          <button (click)="publishInvitation()" *ngIf="isSaved && !isPublished" [disabled]="!eventName">
            Publish Invitation
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .button-group {
      display: flex;
      gap: 1rem;
    }
    .public-url {
      margin-top: 1rem;
      padding: 1rem;
      background: #e9ecef;
      border-radius: 4px;
    }
    input[type="text"] {
      width: 100%;
      padding: 0.5rem;
      margin-top: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  `]
})
export class AdminComponent {
  frontPreview: string = '';
  backPreview: string = '';
  backgroundPreview: string = '';
  eventName: string = '';
  isSaved: boolean = false;
  isPublished: boolean = false;

  constructor(private invitationService: InvitationService) {}

  onFrontImageSelect(event: any) {
    this.handleImageSelect(event, 'front');
  }

  onBackImageSelect(event: any) {
    this.handleImageSelect(event, 'back');
  }

  onBackgroundImageSelect(event: any) {
    this.handleImageSelect(event, 'background');
  }

  handleImageSelect(event: any, type: 'front' | 'back' | 'background') {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        switch(type) {
          case 'front':
            this.frontPreview = e.target.result;
            break;
          case 'back':
            this.backPreview = e.target.result;
            break;
          case 'background':
            this.backgroundPreview = e.target.result;
            break;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  saveChanges() {
    this.invitationService.updateInvitation({
      frontImage: this.frontPreview,
      backImage: this.backPreview,
      backgroundImage: this.backgroundPreview
    });
    this.isSaved = true;
  }

  publishInvitation() {
    if (this.eventName) {
      this.invitationService.publishInvitation(this.eventName);
      this.isPublished = true;
    }
  }

  getPublicUrl() {
    return `${window.location.origin}/invite/${this.eventName}`;
  }
}