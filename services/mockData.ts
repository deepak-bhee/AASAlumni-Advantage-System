
import { User, UserRole, Profile, Opportunity, OpportunityType, Event, Application } from '../types';

export const MOCK_USERS: User[] = [
  { user_id: 'u1', name: 'Dr. Sachidanand S Joshi', email: 'admin@sdm.edu', role: UserRole.ADMIN, avatar_url: 'https://picsum.photos/200' },
  { user_id: 'u2', name: 'Muhammad Suhail Patil', email: 'suhail@alum.sdm.edu', role: UserRole.ALUMNI, batch_year: '2020', avatar_url: 'https://picsum.photos/201' },
  { user_id: 'u3', name: 'Samarth V Patil', email: 'samarth@student.sdm.edu', role: UserRole.STUDENT, batch_year: '2025', avatar_url: 'https://picsum.photos/202' },
  { user_id: 'u4', name: 'Priya Sharma', email: 'priya@alum.sdm.edu', role: UserRole.ALUMNI, batch_year: '2018', avatar_url: 'https://picsum.photos/203' },
];

export const MOCK_PROFILES: Profile[] = [
  { profile_id: 'p1', user_id: 'u2', industry: 'Software Engineering', company: 'Google', job_title: 'Senior Engineer', bio: 'Passionate about distributed systems.', skills: ['React', 'Node.js', 'System Design'], location: 'Bangalore' },
  { profile_id: 'p2', user_id: 'u4', industry: 'Data Science', company: 'Amazon', job_title: 'Data Scientist', bio: 'Helping businesses make data-driven decisions.', skills: ['Python', 'Machine Learning', 'AWS'], location: 'Hyderabad' },
];

export const MOCK_OPPORTUNITIES: Opportunity[] = [
  { opportunity_id: 'o1', user_id: 'u2', user_name: 'Muhammad Suhail Patil', type: OpportunityType.MENTORSHIP, title: 'Frontend Engineering Mentorship', description: 'Guiding students on modern frontend stacks.', company: 'Google', location: 'Remote', application_deadline: '2025-12-01', posted_date: '2025-10-01' },
  { opportunity_id: 'o2', user_id: 'u4', user_name: 'Priya Sharma', type: OpportunityType.JOB, title: 'Junior Data Analyst Intern', description: 'Looking for interns with strong SQL skills.', company: 'Amazon', location: 'Hyderabad', application_deadline: '2025-11-15', posted_date: '2025-10-05' },
];

export const MOCK_EVENTS: Event[] = [
  { event_id: 'e1', creator_id: 'u1', title: 'Alumni Meetup 2025', date: '2025-11-20', time: '10:00 AM', location: 'SDM Auditorium', description: 'Annual gathering of all batch alumni.', registrations_count: 120, registrations: [] },
  { event_id: 'e2', creator_id: 'u2', title: 'Tech Talk: Future of AI', date: '2025-12-05', time: '02:00 PM', location: 'Virtual (Zoom)', description: 'Deep dive into Generative AI trends.', registrations_count: 45, registrations: [] },
];

export const MOCK_APPLICATIONS: Application[] = [
  { application_id: 'a1', student_id: 'u3', student_name: 'Samarth V Patil', opportunity_id: 'o1', opportunity_title: 'Frontend Engineering Mentorship', status: 'PENDING', application_date: '2025-10-10' }
];
