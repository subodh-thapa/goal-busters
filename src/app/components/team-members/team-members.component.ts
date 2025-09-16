import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamMembersService } from '../../services/team-members.service';
import { TeamMember, CommitteeMember, calculateAge } from '../../models/team-member.model';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-team-members',
  standalone: true,
  imports: [CommonModule, LogoComponent],
  templateUrl: './team-members.component.html',
  styleUrl: './team-members.component.scss'
})
export class TeamMembersComponent {
  private teamMembersService = inject(TeamMembersService);

  teamMembers = this.teamMembersService.getTeamMembers();
  committeeMembers = this.teamMembersService.getCommitteeMembers();
  
  // Toggle state for switching between players and board members
  showPlayers = signal(false);
  
  // Make calculateAge function available in template
  calculateAge = calculateAge;
  
  // Generate email function for use in template
  generateEmail(name: string): string {
    const nameParts = name.toLowerCase().trim().split(/\s+/);
    if (nameParts.length >= 2) {
      const firstName = nameParts[0];
      const lastName = nameParts[nameParts.length - 1];
      return `${firstName}.${lastName}@goalbusters.com`;
    } else if (nameParts.length === 1) {
      return `${nameParts[0]}@goalbusters.com`;
    }
    return 'member@goalbusters.com';
  }
  
  // Get email for display - use provided email or generate one
  getDisplayEmail(member: TeamMember | CommitteeMember): string {
    return member.email || this.generateEmail(member.name);
  }
  
  // Toggle between players and board members view
  toggleView() {
    this.showPlayers.update(current => !current);
  }
}
