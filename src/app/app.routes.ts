import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { TeamMembersComponent } from './components/team-members/team-members.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Goal Busters - Home' },
  { path: 'gallery', component: GalleryComponent, title: 'Goal Busters - Gallery' },
  { path: 'team', component: TeamMembersComponent, title: 'Goal Busters - Team Members' },
  // { path: 'admin', component: AdminComponent, title: 'Goal Busters - Admin' },
  { path: '**', redirectTo: '' }
];
