import { Injectable, signal } from '@angular/core';
import { TeamMember, CommitteeMember } from '../models/team-member.model';

@Injectable({
  providedIn: 'root'
})
export class TeamMembersService {
  private teamMembers = signal<TeamMember[]>([
    {
      id: '1',
      name: 'John Smith',
      position: 'Goalkeeper',
      jerseyNumber: 1,
      isCommittee: false,
      imageUrl: 'https://via.placeholder.com/150x150/1e40af/ffffff?text=JS'
    },
    {
      id: '2',
      name: 'Mike Johnson',
      position: 'Defender',
      jerseyNumber: 4,
      isCommittee: false,
      imageUrl: 'https://via.placeholder.com/150x150/1e40af/ffffff?text=MJ'
    },
    {
      id: '3',
      name: 'David Wilson',
      position: 'Midfielder',
      jerseyNumber: 8,
      isCommittee: false,
      imageUrl: 'https://via.placeholder.com/150x150/1e40af/ffffff?text=DW'
    },
    {
      id: '4',
      name: 'Alex Brown',
      position: 'Forward',
      jerseyNumber: 10,
      isCommittee: false,
      imageUrl: 'https://via.placeholder.com/150x150/1e40af/ffffff?text=AB'
    }
  ]);

  private committeeMembers = signal<CommitteeMember[]>([
    {
      id: 'c1',
      name: 'Sarah Davis',
      position: 'Manager',
      isCommittee: true,
      role: 'Team Manager',
      email: 'sarah.davis@goalbusters.com',
      phone: '+1-555-0123',
      imageUrl: 'https://via.placeholder.com/150x150/1e40af/ffffff?text=SD'
    },
    {
      id: 'c2',
      name: 'Robert Taylor',
      position: 'Coach',
      isCommittee: true,
      role: 'Head Coach',
      email: 'robert.taylor@goalbusters.com',
      phone: '+1-555-0124',
      imageUrl: 'https://via.placeholder.com/150x150/1e40af/ffffff?text=RT'
    },
    {
      id: 'c3',
      name: 'Lisa Anderson',
      position: 'Treasurer',
      isCommittee: true,
      role: 'Treasurer',
      email: 'lisa.anderson@goalbusters.com',
      phone: '+1-555-0125',
      imageUrl: 'https://via.placeholder.com/150x150/1e40af/ffffff?text=LA'
    }
  ]);

  getTeamMembers() {
    return this.teamMembers.asReadonly();
  }

  getCommitteeMembers() {
    return this.committeeMembers.asReadonly();
  }

  addTeamMember(member: Omit<TeamMember, 'id'>) {
    const newMember: TeamMember = {
      ...member,
      id: Date.now().toString()
    };
    this.teamMembers.update(members => [...members, newMember]);
  }

  addCommitteeMember(member: Omit<CommitteeMember, 'id'>) {
    const newMember: CommitteeMember = {
      ...member,
      id: 'c' + Date.now().toString()
    };
    this.committeeMembers.update(members => [...members, newMember]);
  }

  removeTeamMember(id: string) {
    this.teamMembers.update(members => members.filter(m => m.id !== id));
  }

  removeCommitteeMember(id: string) {
    this.committeeMembers.update(members => members.filter(m => m.id !== id));
  }

  updateTeamMember(id: string, updates: Partial<TeamMember>) {
    this.teamMembers.update(members => 
      members.map(m => m.id === id ? { ...m, ...updates } : m)
    );
  }

  updateCommitteeMember(id: string, updates: Partial<CommitteeMember>) {
    this.committeeMembers.update(members => 
      members.map(m => m.id === id ? { ...m, ...updates } : m)
    );
  }
}
