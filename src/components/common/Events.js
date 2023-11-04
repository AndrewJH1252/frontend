import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Countdown from '../../utils/Countdown'; // Adjust the path based on your project structure

const eventsData = [
  {
    id: 1,
    title: 'Web Development Workshop',
    date: '2024-01-31T18:00:00',
  },
  {
    id: 2,
    title: 'Online Marketing Seminar',
    date: '2023-12-15T12:00:00',
  },
  {
    id: 3,
    title: 'Art Exhibition Opening',
    date: '2023-10-20T17:30:00',
  },
  {
    id: 4,
    title: 'Fitness Bootcamp',
    date: '2023-11-02T09:00:00',
  },
  {
    id: 5,
    title: 'Cooking Masterclass',
    date: '2023-12-10T15:00:00',
  },
  // Add more events as needed
];

const EventCountdown = ({ event }) => (
  <div className="flex bg-gradient-to-r from-gray-700 to-gray-400 w-full px-auto p-2 justify-between  shadow-md">
    <h3 className=" font-semibold ml-3  text-white ">{event.title}</h3>
    <Countdown targetDate={event.date} />
  </div>
);

EventCountdown.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

const Events = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventIndex((prevIndex) => (prevIndex + 1) % eventsData.length);
    }, 5000); // Change the event every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const currentEvent = eventsData[currentEventIndex];

  return (
    <div className="events-container bg-gray-200">
      <div className="flex items-center justify-center space-x-4 ">
        <EventCountdown event={currentEvent} />
      </div>
    </div>
  );
};

export default Events;
