import { Injectable, signal } from '@angular/core';
import { TeamMember, CommitteeMember } from '../models/team-member.model';

@Injectable({
  providedIn: 'root'
})
export class TeamMembersService {
  
  private generateEmail(name: string): string {
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
  private teamMembers = signal<TeamMember[]>([
    {
      id: '1',
      name: 'Prajwol Phaiju',
      dateOfBirth: '1995-03-15',
      position: 'Goalkeeper',
      isCommittee: false,
      email: this.generateEmail('Prajwol Phaiju'),
      phone: '+1-555-1001',
      imageUrl: 'assets/default_human_pic.jpg'
    },
    {
      id: '2',
      name: 'Anuj Shrestha',
      dateOfBirth: '1992-07-22',
      position: 'Defender',
      isCommittee: false,
      email: this.generateEmail('Anuj Shrestha'),
      phone: '+1-555-1002',
      imageUrl: 'assets/default_human_pic.jpg'
    },
    {
      id: '3',
      name: 'Bijay Gurung',
      dateOfBirth: '1998-11-08',
      position: 'Midfielder',
      isCommittee: false,
      email: this.generateEmail('Bijay Gurung'),
      phone: '+1-555-1003',
      imageUrl: 'assets/default_human_pic.jpg'
    },
    {
      id: '4',
      name: 'Asish Chalise',
      dateOfBirth: '1994-05-12',
      position: 'Forward',
      isCommittee: false,
      email: this.generateEmail('Asish Chalise'),
      phone: '+1-555-1004',
      imageUrl: 'assets/default_human_pic.jpg'
    }
  ]);

  private committeeMembers = signal<CommitteeMember[]>([
    {
      id: 'c1',
      name: 'Anup Tamrakar',
      dateOfBirth: '1988-09-14',
      isCommittee: true,
      role: 'President',
      email: this.generateEmail('Anup Tamrakar'),
      phone: '+1-555-0123',
      imageUrl: 'assets/default_human_pic.jpg'
    },
    {
      id: 'c2',
      name: 'Suhang Subba',
      dateOfBirth: '1985-12-03',
      position: 'Defender',
      isCommittee: true,
      role: 'Advisor',
      email: this.generateEmail('Suhang Subba'),
      phone: '+1-555-0124',
      imageUrl: 'assets/default_human_pic.jpg'
    },
    {
      id: 'c3',
      name: 'Parashar Poudyal',
      dateOfBirth: '1990-04-28',
      position: 'Forward',
      isCommittee: true,
      role: 'Team Manager',
      email: this.generateEmail('Parashar Poudyal'),
      phone: '+1-555-0125',
      imageUrl: 'assets/team_members/parashar.jpg'
    },
    {
      id: 'c4',
      name: 'Kancha Shrestha',
      dateOfBirth: '1990-04-28',
      position: 'Forward',
      isCommittee: true,
      role: 'Advisor',
      email: this.generateEmail('Kancha Shrestha'),
      phone: '+1-555-0125',
      imageUrl: 'assets/default_human_pic.jpg'
    },
    {
      id: 'c5',
      name: 'Phurba Lama',
      dateOfBirth: '1990-04-28',
      position: 'Forward',
      isCommittee: true,
      role: 'Event Coordinator and Team Manager',
      email: this.generateEmail('Phurba Lama'),
      phone: '+1-555-0125',
      imageUrl: 'assets/default_human_pic.jpg'
    },
    {
      id: 'c6',
      name: 'Purak  Khadka',
      dateOfBirth: '1990-04-28',
      position: 'Forward',
      isCommittee: true,
      role: 'Vice President',
      email: this.generateEmail('Purak  Khadka'),
      phone: '+1-555-0125',
      imageUrl: 'assets/default_human_pic.jpg'
    },
    {
      id: 'c7',
      name: 'Subodh Thapa',
      dateOfBirth: '1990-04-28',
      position: 'Forward',
      isCommittee: true,
      role: 'Internal Tournament Coordinator',
      email: this.generateEmail('Subodh Thapa'),
      phone: '+1-555-0125',
      imageUrl: 'assets/default_human_pic.jpg'
    },
    {
      id: 'c8',
      name: 'Prajwol Pathak',
      dateOfBirth: '1990-04-28',
      position: 'Forward',
      isCommittee: true,
      role: 'Internal Tournament Coordinator',
      email: this.generateEmail('Prajwol Pathak'),
      phone: '+1-555-0125',
      imageUrl: 'assets/team_members/prajwol_pathak.jpg'
    },
    {
      id: 'c9',
      name: 'Binod Basnet',
      dateOfBirth: '1990-04-28',
      position: 'Forward',
      isCommittee: true,
      role: 'Advisor',
      email: this.generateEmail('Binod Basnet'),
      phone: '+1-555-0125',
      imageUrl: 'assets/default_human_pic.jpg'
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
