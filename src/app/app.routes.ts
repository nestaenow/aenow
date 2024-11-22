import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ViewerComponent } from './viewer/viewer.component';
import { PublicViewComponent } from './public-view/public-view.component';
import { AdminGuard } from './guards/admin.guard';
import { PublishGuard } from './guards/publish.guard';

export const routes: Routes = [
  { 
    path: 'admin', 
    component: AdminComponent,
    canActivate: [AdminGuard]
  },
  { 
    path: 'view', 
    component: ViewerComponent,
    canActivate: [AdminGuard]
  },
  { 
    path: 'invite/:eventName', 
    component: PublicViewComponent,
    canActivate: [PublishGuard]
  },
  { 
    path: '', 
    redirectTo: '/admin', 
    pathMatch: 'full' 
  }
];