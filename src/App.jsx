import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Racetracks from './pages/Racetracks';
import Calendar from './pages/Calendar';
import Music from './pages/Music';
import './App.css'; // Optional if we want specific app styles, but index.css handles mostly everything

function App() {
  return (
    <>
      <Header />
      <main className="container page-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tracks" element={<Racetracks />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/music" element={<Music />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
