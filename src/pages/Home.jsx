import { useState, useEffect } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import umamusumeData from '../data/umamusume.json';
import './Pages.css';

const Home = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    // Sort by release date (oldest to newest)
    const sorted = [...umamusumeData].sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
    setCharacters(sorted);
  }, []);

  return (
    <div className="page-content">
      <div className="hero-section">
        <h1>Uma Musume Roster</h1>
        <p className="subtitle">Sorted by Japanese Server Release Date</p>
      </div>

      <div className="character-grid">
        {characters.map((char, index) => (
          <div key={char.id} className="character-card glass-panel glass-panel-interactive" style={{animationDelay: `${index * 0.1}s`}}>
            <div className="card-image">
              <img src={char.image} alt={char.name} onError={(e) => e.target.src = 'https://placehold.co/300x200/dc143c/fff?text=No+Image'} />
            </div>
            <div className="card-header">
              <h3>{char.name}</h3>
              <span className="release-date">{char.release_date}</span>
            </div>
            <div className="card-footer">
              <a href={char.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                Profile <FaExternalLinkAlt size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
