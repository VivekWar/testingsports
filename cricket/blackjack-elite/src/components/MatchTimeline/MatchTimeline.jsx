import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './MatchTimeline.css'; // Renamed CSS

gsap.registerPlugin(ScrollTrigger);

const ChessTimeline = ({ matches }) => {
  const timelineRef = useRef(null);
  const itemsRef = useRef([]);

  const finishedMatches = matches
    .filter(match => match.status === 'finished')
    .sort((a, b) => {
      const dateTimeA = new Date(`${a.date}T${a.time}`);
      const dateTimeB = new Date(`${b.date}T${b.time}`);
      return dateTimeB - dateTimeA;
    });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStageColor = (stage) => {
    // This can be adapted for chess tournaments
    const lowerCaseStage = stage.toLowerCase();
    if (lowerCaseStage.includes('final')) {
      return '#fbbf24';
    }
    if (lowerCaseStage.includes('semi')) {
      return '#38bdf8';
    }
    if (lowerCaseStage.includes('quarter')) {
      return '#10b981';
    }
    return '#64748b';
  };

  useLayoutEffect(() => {
    if (finishedMatches.length === 0) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      itemsRef.current.forEach((item) => {
        if (!item) return;

        gsap.fromTo(
          item,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'top 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      ScrollTrigger.refresh();
    }, timelineRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [finishedMatches]);

  if (finishedMatches.length === 0) {
    return (
      <div className="compact-timeline-empty">
        <h3>No Completed Matches</h3>
        <p>Check back later for match results.</p>
      </div>
    );
  }

  return (
    <div className="compact-timeline-container" ref={timelineRef}>
      <div className="compact-timeline-header">
        <h2>Match Timeline</h2>
        <p>Latest completed chess matches</p>
      </div>

      <div className="compact-timeline-list">
        {finishedMatches.map((match, index) => (
          <div
            key={match.id}
            className="compact-timeline-item"
            ref={(el) => (itemsRef.current[index] = el)}
          >
            <div className="compact-timeline-marker">
              <div
                className="compact-timeline-dot"
                style={{ backgroundColor: getStageColor(match.stage) }}
              />
            </div>

            <div className="compact-timeline-card">
              <div className="compact-card-header">
                <div className="compact-date-info">
                  <span className="compact-date">{formatDate(match.date)}</span>
                  <span className="compact-time">{match.time}</span>
                </div>
                <div className="compact-badges">
                  <span
                    className="compact-stage"
                    style={{
                      backgroundColor: `${getStageColor(match.stage)}20`,
                      color: getStageColor(match.stage),
                    }}
                  >
                    {match.stage}
                  </span>
                  <span className="compact-format">Chess</span>
                </div>
                <div className="compact-competition">{match.competition}</div>
              </div>

              <div className="compact-match-layout">
                <div className="compact-team-section">
                  <div className="compact-team-name">{match.player1.name}</div>
                </div>
                <div className="compact-vs-center">vs</div>
                <div className="compact-team-section">
                  <div className="compact-team-name">{match.player2.name}</div>
                </div>
              </div>

              <div className="compact-result">
                <div className="compact-winner">{match.winner ? `${match.winner} won` : (match.result || 'Match Drawn')}</div>
              </div>

              <div className="compact-venue">{match.venue}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChessTimeline;