import { useState } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import racesData from '../data/races.json';
import './Pages.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Format events for react-big-calendar
const events = racesData.map(race => ({
  title: `${race.title} (${race.grade}) - ${race.location}`,
  start: new Date(race.start),
  end: new Date(race.end),
  resource: race,
}));

const Calendar = () => {
  const [date, setDate] = useState(new Date(2026, 4, 1));
  const [view, setView] = useState('month');

  return (
    <div className="page-content">
      <div className="hero-section">
        <h1>JRA Races Calendar</h1>
        <p className="subtitle">Schedule for major Grade 1 races (2026 Season)</p>
      </div>

      <div className="calendar-container glass-panel">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          date={date}
          onNavigate={(newDate) => setDate(newDate)}
          view={view}
          onView={(newView) => setView(newView)}
          views={['month', 'agenda']}
          eventPropGetter={(event) => ({
            className: 'custom-event'
          })}
        />
      </div>
    </div>
  );
};

export default Calendar;
