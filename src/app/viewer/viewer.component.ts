import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitationService } from '../services/invitation.service';

@Component({
  selector: 'app-viewer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="viewer-container" [style.background-image]="'url(' + backgroundImage + ')'"
         [style.background-size]="'cover'"
         [style.background-position]="'center'"
         [style.min-height]="'100vh'"
         [style.padding]="'2rem'"
         [style.display]="'flex'"
         [style.justify-content]="'center'"
         [style.align-items]="'center'">
      <div class="card-container">
        <div class="card" [class.flipped]="isFlipped" (click)="toggleFlip()">
          <div class="card-face card-front">
            <img [src]="frontImage" *ngIf="frontImage" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div class="card-face card-back">
            <img [src]="backImage" *ngIf="backImage" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
        </div>
      </div>
    </div>
  `
})
export class ViewerComponent implements OnInit {
  frontImage: string = '';
  backImage: string = '';
  backgroundImage: string = '';
  isFlipped: boolean = false;

  constructor(private invitationService: InvitationService) {}

  ngOnInit() {
    this.invitationService.invitationData$.subscribe(data => {
      this.frontImage = data.frontImage;
      this.backImage = data.backImage;
      this.backgroundImage = data.backgroundImage;
    });
  }

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }
}