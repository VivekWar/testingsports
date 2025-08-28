import './CardsFooter.css';

const CardsFooter = () => {
  const navigationLinks = [
    { name: 'Home', href: '#', suit: '♠' },
    { name: 'Live Matches', href: '#', suit: '♥' },
    { name: 'Schedule', href: '#', suit: '♦' },
    { name: 'Teams', href: '#', suit: '♣' },
    { name: 'Contact', href: '#', suit: '♠' }
  ];

  return (
    <footer className="cards-footer">
      <div className="deck-edge-top"></div>
      
      <div className="cards-footer-surface">
        <div className="container">
          <div className="cards-footer-content">
            
            {/* Navigation Cards */}
            <div className="cards-navigation">
              {navigationLinks.map((link, index) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="nav-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="card-face">
                    <div className="card-header">
                      <span className="card-value">{link.name.charAt(0)}</span>
                      <span className="card-suit-small">{link.suit}</span>
                    </div>
                    <div className="card-center">
                      <span className="card-suit-large">{link.suit}</span>
                    </div>
                    <div className="card-footer">
                      <span className="card-value inverted">{link.name.charAt(0)}</span>
                      <span className="card-suit-small inverted">{link.suit}</span>
                    </div>
                    <div className="nav-label">{link.name}</div>
                  </div>
                  <div className="card-shadow"></div>
                </a>
              ))}
            </div>

            {/* Footer Info */}
            <div className="cards-footer-info">
              <div className="footer-logo">
                <span className="footer-title">BLACKJACK ELITE</span>
                <span className="footer-subtitle">Sports Festival Platform</span>
              </div>
              
              <div className="cards-divider">
                <div className="divider-card">♠</div>
                <div className="divider-line"></div>
                <div className="divider-card">♥</div>
                <div className="divider-line"></div>
                <div className="divider-card">♦</div>
                <div className="divider-line"></div>
                <div className="divider-card">♣</div>
              </div>
              
              <div className="footer-details">
                <p>&copy; 2024 Udgosh Sports Festival. All rights reserved.</p>
                <p>Designed with the spirit of competition and excellence.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <div className="cards-deck-rim"></div>
    </footer>
  );
};

export default CardsFooter;
