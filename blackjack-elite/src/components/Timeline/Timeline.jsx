import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Timeline.css';

gsap.registerPlugin(ScrollTrigger);

const Timeline = ({ matches }) => {
  const timelineRef = useRef(null);
  const lineRef = useRef(null);
  const itemsRef = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Filter only finished matches and sort by date/time (latest first)
  const finishedMatches = matches
    .filter(match => match.status === 'finished')
    .sort((a, b) => {
      const dateTimeA = new Date(`${a.date}T${a.time}`);
      const dateTimeB = new Date(`${b.date}T${b.time}`);
      return dateTimeB - dateTimeA; // Latest first
    });

  const getWinner = (match) => {
    const { home, away } = match.score.fullTime;
    if (home > away) {
      return { team: match.homeTeam, isHome: true };
    } else if (away > home) {
      return { team: match.awayTeam, isHome: false };
    }
    return null; // Draw
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  const getStageColor = (stage) => {
    switch (stage.toLowerCase()) {
      case 'final':
        return '#fbbf24';
      case 'semi final':
        return '#38bdf8';
      case 'quarter final':
        return '#10b981';
      case 'el clasico':
      case 'der klassiker':
      case 'le classique':
        return '#f59e0b';
      default:
        return '#64748b';
    }
  };

  useEffect(() => {
    // Show elements immediately, then animate
    setIsLoaded(true);
    
    if (finishedMatches.length === 0) return;

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Clear any existing animations
        gsap.killTweensOf(".timeline-item, .timeline-dot, .timeline-card, .timeline-line");
        
        // Initial setup - elements are visible by default now
        gsap.set('.timeline-item', { opacity: 1, y: 0 });
        gsap.set('.timeline-dot', { scale: 1, rotation: 0 });
        gsap.set('.timeline-card', { opacity: 1, x: 0, rotationY: 0 });
        gsap.set('.timeline-line', { scaleY: 0, transformOrigin: 'top' });

        // Animate timeline line
        gsap.to('.timeline-line', {
          scaleY: 1,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.timeline',
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          }
        });

        // Animate each timeline item with intersection observer fallback
        itemsRef.current.forEach((item, index) => {
          if (!item) return;

          const dot = item.querySelector('.timeline-dot');
          const card = item.querySelector('.timeline-card');

          // Intersection Observer fallback
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                // Ensure visibility
                gsap.set(entry.target, { opacity: 1 });
                gsap.set(entry.target.querySelector('.timeline-card'), { opacity: 1 });
                
                // Animate entry
                const tl = gsap.timeline();
                tl.fromTo(entry.target, {
                  opacity: 0.3,
                  y: 50
                }, {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: 'power3.out'
                })
                .fromTo(dot, {
                  scale: 0.5,
                  rotation: 180
                }, {
                  scale: 1,
                  rotation: 0,
                  duration: 0.6,
                  ease: 'back.out(1.7)'
                }, '-=0.4')
                .fromTo(card, {
                  opacity: 0.5,
                  x: -30
                }, {
                  opacity: 1,
                  x: 0,
                  duration: 0.8,
                  ease: 'power3.out'
                }, '-=0.6');

                observer.unobserve(entry.target);
              }
            });
          }, { threshold: 0.2 });

          observer.observe(item);

          // GSAP ScrollTrigger as primary
          gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: 'top bottom-=50',
              toggleActions: 'play none none reverse',
              onEnter: () => {
                gsap.set(item, { opacity: 1 });
                gsap.set(card, { opacity: 1 });
              }
            }
          })
          .fromTo(item, {
            opacity: 0.3,
            y: 30
          }, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
          })
          .fromTo(dot, {
            scale: 0.7
          }, {
            scale: 1,
            duration: 0.4,
            ease: 'back.out(1.2)'
          }, '-=0.3');
        });

        // Header animations with fallback
        const headerH2 = document.querySelector('.timeline-header h2');
        const headerP = document.querySelector('.timeline-header p');
        
        if (headerH2) {
          gsap.fromTo(headerH2, {
            opacity: 0,
            y: 30
          }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.2
          });
        }

        if (headerP) {
          gsap.fromTo(headerP, {
            opacity: 0,
            y: 20
          }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.5,
            ease: 'power2.out'
          });
        }

      }, timelineRef);

      return () => {
        ctx.revert();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [finishedMatches]);

  if (finishedMatches.length === 0) {
    return (
      <div className="timeline-empty">
        <div className="empty-icon">
          <div className="empty-circle"></div>
        </div>
        <h3>No Completed Matches</h3>
        <p>Check back later for match results and timeline</p>
      </div>
    );
  }

  return (
    <div className="timeline-container" ref={timelineRef}>
      <div className="timeline-header">
        <h2>Match Timeline</h2>
        <p>Latest completed matches</p>
      </div>
      
      <div className="timeline">
        <div className="timeline-line-container">
          <div className="timeline-line" ref={lineRef}></div>
        </div>
        
        {finishedMatches.map((match, index) => {
          const winner = getWinner(match);
          
          return (
            <div 
              key={match.id} 
              className={`timeline-item ${isLoaded ? 'loaded' : ''}`}
              ref={el => itemsRef.current[index] = el}
            >
              <div className="timeline-marker">
                <div 
                  className="timeline-dot"
                  style={{ backgroundColor: getStageColor(match.stage) }}
                >
                  <div className="dot-inner"></div>
                </div>
              </div>
              
              <div className="timeline-content">
                <div className="timeline-card">
                  <div className="timeline-card-header">
                    <div className="match-info">
                      <div className="match-datetime">
                        <span className="match-date">{formatDate(match.date)}</span>
                        <span className="match-time">{formatTime(match.time)}</span>
                      </div>
                      <div 
                        className="match-stage"
                        style={{ 
                          backgroundColor: `${getStageColor(match.stage)}20`, 
                          color: getStageColor(match.stage),
                          borderColor: `${getStageColor(match.stage)}40` 
                        }}
                      >
                        {match.stage}
                      </div>
                    </div>
                    <div className="competition-name">
                      {match.competition}
                    </div>
                  </div>
                  
                  <div className="timeline-match">
                    <div className="timeline-teams">
                      <div className={`timeline-team ${winner && winner.isHome ? 'winner' : ''}`}>
                        <span className="team-name">{match.homeTeam.shortName}</span>
                        <span className="team-score">{match.score.fullTime.home}</span>
                      </div>
                      
                      <div className="vs-separator">
                        <div className="vs-line"></div>
                        <span>VS</span>
                        <div className="vs-line"></div>
                      </div>
                      
                      <div className={`timeline-team ${winner && !winner.isHome ? 'winner' : ''}`}>
                        <span className="team-score">{match.score.fullTime.away}</span>
                        <span className="team-name">{match.awayTeam.shortName}</span>
                      </div>
                    </div>
                    
                    {winner && (
                      <div className="match-result">
                        <div className="winner-badge">
                          <div className="trophy-icon"></div>
                          <span>{winner.team.shortName} Won</span>
                        </div>
                      </div>
                    )}
                    
                    {!winner && (
                      <div className="match-result">
                        <div className="draw-badge">
                          <div className="draw-icon"></div>
                          <span>Match Drawn</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="timeline-card-footer">
                    <div className="venue-info">
                      <div className="location-icon"></div>
                      <span>{match.venue}</span>
                    </div>
                    <div className="attendance-info">
                      <div className="people-icon"></div>
                      <span>{match.attendance}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
