import { Injectable, signal } from '@angular/core';
import { TeamMember, CommitteeMember } from '../models/team-member.model';

@Injectable({
  providedIn: 'root'
})
export class TeamMembersService {
  
  private teamMembers = signal<TeamMember[]>([
    {
      id: '1',
      name: 'Prajwol Phaiju',
      dateOfBirth: '1995-03-15',
      position: 'Goalkeeper',
      isCommittee: false,
      jerseyNumber: 1,
      imageUrl: 'assets/default_human_pic.jpg'
    },
    {
      id: '2',
      name: 'Anuj Shrestha',
      dateOfBirth: '1992-07-22',
      position: 'Defender',
      isCommittee: false,
      jerseyNumber: 4,
      imageUrl: 'assets/default_human_pic.jpg'
    },
    {
      id: '3',
      name: 'Bijay Gurung',
      dateOfBirth: '1998-11-08',
      position: 'Midfielder',
      isCommittee: false,
      jerseyNumber: 8,
      imageUrl: 'assets/default_human_pic.jpg'
    },
    {
      id: '4',
      name: 'Asish Chalise',
      dateOfBirth: '1994-05-12',
      position: 'Forward',
      isCommittee: false,
      jerseyNumber: 9,
      imageUrl: 'assets/default_human_pic.jpg'
    },
    {
      id: '5',
      name: 'Rajesh Thapa',
      dateOfBirth: '1996-08-20',
      position: 'Defender',
      isCommittee: false,
      jerseyNumber: 2,
      imageUrl: 'assets/default_human_pic.jpg'
    },
    {
      id: '6',
      name: 'Suresh Maharjan',
      dateOfBirth: '1993-12-05',
      position: 'Midfielder',
      isCommittee: false,
      jerseyNumber: 10,
      imageUrl: 'assets/default_human_pic.jpg'
    },
    {
      id: '7',
      name: 'Bikash Gurung',
      dateOfBirth: '1997-04-18',
      position: 'Forward',
      isCommittee: false,
      jerseyNumber: 11,
      imageUrl: 'assets/default_human_pic.jpg'
    },
    {
      id: '8',
      name: 'Niraj Shrestha',
      dateOfBirth: '1991-09-30',
      position: 'Defender',
      isCommittee: false,
      jerseyNumber: 3,
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
      phone: '+1-555-0123',
      imageUrl: 'assets/team_members/anup_tam.jpg'
    },
    {
      id: 'c6',
      name: 'Purak  Khadka',
      dateOfBirth: '1990-04-28',
      position: 'Forward',
      isCommittee: true,
      role: 'Vice President',
      phone: '+1-555-0125',
      imageUrl: 'assets/default_human_pic.jpg'
    },
    {
      id: 'c2',
      name: 'Suhang Subba',
      dateOfBirth: '1985-12-03',
      position: 'Defender',
      isCommittee: true,
      role: 'Advisor',
      phone: '+1-555-0124',
      imageUrl: 'assets/team_members/suhang_subba.jpeg'
    },
    {
      id: 'c3',
      name: 'Parashar Poudyal',
      dateOfBirth: '1990-04-28',
      position: 'Forward',
      isCommittee: true,
      role: 'Team Manager',
      phone: '+1-555-0125',
      imageUrl: 'assets/team_members/parashar.jpg'
    },
    {
      id: 'c8',
      name: 'Prajwol Pathak',
      dateOfBirth: '1990-04-28',
      position: 'Forward',
      isCommittee: true,
      role: 'Internal Tournament Coordinator',
      phone: '+1-555-0125',
      imageUrl: 'assets/team_members/prajwol_pathak.jpg'
    },
    {
      id: 'c9',
      name: 'Suhav Ranabhat',
      dateOfBirth: '1990-04-28',
      position: 'Forward',
      isCommittee: true,
      role: 'Treasurer',
      phone: '+1-555-0125',
      imageUrl: 'assets/default_human_pic.jpg'
    },
    {
      id: 'c4',
      name: 'Kancha Shrestha',
      dateOfBirth: '1990-04-28',
      position: 'Forward',
      isCommittee: true,
      role: 'Advisor',
      phone: '+1-555-0125',
      imageUrl: 'assets/team_members/kancha.jpg'
    },
    {
      id: 'c5',
      name: 'Fuba Lama',
      dateOfBirth: '1990-04-28',
      position: 'Forward',
      isCommittee: true,
      role: 'Event Coordinator and Team Manager',
      phone: '+1-555-0125',
      imageUrl: 'assets/team_members/fuba.jpg'
    },
    {
      id: 'c7',
      name: 'Subodh Thapa',
      dateOfBirth: '1990-04-28',
      position: 'Forward',
      isCommittee: true,
      role: 'Internal Tournament Coordinator',
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
