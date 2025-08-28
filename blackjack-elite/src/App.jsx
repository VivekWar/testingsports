import { useState, useEffect } from 'react';
import CardsHeader from './components/CardsHeader/CardsHeader';
import CardsFooter from './components/CardsFooter/CardsFooter';
import Tabs from './components/Tabs/Tabs';
import MatchGrid from './components/MatchGrid/MatchGrid';
import Timeline from './components/Timeline/Timeline';
import ParticleBackground from './components/ParticleBackground/ParticleBackground';
import { matchData } from './data/matchData';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('live');
  const [matches, setMatches] = useState(matchData);

  const filterMatches = (status) => {
    return matches.filter(match => match.status === status);
  };

  const sortUpcomingMatches = (matches) => {
    return matches.sort((a, b) => {
      const dateTimeA = new Date(`${a.date}T${a.time}`);
      const dateTimeB = new Date(`${b.date}T${b.time}`);
      return dateTimeA - dateTimeB;
    });
  };

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

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="app">
      <ParticleBackground />
      <div className="main-app">
        <CardsHeader />
        <main className="main-content">
          <div className="container">
            <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
            {activeTab === 'timeline' ? (
              <Timeline matches={matches} />
            ) : (
              <MatchGrid matches={getCurrentMatches()} />
            )}
          </div>
        </main>
        <CardsFooter />
      </div>
    </div>
  );
}

export default App;
