import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamMembersService } from '../../services/team-members.service';
import { TeamMember, CommitteeMember } from '../../models/team-member.model';
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
}
