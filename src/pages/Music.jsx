import { FaYoutube } from 'react-icons/fa';
import musicData from '../data/music.json';
import './Pages.css';

const Music = () => {
  return (
    <div className="page-content">
      <div className="hero-section">
        <h1>Live Performances</h1>
        <p className="subtitle">Official Uma Musume Music Videos & Lives</p>
      </div>

      <div className="video-grid">
        {musicData.map((video, index) => (
          <div key={video.id} className="video-card glass-panel" style={{animationDelay: `${index * 0.2}s`}}>
            <div className="video-wrapper">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video.youtube_id}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-info">
              <h3><FaYoutube className="youtube-icon" /> {video.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Music;
