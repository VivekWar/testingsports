import { useEffect } from 'react';
import './MatchModal.css';

const MatchModal = ({ match, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !match) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'live':
        return match.liveStatus || 'In Progress';
      case 'finished':
        return 'Match Finished';
      case 'upcoming':
        return `Starts at ${match.time}`;
      default:
        return '';
    }
  };

  return (
    <div className="clean-modal-overlay" onClick={onClose}>
      <div className="clean-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="clean-modal-close" onClick={onClose}>×</button>
        
        {/* Streamlined Header */}
        <div className="clean-modal-header">
          <div className="clean-status-row">
            <div className="clean-status">
              <span className={`clean-status-dot ${match.status}`}></span>
              <span className="clean-status-text">{match.status.toUpperCase()}</span>
            </div>
            <div className="clean-competition">
              <span className="clean-comp-name">{match.competition}</span>
              <span className="clean-stage">{match.stage}</span>
            </div>
          </div>
          
          <div className="clean-match-info">
            <div className="clean-date">{formatDate(match.date)}</div>
            <div className="clean-meta">
              <span className="clean-format" style={{ textTransform: 'capitalize' }}>{match.sport || 'sport'}</span>
              <span className="clean-venue">{match.venue}</span>
              <span className="clean-time">{getStatusText(match.status)}</span>
            </div>
          </div>
        </div>

        {/* Clean Teams Section */}
        <div className="clean-teams">
          <div className="clean-team clean-team-name">
            {match.player1?.name || 'TBA'}
          </div>
          
          <div className="clean-vs">vs</div>
          
          <div className="clean-team clean-team-name">
            {match.player2?.name || 'TBA'}
          </div>
        </div>

        {/* Conditional Content Based on Status */}
        {match.status === 'live' && (
          <div className="clean-live-info">
            <div className="clean-section-title">Current Status</div>
            <div className="clean-rate-item">
              <span>Status:</span>
              <span>{match.liveStatus || 'In Progress'}</span>
            </div>
          </div>
        )}

        {match.status === 'upcoming' && (
          <div className="clean-upcoming-info">
            <div className="clean-upcoming-text">
              Match starts{' '}
              {new Date(`${match.date}T${match.time}`).toLocaleString()}
            </div>
          </div>
        )}

        {match.status === 'finished' && (
          <div className="clean-finished-info">
            {match.winner ? (
              <div className="clean-result">
                Winner: <strong>{match.winner}</strong>
              </div>
            ) : (
              <div className="clean-result">{match.result || 'Match Drawn'}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchModal;
