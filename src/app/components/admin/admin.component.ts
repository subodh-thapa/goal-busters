import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeamMembersService } from '../../services/team-members.service';
import { GalleryService } from '../../services/gallery.service';
import { UpdatesService } from '../../services/updates.service';
import { SponsorsService } from '../../services/sponsors.service';
import { TeamMember, CommitteeMember } from '../../models/team-member.model';
import { Album, Photo } from '../../models/gallery.model';
import { Update } from '../../models/update.model';
import { Sponsor } from '../../models/sponsor.model';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, LogoComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  private teamMembersService = inject(TeamMembersService);
  private galleryService = inject(GalleryService);
  private updatesService = inject(UpdatesService);
  private sponsorsService = inject(SponsorsService);

  // Data signals
  teamMembers = this.teamMembersService.getTeamMembers();
  committeeMembers = this.teamMembersService.getCommitteeMembers();
  albums = this.galleryService.getAlbums();
  updates = this.updatesService.getUpdates();
  sponsors = this.sponsorsService.getActiveSponsors();

  // UI state
  activeTab = signal<'team' | 'gallery' | 'updates' | 'sponsors'>('team');
  showAddForm = signal(false);
  editingItem = signal<any>(null);

  // Form data
  newTeamMember: Partial<TeamMember> = {
    name: '',
    position: '',
    jerseyNumber: undefined,
    isCommittee: false,
    imageUrl: ''
  };

  newCommitteeMember: Partial<CommitteeMember> = {
    name: '',
    position: '',
    isCommittee: true,
    role: '',
    email: '',
    phone: '',
    imageUrl: ''
  };

  newAlbum: Partial<Album> = {
    title: '',
    description: '',
    coverImageUrl: '',
    eventDate: undefined
  };

  newPhoto: Partial<Photo> = {
    title: '',
    description: '',
    imageUrl: '',
    tags: []
  };

  newUpdate: Partial<Update> = {
    title: '',
    content: '',
    author: '',
    category: 'general',
    isImportant: false,
    imageUrl: ''
  };

  newSponsor: Partial<Sponsor> = {
    name: '',
    logoUrl: '',
    websiteUrl: '',
    description: '',
    tier: 'bronze',
    isActive: true
  };

  setActiveTab(tab: 'team' | 'gallery' | 'updates' | 'sponsors') {
    this.activeTab.set(tab);
    this.showAddForm.set(false);
    this.editingItem.set(null);
  }

  showAddFormFor(type: string) {
    this.showAddForm.set(true);
    this.editingItem.set(null);
    this.resetForms();
  }

  editItem(item: any, type: string) {
    this.editingItem.set(item);
    this.showAddForm.set(true);
    
    switch (type) {
      case 'team':
        this.newTeamMember = { ...item };
        break;
      case 'committee':
        this.newCommitteeMember = { ...item };
        break;
      case 'album':
        this.newAlbum = { ...item };
        break;
      case 'update':
        this.newUpdate = { ...item };
        break;
      case 'sponsor':
        this.newSponsor = { ...item };
        break;
    }
  }

  cancelEdit() {
    this.showAddForm.set(false);
    this.editingItem.set(null);
    this.resetForms();
  }

  resetForms() {
    this.newTeamMember = {
      name: '',
      position: '',
      jerseyNumber: undefined,
      isCommittee: false,
      imageUrl: ''
    };
    this.newCommitteeMember = {
      name: '',
      position: '',
      isCommittee: true,
      role: '',
      email: '',
      phone: '',
      imageUrl: ''
    };
    this.newAlbum = {
      title: '',
      description: '',
      coverImageUrl: '',
      eventDate: undefined
    };
    this.newPhoto = {
      title: '',
      description: '',
      imageUrl: '',
      tags: []
    };
    this.newUpdate = {
      title: '',
      content: '',
      author: '',
      category: 'general',
      isImportant: false,
      imageUrl: ''
    };
    this.newSponsor = {
      name: '',
      logoUrl: '',
      websiteUrl: '',
      description: '',
      tier: 'bronze',
      isActive: true
    };
  }

  // Team Member Management
  addTeamMember() {
    if (this.newTeamMember.name && this.newTeamMember.position) {
      this.teamMembersService.addTeamMember(this.newTeamMember as Omit<TeamMember, 'id'>);
      this.cancelEdit();
    }
  }

  updateTeamMember() {
    if (this.editingItem() && this.newTeamMember.name && this.newTeamMember.position) {
      this.teamMembersService.updateTeamMember(this.editingItem().id, this.newTeamMember);
      this.cancelEdit();
    }
  }

  deleteTeamMember(id: string) {
    if (confirm('Are you sure you want to delete this team member?')) {
      this.teamMembersService.removeTeamMember(id);
    }
  }

  // Committee Member Management
  addCommitteeMember() {
    if (this.newCommitteeMember.name && this.newCommitteeMember.role) {
      this.teamMembersService.addCommitteeMember(this.newCommitteeMember as Omit<CommitteeMember, 'id'>);
      this.cancelEdit();
    }
  }

  updateCommitteeMember() {
    if (this.editingItem() && this.newCommitteeMember.name && this.newCommitteeMember.role) {
      this.teamMembersService.updateCommitteeMember(this.editingItem().id, this.newCommitteeMember);
      this.cancelEdit();
    }
  }

  deleteCommitteeMember(id: string) {
    if (confirm('Are you sure you want to delete this committee member?')) {
      this.teamMembersService.removeCommitteeMember(id);
    }
  }

  // Album Management
  addAlbum() {
    if (this.newAlbum.title) {
      this.galleryService.addAlbum(this.newAlbum as Omit<Album, 'id' | 'photos'>);
      this.cancelEdit();
    }
  }

  updateAlbum() {
    if (this.editingItem() && this.newAlbum.title) {
      this.galleryService.updateAlbum(this.editingItem().id, this.newAlbum);
      this.cancelEdit();
    }
  }

  deleteAlbum(id: string) {
    if (confirm('Are you sure you want to delete this album and all its photos?')) {
      this.galleryService.removeAlbum(id);
    }
  }

  // Update Management
  addUpdate() {
    if (this.newUpdate.title && this.newUpdate.content && this.newUpdate.author) {
      this.updatesService.addUpdate({
        ...this.newUpdate,
        publishDate: new Date()
      } as Omit<Update, 'id'>);
      this.cancelEdit();
    }
  }

  updateUpdate() {
    if (this.editingItem() && this.newUpdate.title && this.newUpdate.content && this.newUpdate.author) {
      this.updatesService.updateUpdate(this.editingItem().id, this.newUpdate);
      this.cancelEdit();
    }
  }

  deleteUpdate(id: string) {
    if (confirm('Are you sure you want to delete this update?')) {
      this.updatesService.removeUpdate(id);
    }
  }

  // Sponsor Management
  addSponsor() {
    if (this.newSponsor.name && this.newSponsor.logoUrl) {
      this.sponsorsService.addSponsor(this.newSponsor as Omit<Sponsor, 'id'>);
      this.cancelEdit();
    }
  }

  updateSponsor() {
    if (this.editingItem() && this.newSponsor.name && this.newSponsor.logoUrl) {
      this.sponsorsService.updateSponsor(this.editingItem().id, this.newSponsor);
      this.cancelEdit();
    }
  }

  deleteSponsor(id: string) {
    if (confirm('Are you sure you want to delete this sponsor?')) {
      this.sponsorsService.removeSponsor(id);
    }
  }

  toggleSponsorStatus(id: string) {
    this.sponsorsService.toggleSponsorStatus(id);
  }
}
