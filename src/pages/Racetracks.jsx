import { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaTrophy, FaMapMarkerAlt } from 'react-icons/fa';
import racetracksData from '../data/racetracks.json';
import './Pages.css';

const Racetracks = () => {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="page-content">
      <div className="hero-section">
        <h1>JRA Racetracks</h1>
        <p className="subtitle">Explore famous tracks and their legendary winners</p>
      </div>

      <div className="racetrack-list">
        {racetracksData.map((track, index) => (
          <div key={track.id} className="racetrack-card glass-panel" style={{animationDelay: `${index * 0.15}s`}}>
            <div className="track-header" onClick={() => toggleExpand(track.id)}>
              <div>
                <h2>{track.name}</h2>
                <p className="track-location"><FaMapMarkerAlt /> {track.location}</p>
                <p className="track-desc">{track.description}</p>
              </div>
              <button className="expand-btn">
                {expanded === track.id ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>
            
            {expanded === track.id && (
              <div className="track-details slide-down">
                <div className="track-image-container">
                  <img src={track.image} alt={track.name} className="track-image" />
                </div>
                <h4><FaTrophy className="gold-icon" /> Famous Winners</h4>
                <ul className="winners-list">
                  {track.winners.map((winner, i) => (
                    <li key={i}>
                      <span className="horse-name">{winner.horse}</span>
                      <span className="race-won">{winner.race} ({winner.year})</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Racetracks;
