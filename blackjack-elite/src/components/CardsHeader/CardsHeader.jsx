import './CardsHeader.css';

const CardsHeader = () => {
  return (
    <header className="cards-header">
      <div className="cards-table-surface">
        <div className="cards-pattern"></div>
        
        <div className="container">
          <div className="cards-header-content">
            {/* Left card decorations */}
            <div className="cards-decorations left">
              <div className="playing-card spade">
                <div className="card-corner top">A</div>
                <div className="card-suit">♠</div>
                <div className="card-corner bottom">A</div>
              </div>
              <div className="floating-card heart">
                <div className="card-corner top">K</div>
                <div className="card-suit">♥</div>
                <div className="card-corner bottom">K</div>
              </div>
            </div>

            {/* Center logo area */}
            <div className="logo-section">
              <div className="logo-container">
                <div className="logo-glow"></div>
                <div className="logo-card">
                  <div className="card-suits-decoration">
                    <span className="suit spade">♠</span>
                    <span className="suit heart">♥</span>
                    <span className="suit diamond">♦</span>
                    <span className="suit club">♣</span>
                  </div>
                  
                  {/* Replace with actual Udgosh logo */}
                  <div className="udgosh-logo">
                    <span className="logo-text">UDGOSH</span>
                    <div className="logo-subtitle">Sports Festival</div>
                  </div>
                  
                  <div className="card-suits-decoration bottom">
                    <span className="suit club">♣</span>
                    <span className="suit diamond">♦</span>
                    <span className="suit heart">♥</span>
                    <span className="suit spade">♠</span>
                  </div>
                </div>
                
                <div className="scattered-cards">
                  <div className="mini-card card-1"></div>
                  <div className="mini-card card-2"></div>
                  <div className="mini-card card-3"></div>
                </div>
              </div>
            </div>

            {/* Right card decorations */}
            <div className="cards-decorations right">
              <div className="playing-card diamond">
                <div className="card-corner top">Q</div>
                <div className="card-suit">♦</div>
                <div className="card-corner bottom">Q</div>
              </div>
              <div className="floating-card club">
                <div className="card-corner top">J</div>
                <div className="card-suit">♣</div>
                <div className="card-corner bottom">J</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Card deck edge */}
        <div className="deck-edge"></div>
      </div>
    </header>
  );
};

export default CardsHeader;
