import './MatchCard.css';

const MatchCard = ({ match }) => {
  const getStatusText = (status, minute) => {
    switch (status) {
      case 'live':
        return `${minute}'`;
      case 'finished':
        return 'FT';
      case 'upcoming':
        return match.time;
      default:
        return '';
    }
  };

  const getStatusClass = (status) => {
    return status;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const formatFullDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="match-card" data-match-id={match.id}>
      <div className="card-top">
        <div className={`match-status ${getStatusClass(match.status)}`}>
          <span className={`status-dot ${match.status}`}></span>
          <span className="status-text">
            {match.status === 'live' ? 'LIVE' : 
             match.status === 'finished' ? 'FINISHED' : 'UPCOMING'}
          </span>
        </div>
        <div className="competition-badge">
          {match.competition}
        </div>
      </div>

      <div className="card-main">
        <div className="team-name home">
          {match.homeTeam.shortName}
        </div>
        
        <div className="score-container">
          <div className="score-display">
            {match.score.fullTime.home} - {match.score.fullTime.away}
          </div>
          <div className="minute-display">
            {getStatusText(match.status, match.minute)}
          </div>
        </div>
        
        <div className="team-name away">
          {match.awayTeam.shortName}
        </div>
      </div>

      <div className="card-bottom">
        <div className="venue-name">
          {match.venue}
        </div>
        {match.status === 'upcoming' && (
          <div className="match-date">
            {formatDate(match.date)}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchCard;
