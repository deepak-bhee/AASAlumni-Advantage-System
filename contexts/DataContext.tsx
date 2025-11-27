import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Opportunity, Event, Application, Profile, OpportunityType } from '../types';
import { MOCK_OPPORTUNITIES, MOCK_EVENTS, MOCK_APPLICATIONS, MOCK_PROFILES } from '../services/mockData';

interface DataContextType {
  opportunities: Opportunity[];
  events: Event[];
  applications: Application[];
  profiles: Profile[];
  addOpportunity: (opp: Opportunity) => void;
  addEvent: (evt: Event) => void;
  addApplication: (app: Application) => void;
  updateProfile: (profile: Profile) => void;
  getProfileByUserId: (userId: string) => Profile | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(MOCK_OPPORTUNITIES);
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [applications, setApplications] = useState<Application[]>(MOCK_APPLICATIONS);
  const [profiles, setProfiles] = useState<Profile[]>(MOCK_PROFILES);

  const addOpportunity = (opp: Opportunity) => {
    setOpportunities(prev => [opp, ...prev]);
  };

  const addEvent = (evt: Event) => {
    setEvents(prev => [evt, ...prev]);
  };

  const addApplication = (app: Application) => {
    setApplications(prev => [app, ...prev]);
  };

  const updateProfile = (updatedProfile: Profile) => {
    setProfiles(prev => {
      const exists = prev.find(p => p.profile_id === updatedProfile.profile_id);
      if (exists) {
        return prev.map(p => p.profile_id === updatedProfile.profile_id ? updatedProfile : p);
      }
      return [...prev, updatedProfile];
    });
  };

  const getProfileByUserId = (userId: string) => {
    return profiles.find(p => p.user_id === userId);
  };

  return (
    <DataContext.Provider value={{
      opportunities,
      events,
      applications,
      profiles,
      addOpportunity,
      addEvent,
      addApplication,
      updateProfile,
      getProfileByUserId
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};