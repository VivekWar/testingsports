import React from 'react';
import './MatchCard.css';

const MatchCard = ({ match, onClick }) => {
  return (
    <div className="cricket-match-card" onClick={() => onClick(match)}>
      <div className="card-header">
        <div className={`match-status ${match.status}`}>
          <span className={`status-dot ${match.status}`}></span>
          <span className="status-text">{match.status}</span>
        </div>
        <div className="competition-badge">{match.competition}</div>
      </div>

      <div className="teams-score-section">
        <div className="teams-container">
          <div className="team-info home-team">
            <span className="team-name">{match.player1.name}</span>
          </div>

          <div className="match-score-display">
            <div className="score-line">VS</div>
          </div>

          <div className="team-info away-team">
            <span className="team-name">{match.player2.name}</span>
          </div>
        </div>
      </div>

      {match.status === 'finished' && match.winner && (
        <div className="batsmen-display">
          {' '}
          {/* Re-using for winner display */}
          <div className="batsman-stat" style={{ gridColumn: '1 / -1' }}>
            <span className="batsman-name">Winner</span>
            <span className="batsman-runs">{match.winner}</span>
          </div>
        </div>
      )}

      <div className="card-footer">
        <div className="venue-display">{match.venue}</div>
        <div className="match-extras">
          {match.status === 'upcoming' && (
            <div className="match-date-display">
              {new Date(match.date).toLocaleDateString()}
            </div>
          )}
          {match.status === 'finished' && <div className="rate-display">{match.result}</div>}
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
