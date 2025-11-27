import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { UserRole, OpportunityType } from '../types';
import { Briefcase, Calendar, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const { user } = useAuth();
  const { opportunities, events, applications } = useData();

  if (!user) return null;

  const StatCard = ({ label, value, icon: Icon, color }: { label: string, value: string | number, icon: any, color: string }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  );

  const RecentActivity = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Events & Opportunities</h3>
      <div className="space-y-4">
        {opportunities.slice(0, 3).map(op => (
          <div key={op.opportunity_id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-50 last:border-0">
             <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
               {op.type === OpportunityType.JOB ? 'JOB' : 'MEN'}
             </div>
             <div className="ml-4">
               <p className="text-sm font-medium text-gray-900">{op.title}</p>
               <p className="text-xs text-gray-500">{op.company} • {op.location}</p>
             </div>
          </div>
        ))}
        {opportunities.length === 0 && <p className="text-gray-500 text-sm">No recent activity.</p>}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <Link to="/jobs" className="text-sm text-primary-600 font-medium hover:text-primary-700">View all opportunities &rarr;</Link>
      </div>
    </div>
  );

  // Admin Dashboard
  if (user.role === UserRole.ADMIN) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard label="Total Users" value="1,240" icon={Users} color="bg-blue-500" />
          <StatCard label="Active Events" value={events.length} icon={Calendar} color="bg-purple-500" />
          <StatCard label="Job Postings" value={opportunities.length} icon={Briefcase} color="bg-green-500" />
          <StatCard label="Placements" value="85%" icon={TrendingUp} color="bg-orange-500" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <RecentActivity />
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
             <h3 className="text-lg font-bold text-gray-900 mb-4">System Reports</h3>
             <p className="text-gray-600 text-sm mb-4">Generate reports on alumni engagement and placement statistics.</p>
             <Link to="/analytics" className="inline-block px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800">Go to Analytics</Link>
           </div>
        </div>
      </div>
    );
  }

  // Alumni Dashboard
  if (user.role === UserRole.ALUMNI) {
    const myPosts = opportunities.filter(o => o.user_id === user.user_id);
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Alumni Overview</h2>
          <Link to="/jobs" className="px-4 py-2 bg-primary-600 text-white rounded-lg shadow-sm hover:bg-primary-700 text-sm font-medium">Post Opportunity</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label="My Posts" value={myPosts.length} icon={Briefcase} color="bg-blue-500" />
          <StatCard label="Applications Received" value="12" icon={Users} color="bg-purple-500" />
          <StatCard label="Events Attended" value="3" icon={Calendar} color="bg-green-500" />
        </div>
        <RecentActivity />
      </div>
    );
  }

  // Student Dashboard
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-primary-600 to-blue-800 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold">Welcome back, {user.name}!</h2>
        <p className="mt-2 text-blue-100">Browse new mentorship opportunities and connect with alumni from your batch.</p>
        <div className="mt-6">
          <Link to="/jobs" className="px-6 py-2 bg-white text-primary-700 rounded-lg font-semibold shadow-sm hover:bg-gray-50 transition-colors">Find Mentors</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label="My Applications" value={applications.filter(a => a.student_id === user.user_id).length} icon={Briefcase} color="bg-blue-500" />
          <StatCard label="Upcoming Events" value={events.length} icon={Calendar} color="bg-purple-500" />
          <StatCard label="Profile Views" value="24" icon={Users} color="bg-green-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <RecentActivity />
         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recommended Events</h3>
            {events.slice(0, 3).map(evt => (
               <div key={evt.event_id} className="mb-4 pb-4 border-b border-gray-50 last:border-0 last:mb-0 last:pb-0">
                  <div className="flex justify-between">
                     <h4 className="font-semibold text-gray-900">{evt.title}</h4>
                     <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded">{evt.date}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 truncate">{evt.description}</p>
               </div>
            ))}
            <Link to="/events" className="text-sm text-primary-600 font-medium hover:text-primary-700 block mt-2">View all events &rarr;</Link>
         </div>
      </div>
    </div>
  );
};