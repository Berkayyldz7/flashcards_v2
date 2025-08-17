import React, { createContext, useContext, useState } from 'react';

const TopicContext = createContext();

export const topics = [
  'All', 'Education', 'Health', 'Environment', 'Technology',
  'Work', 'Culture', 'Art', 'Crime', 'Sports',
  'Family', 'Society', 'Government', 'Economy',
  'Housing', 'Food', 'Travel', 'Transport',
  'Media', 'Science', 'History', 'Globalisation', 'Other'
];

export function TopicProvider({ children }) {
  const [topic, setTopic] = useState('All');
  return (
    <TopicContext.Provider value={{ topic, setTopic }}>
      {children}
    </TopicContext.Provider>
  );
}

export const useTopic = () => useContext(TopicContext);
