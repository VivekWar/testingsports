import React, { useState } from 'react';
import CardsHeader from './components/CardsHeader/CardsHeader';
import CardsFooter from './components/CardsFooter/CardsFooter';
import MatchTimeline from './components/MatchTimeline/MatchTimeline';
import MatchGrid from './components/MatchGrid/MatchGrid'; // Existing component for match cards
import Tabs from './components/Tabs/Tabs'; // If you use tabs for Live/Upcoming/Timeline
import { chessMatchData } from './data/chessMatchData'; // You will need to create this data file for chess
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('live');
  const matches = chessMatchData;

  const filterMatches = (status) =>
    matches.filter((match) => match.status === status);

  const sortUpcomingMatches = (ms) =>
    ms.sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));

  const getCurrentMatches = () => {
    switch (activeTab) {
      case 'live':
        return filterMatches('live');
      case 'upcoming':
        return sortUpcomingMatches(filterMatches('upcoming'));
      case 'timeline':
        return filterMatches('finished');
      default:
        return matches;
    }
  };

  return (
    <div className="app">
      <CardsHeader />
      <main>
        <div className="container">
          <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
          {activeTab === 'timeline' ? (
            <MatchTimeline matches={matches} />
          ) : (
            <MatchGrid matches={getCurrentMatches()} />
          )}
        </div>
      </main>
      <CardsFooter />
    </div>
  );
}

export default App;
