import { useState } from 'react';
import MatchCard from '../MatchCard/MatchCard';
import MatchModal from '../MatchModal/MatchModal';
import './MatchGrid.css';

const MatchGrid = ({ matches }) => {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (match) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMatch(null);
  };

  if (!matches || matches.length === 0) {
    return (
      <div className="matches-grid-empty">
        <h3>No Matches Available</h3>
        <p>Check back later for updates</p>
      </div>
    );
  }

  return (
    <>
      <div className="matches-grid-container">
        <div className="matches-grid">
          {matches.map(match => (
            <MatchCard 
              key={match.id} 
              match={match} 
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>
      
      <MatchModal 
        match={selectedMatch}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default MatchGrid;
