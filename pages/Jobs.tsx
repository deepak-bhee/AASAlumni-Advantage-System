import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { UserRole, OpportunityType, Opportunity, Application } from '../types';
import { Briefcase, MapPin, User, Search, Plus, CheckCircle } from 'lucide-react';

export const Jobs = () => {
  const { user } = useAuth();
  const { opportunities, addOpportunity, applications, addApplication } = useData();
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<'ALL' | 'JOB' | 'MENTORSHIP'>('ALL');
  
  // Form State
  const [formData, setFormData] = useState<Partial<Opportunity>>({
    type: OpportunityType.JOB,
    title: '',
    company: '',
    location: '',
    description: '',
    application_deadline: ''
  });

  const handleApply = (oppId: string, oppTitle: string) => {
    if (!user) return;
    const newApp: Application = {
      application_id: `a${Date.now()}`,
      student_id: user.user_id,
      student_name: user.name,
      opportunity_id: oppId,
      opportunity_title: oppTitle,
      status: 'PENDING',
      application_date: new Date().toISOString().split('T')[0]
    };
    addApplication(newApp);
    alert('Application Submitted Successfully!');
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    const newOpp: Opportunity = {
      opportunity_id: `o${Date.now()}`,
      user_id: user.user_id,
      user_name: user.name,
      posted_date: new Date().toISOString().split('T')[0],
      type: formData.type as OpportunityType,
      title: formData.title || '',
      company: formData.company || '',
      location: formData.location || '',
      description: formData.description || '',
      application_deadline: formData.application_deadline || '',
    };
    
    addOpportunity(newOpp);
    setShowModal(false);
    setFormData({ type: OpportunityType.JOB, title: '', company: '', location: '', description: '', application_deadline: '' });
  };

  const filteredOpps = opportunities.filter(op => filter === 'ALL' ? true : op.type === filter);

  const hasApplied = (oppId: string) => {
    return applications.some(a => a.opportunity_id === oppId && a.student_id === user?.user_id);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
           <h2 className="text-2xl font-bold text-gray-900">Career & Mentorship</h2>
           <p className="text-gray-500 mt-1">Find your next role or connect with a mentor</p>
        </div>
        
        {(user?.role === UserRole.ALUMNI || user?.role === UserRole.ADMIN) && (
          <button 
            onClick={() => setShowModal(true)}
            className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
          >
            <Plus size={18} className="mr-2" />
            Post Opportunity
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex items-center space-x-4">
        <div className="flex items-center text-gray-400">
          <Search size={20} />
        </div>
        <div className="flex space-x-2">
          {['ALL', 'JOB', 'MENTORSHIP'].map((f) => (
             <button
               key={f}
               onClick={() => setFilter(f as any)}
               className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                 filter === f ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
               }`}
             >
               {f === 'ALL' ? 'All Posts' : f === 'JOB' ? 'Jobs' : 'Mentorships'}
             </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="grid gap-6">
        {filteredOpps.map(opp => (
          <div key={opp.opportunity_id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className={`px-2 py-1 text-xs font-bold rounded uppercase ${opp.type === OpportunityType.JOB ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                    {opp.type}
                  </span>
                  <span className="text-gray-400 text-sm">{opp.posted_date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{opp.title}</h3>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center"><Briefcase size={16} className="mr-1" /> {opp.company}</span>
                  <span className="flex items-center"><MapPin size={16} className="mr-1" /> {opp.location}</span>
                  <span className="flex items-center"><User size={16} className="mr-1" /> Posted by {opp.user_name}</span>
                </div>
              </div>
              
              {user?.role === UserRole.STUDENT && (
                <button
                  onClick={() => handleApply(opp.opportunity_id, opp.title)}
                  disabled={hasApplied(opp.opportunity_id)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    hasApplied(opp.opportunity_id)
                      ? 'bg-green-50 text-green-700 cursor-default border border-green-200'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  {hasApplied(opp.opportunity_id) ? (
                    <span className="flex items-center"><CheckCircle size={16} className="mr-1" /> Applied</span>
                  ) : 'Apply Now'}
                </button>
              )}
            </div>
            <p className="mt-4 text-gray-600 leading-relaxed">{opp.description}</p>
          </div>
        ))}
        {filteredOpps.length === 0 && <div className="text-center py-12 text-gray-500">No opportunities found matching your criteria.</div>}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6">Post Opportunity</h3>
            <form onSubmit={handleCreate} className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                   <select 
                     className="w-full border border-gray-300 rounded-lg p-2"
                     value={formData.type}
                     onChange={e => setFormData({...formData, type: e.target.value as OpportunityType})}
                   >
                     <option value={OpportunityType.JOB}>Job Opening</option>
                     <option value={OpportunityType.MENTORSHIP}>Mentorship</option>
                   </select>
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                   <input type="date" required className="w-full border border-gray-300 rounded-lg p-2" 
                     value={formData.application_deadline} onChange={e => setFormData({...formData, application_deadline: e.target.value})}
                   />
                 </div>
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                 <input type="text" required className="w-full border border-gray-300 rounded-lg p-2" placeholder="e.g. Senior React Developer"
                    value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                 />
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                   <input type="text" required className="w-full border border-gray-300 rounded-lg p-2" placeholder="e.g. Google"
                      value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})}
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                   <input type="text" required className="w-full border border-gray-300 rounded-lg p-2" placeholder="e.g. Remote / Bangalore"
                      value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}
                   />
                 </div>
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                 <textarea required rows={4} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Describe the role or mentorship details..."
                    value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                 />
               </div>

               <div className="flex justify-end space-x-3 pt-4">
                 <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                 <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Post</button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};