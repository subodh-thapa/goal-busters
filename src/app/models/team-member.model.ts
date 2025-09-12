export interface TeamMember {
  id: string;
  name: string;
  position: string;
  jerseyNumber?: number;
  isCommittee: boolean;
  role?: string; // For committee members
  imageUrl?: string;
  bio?: string;
}

export interface CommitteeMember extends TeamMember {
  role: string;
  email?: string;
  phone?: string;
}
