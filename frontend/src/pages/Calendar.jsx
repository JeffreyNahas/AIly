import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.css';

function Calendar() {
  const { user } = useAuth0();
  const [events, setEvents] = useState([]);

  const handleDateClick = (arg) => {
    console.log('Date clicked:', arg.dateStr);
    // We'll implement event creation later
  };

  const handleEventClick = (clickInfo) => {
    console.log('Event clicked:', clickInfo.event);
    // We'll implement event editing later
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="header-content">
          <h1>📅 Calendar</h1>
          <p className="subtitle">View and manage your schedule</p>
        </div>
        <button className="create-event-btn">
          <span>➕</span>
          Create Event
        </button>
      </div>

      <div className="calendar-content">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          events={events}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          height="auto"
        />
      </div>
    </div>
  );
}

export default Calendar;
