import { NavLink } from 'react-router-dom';
import { FaCalendarAlt, FaMusic, FaMapMarkedAlt, FaHorseHead } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  return (
    <header className="header glass-panel">
      <div className="header-container">
        <div className="logo-area">
          <div className="mascot-icon">
            <span role="img" aria-label="Gold Ship Mascot">⚓🐴</span>
          </div>
          <NavLink to="/" className="logo-text">Uma<span className="logo-highlight">Hub</span></NavLink>
        </div>
        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <FaHorseHead /> Characters
          </NavLink>
          <NavLink to="/tracks" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <FaMapMarkedAlt /> Racetracks
          </NavLink>
          <NavLink to="/calendar" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <FaCalendarAlt /> Calendar
          </NavLink>
          <NavLink to="/music" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <FaMusic /> Music
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
