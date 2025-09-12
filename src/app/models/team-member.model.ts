export interface TeamMember {
  id: string;
  name: string;
  dateOfBirth?: string;
  position?: string; // Soccer position (defender, forward, midfielder, goalkeeper, etc.)
  isCommittee: boolean;
  role?: string; // Organizational role (treasurer, president, coordinator, etc.)
  email?: string;
  phone?: string;
  imageUrl?: string;
  bio?: string;
  jerseyNumber?: number;
}

export function calculateAge(dateOfBirth: string): number {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

export interface CommitteeMember extends TeamMember {
  role: string; // Required organizational role for committee members
  email?: string;
  phone?: string;
}
