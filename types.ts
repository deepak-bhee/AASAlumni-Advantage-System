export enum UserRole {
  ADMIN = 'ADMIN',
  ALUMNI = 'ALUMNI',
  STUDENT = 'STUDENT',
}

export interface User {
  user_id: string;
  name: string;
  email: string;
  role: UserRole;
  batch_year?: string;
  avatar_url?: string;
}

export interface Profile {
  profile_id: string;
  user_id: string;
  industry: string;
  company: string;
  job_title: string;
  bio: string;
  skills: string[];
  location: string;
}

export enum OpportunityType {
  JOB = 'JOB',
  MENTORSHIP = 'MENTORSHIP',
}

export interface Opportunity {
  opportunity_id: string;
  user_id: string; // Alumni ID
  user_name: string; // Denormalized for display
  type: OpportunityType;
  title: string;
  description: string;
  company: string;
  location: string;
  application_deadline: string;
  posted_date: string;
}

export interface Event {
  event_id: string;
  creator_id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  registrations_count: number;
}

export interface Application {
  application_id: string;
  student_id: string;
  student_name: string;
  opportunity_id: string;
  opportunity_title: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  application_date: string;
}

export interface AnalyticsData {
  name: string;
  value: number;
}