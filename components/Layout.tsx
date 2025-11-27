import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, GraduationCap, Briefcase, Calendar, 
  BarChart, User, LogOut, Home, Bell 
} from 'lucide-react';
import { UserRole } from '../types';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
        isActive(to) 
          ? 'bg-primary-600 text-white' 
          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-900 text-white border-r border-gray-800">
        <div className="flex items-center justify-center h-16 border-b border-gray-800">
          <GraduationCap className="text-primary-500 mr-2" />
          <span className="text-xl font-bold tracking-wider">AAS</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {user && (
            <>
              <NavItem to="/dashboard" icon={Home} label="Dashboard" />
              
              <div className="pt-4 pb-2">
                <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Menu
                </p>
              </div>

              {(user.role === UserRole.ALUMNI || user.role === UserRole.STUDENT) && (
                 <NavItem to="/jobs" icon={Briefcase} label="Jobs & Mentorship" />
              )}
              
              <NavItem to="/events" icon={Calendar} label="Events" />
              
              {user.role === UserRole.ADMIN && (
                <NavItem to="/analytics" icon={BarChart} label="Analytics" />
              )}
              
              <NavItem to="/profile" icon={User} label="My Profile" />
            </>
          )}
        </nav>

        {user && (
          <div className="p-4 border-t border-gray-800">
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-2 w-full text-left text-gray-300 hover:text-white transition-colors"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header - Mobile */}
        <header className="flex md:hidden items-center justify-between h-16 px-4 bg-white border-b shadow-sm z-20">
          <div className="flex items-center">
            <GraduationCap className="text-primary-600 mr-2" />
            <span className="font-bold text-gray-900">AAS</span>
          </div>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-gray-600">
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
        </header>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 bg-gray-900 bg-opacity-95 text-white flex flex-col p-4 md:hidden">
            <div className="flex justify-end mb-8">
              <button onClick={() => setSidebarOpen(false)}><X /></button>
            </div>
            <nav className="space-y-4">
              <Link to="/dashboard" onClick={() => setSidebarOpen(false)} className="block py-2">Dashboard</Link>
              <Link to="/jobs" onClick={() => setSidebarOpen(false)} className="block py-2">Jobs</Link>
              <Link to="/events" onClick={() => setSidebarOpen(false)} className="block py-2">Events</Link>
              <Link to="/profile" onClick={() => setSidebarOpen(false)} className="block py-2">Profile</Link>
              <button onClick={handleLogout} className="block w-full text-left py-2 text-red-400">Sign Out</button>
            </nav>
          </div>
        )}

        {/* Header - Desktop (User Info) */}
        <header className="hidden md:flex items-center justify-between h-16 px-8 bg-white border-b shadow-sm">
           <h1 className="text-xl font-semibold text-gray-800">
             {isActive('/dashboard') ? 'Dashboard' : 
              isActive('/jobs') ? 'Jobs & Mentorship' :
              isActive('/events') ? 'Events' :
              isActive('/analytics') ? 'Analytics' :
              isActive('/profile') ? 'Profile' : 'Welcome'}
           </h1>
           {user && (
             <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-500 hover:text-primary-600 transition-colors relative">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="flex items-center space-x-3 border-l pl-4 border-gray-200">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role.toLowerCase()}</p>
                  </div>
                  <img 
                    src={user.avatar_url || 'https://via.placeholder.com/40'} 
                    alt="User" 
                    className="w-10 h-10 rounded-full border border-gray-200"
                  />
                </div>
             </div>
           )}
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};