import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { Profile as ProfileType } from '../types';
import { Save, User as UserIcon } from 'lucide-react';

export const Profile = () => {
  const { user } = useAuth();
  const { profiles, updateProfile } = useData();
  const [profile, setProfile] = useState<Partial<ProfileType>>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      const existing = profiles.find(p => p.user_id === user.user_id);
      if (existing) {
        setProfile(existing);
      } else {
        // Initialize blank profile for new users
        setProfile({
            user_id: user.user_id,
            profile_id: `p${Date.now()}`,
            industry: '',
            company: '',
            job_title: '',
            bio: '',
            skills: [],
            location: ''
        });
      }
    }
  }, [user, profiles]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (user && profile.user_id) {
       updateProfile(profile as ProfileType);
       setIsEditing(false);
       alert('Profile Updated Successfully');
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header/Cover */}
        <div className="h-32 bg-gradient-to-r from-gray-800 to-gray-900"></div>
        
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
             <div className="flex items-end">
               <img 
                 src={user.avatar_url || 'https://via.placeholder.com/150'} 
                 alt="Profile" 
                 className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-md"
               />
               <div className="ml-4 mb-2">
                 <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                 <p className="text-gray-500 text-sm">{user.email}</p>
                 <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded uppercase">
                   {user.role}
                 </span>
               </div>
             </div>
             {!isEditing && (
               <button 
                 onClick={() => setIsEditing(true)}
                 className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium shadow-sm"
               >
                 Edit Profile
               </button>
             )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Current Job Title</label>
                   <input type="text" className="w-full border border-gray-300 rounded-lg p-2"
                     value={profile.job_title || ''} onChange={e => setProfile({...profile, job_title: e.target.value})}
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                   <input type="text" className="w-full border border-gray-300 rounded-lg p-2"
                     value={profile.company || ''} onChange={e => setProfile({...profile, company: e.target.value})}
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                   <input type="text" className="w-full border border-gray-300 rounded-lg p-2"
                     value={profile.industry || ''} onChange={e => setProfile({...profile, industry: e.target.value})}
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                   <input type="text" className="w-full border border-gray-300 rounded-lg p-2"
                     value={profile.location || ''} onChange={e => setProfile({...profile, location: e.target.value})}
                   />
                 </div>
               </div>
               
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea rows={4} className="w-full border border-gray-300 rounded-lg p-2"
                    value={profile.bio || ''} onChange={e => setProfile({...profile, bio: e.target.value})}
                  />
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
                 <input type="text" className="w-full border border-gray-300 rounded-lg p-2"
                   value={profile.skills?.join(', ') || ''} 
                   onChange={e => setProfile({...profile, skills: e.target.value.split(',').map(s => s.trim())})}
                 />
               </div>

               <div className="flex justify-end space-x-3">
                 <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                 <button type="submit" className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                   <Save size={16} className="mr-2" /> Save Changes
                 </button>
               </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="md:col-span-2 space-y-6">
                  <section>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">About</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {profile.bio || "No bio added yet. Click edit to tell your story."}
                    </p>
                  </section>
                  
                  <section>
                     <h3 className="text-lg font-bold text-gray-900 mb-3">Skills</h3>
                     <div className="flex flex-wrap gap-2">
                       {profile.skills?.length ? profile.skills.map((skill, i) => (
                         <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                           {skill}
                         </span>
                       )) : <span className="text-gray-400 text-sm">No skills listed.</span>}
                     </div>
                  </section>
               </div>

               <div className="space-y-6">
                 <div className="bg-gray-50 p-4 rounded-xl">
                   <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Professional Details</h4>
                   <ul className="space-y-3 text-sm">
                     <li className="flex justify-between">
                       <span className="text-gray-500">Title</span>
                       <span className="font-medium text-gray-900">{profile.job_title || '-'}</span>
                     </li>
                     <li className="flex justify-between">
                       <span className="text-gray-500">Company</span>
                       <span className="font-medium text-gray-900">{profile.company || '-'}</span>
                     </li>
                     <li className="flex justify-between">
                       <span className="text-gray-500">Industry</span>
                       <span className="font-medium text-gray-900">{profile.industry || '-'}</span>
                     </li>
                     <li className="flex justify-between">
                       <span className="text-gray-500">Location</span>
                       <span className="font-medium text-gray-900">{profile.location || '-'}</span>
                     </li>
                   </ul>
                 </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};