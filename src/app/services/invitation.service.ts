import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface InvitationData {
  frontImage: string;
  backImage: string;
  backgroundImage: string;
  eventName?: string;
  isPublished?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  private invitationData = new BehaviorSubject<InvitationData>(this.loadFromStorage());

  invitationData$ = this.invitationData.asObservable();

  private loadFromStorage(): InvitationData {
    const stored = localStorage.getItem('invitationData');
    return stored ? JSON.parse(stored) : {
      frontImage: '',
      backImage: '',
      backgroundImage: '',
      eventName: '',
      isPublished: false
    };
  }

  private saveToStorage(data: InvitationData) {
    localStorage.setItem('invitationData', JSON.stringify(data));
  }

  updateInvitation(data: InvitationData) {
    const newData = {
      ...this.invitationData.getValue(),
      ...data
    };
    this.invitationData.next(newData);
    this.saveToStorage(newData);
  }

  getInvitation() {
    return this.invitationData.getValue();
  }

  publishInvitation(eventName: string) {
    const newData = {
      ...this.invitationData.getValue(),
      eventName,
      isPublished: true
    };
    this.invitationData.next(newData);
    this.saveToStorage(newData);
  }
}