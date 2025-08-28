import MatchCard from '../MatchCard/MatchCard';
import './MatchGrid.css';

const MatchGrid = ({ matches }) => {
  return (
    <div className="matches-grid">
      {matches.map(match => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
};

export default MatchGrid;
