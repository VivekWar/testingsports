import './CardsFooter.css';

const NavCard = ({ value, suit, label, animationDelay }) => (
  <a href="#" className="nav-card" style={{ animationDelay }}>
    <div className="card-face">
      <div className="card-header">
        <span className="card-value">{value}</span>
        <span className="card-suit-small">{suit}</span>
      </div>
      <div className="card-center">
        <span className="card-suit-large">{suit}</span>
      </div>
      <div className="card-footer">
        <span className="card-value">{value}</span>
        <span className="card-suit-small">{suit}</span>
      </div>
      <div className="card-shadow"></div>
    </div>
    <span className="nav-label">{label}</span>
  </a>
);

const CardsFooter = () => (
  <footer className="cards-footer">
    <div className="deck-edge-top"></div>
    <div className="cards-footer-surface">
      <div className="cards-footer-content">
        <nav className="cards-navigation">
          <NavCard value="A" suit="♠" label="Home" animationDelay="0s" />
          <NavCard value="K" suit="♥" label="Live" animationDelay="0.1s" />
          <NavCard value="Q" suit="♦" label="Schedule" animationDelay="0.2s" />
          <NavCard value="J" suit="♣" label="Teams" animationDelay="0.3s" />
          <NavCard value="10" suit="♠" label="Contact" animationDelay="0.4s" />
        </nav>
        <div className="cards-footer-info">
          <div className="footer-logo">
            <h2 className="footer-title">BLACKJACK ELITE</h2>
            <span className="footer-subtitle">CREATE. COMPETE. CELEBRATE.</span>
          </div>
          <div className="cards-divider">
            <div className="divider-line"></div>
            <div className="divider-card">♠</div>
            <div className="divider-card">♥</div>
            <div className="divider-card">♦</div>
            <div className="divider-card">♣</div>
            <div className="divider-line"></div>
          </div>
          <div className="footer-details">
            <p>© {new Date().getFullYear()} Blackjack Elite – All rights reserved.</p>
            <p>A premier platform for competitive gaming and tournaments.</p>
          </div>
        </div>
      </div>
    </div>
    <div className="cards-deck-rim"></div>
  </footer>
);

export default CardsFooter;
