import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { UserRole, Event } from '../types';
import { Calendar, MapPin, Clock, Plus, Users } from 'lucide-react';

export const Events = () => {
  const { user } = useAuth();
  const { events, addEvent } = useData();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Partial<Event>>({});

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    const newEvent: Event = {
      event_id: `e${Date.now()}`,
      creator_id: user.user_id,
      title: formData.title || '',
      date: formData.date || '',
      time: formData.time || '',
      location: formData.location || '',
      description: formData.description || '',
      registrations_count: 0
    };
    
    addEvent(newEvent);
    setShowModal(false);
    setFormData({});
  };

  const handleRegister = () => {
    alert("Registration Successful! A confirmation email has been sent via SendGrid (Mock).");
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
           <h2 className="text-2xl font-bold text-gray-900">Events</h2>
           <p className="text-gray-500 mt-1">Upcoming webinars, meetups, and workshops</p>
        </div>
        {(user?.role === UserRole.ADMIN || user?.role === UserRole.ALUMNI) && (
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
          >
            <Plus size={18} className="mr-2" />
            Create Event
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(evt => (
          <div key={evt.event_id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 p-6 flex items-end">
              <h3 className="text-white font-bold text-lg leading-tight">{evt.title}</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={16} className="mr-2 text-primary-500" />
                  <span>{evt.date}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock size={16} className="mr-2 text-primary-500" />
                  <span>{evt.time}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={16} className="mr-2 text-primary-500" />
                  <span>{evt.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users size={16} className="mr-2 text-primary-500" />
                  <span>{evt.registrations_count} Registered</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-6 line-clamp-3">{evt.description}</p>
              
              <button 
                onClick={handleRegister}
                className="w-full py-2 bg-gray-50 text-primary-600 font-semibold rounded-lg border border-gray-200 hover:bg-primary-50 hover:border-primary-200 transition-all"
              >
                Register Now
              </button>
            </div>
          </div>
        ))}
      </div>

       {/* Modal */}
       {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Create Event</h3>
            <form onSubmit={handleCreate} className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                 <input type="text" required className="w-full border border-gray-300 rounded-lg p-2" 
                    value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})}
                 />
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                   <input type="date" required className="w-full border border-gray-300 rounded-lg p-2" 
                      value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})}
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                   <input type="time" required className="w-full border border-gray-300 rounded-lg p-2" 
                      value={formData.time || ''} onChange={e => setFormData({...formData, time: e.target.value})}
                   />
                 </div>
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                 <input type="text" required className="w-full border border-gray-300 rounded-lg p-2" placeholder="e.g. Seminar Hall 1"
                    value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})}
                 />
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                 <textarea required rows={3} className="w-full border border-gray-300 rounded-lg p-2"
                    value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})}
                 />
               </div>

               <div className="flex justify-end space-x-3 pt-4">
                 <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                 <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Create Event</button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};