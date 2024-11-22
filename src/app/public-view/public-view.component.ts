import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitationService } from '../services/invitation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-public-view",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="viewer-container"
      [style.background-image]="'url(' + backgroundImage + ')'"
      [style.background-size]="'cover'"
      [style.background-position]="'center'"
      [style.min-height]="'100vh'"
      [style.padding]="'2rem'"
      [style.display]="'flex'"
      [style.justify-content]="'center'"
      [style.align-items]="'center'"
    >
      <div class="card-container">
        <div class="card" [class.flipped]="isFlipped" (click)="toggleFlip()">
          <div class="card-face card-front">
            <img [src]="frontImage" *ngIf="frontImage" class="invite" />
          </div>
          <div class="card-face card-back">
            <img [src]="backImage" *ngIf="backImage" class="invite" />
          </div>
        </div>
      </div>
    </div>
  `,
})
export class PublicViewComponent implements OnInit {
  frontImage: string = "";
  backImage: string = "";
  backgroundImage: string = "";
  isFlipped: boolean = false;

  constructor(
    private invitationService: InvitationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const data = this.invitationService.getInvitation();
    this.frontImage = data.frontImage;
    this.backImage = data.backImage;
    this.backgroundImage = data.backgroundImage;
  }

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }
}