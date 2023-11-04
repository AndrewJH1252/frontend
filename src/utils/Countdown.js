import React, { useState, useEffect } from 'react';

const Countdown = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeRemaining = calculateTimeRemaining(targetDate);
      setTimeRemaining(newTimeRemaining);

      if (newTimeRemaining.total <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [targetDate]);

  const formatTimeUnit = (unit) => (unit < 10 ? `0${unit}` : unit);

  return (
    <div className="flex items-center justify-end">
      <div className="flex justify-center items-center border-2 border-gray-200 rounded-lg p-2">
        <div className="countdown-item mx-2">
          <span className="countdown-value text-xl font-bold">{formatTimeUnit(timeRemaining.days)}</span>
          <span className="countdown-label text-gray-900"> Days</span>
        </div>
        <div className="countdown-item mx-2">
          <span className="countdown-value text-xl font-bold">{formatTimeUnit(timeRemaining.hours)}</span>
          <span className="countdown-label text-gray-900"> Hours</span>
        </div>
        <div className="countdown-item mx-2">
          <span className="countdown-value text-xl font-bold">{formatTimeUnit(timeRemaining.minutes)}</span>
          <span className="countdown-label text-gray-900"> Minutes</span>
        </div>
        <div className="countdown-item mx-2">
          <span className="countdown-value text-xl font-bold">{formatTimeUnit(timeRemaining.seconds)}</span>
          <span className="countdown-label text-gray-900"> Seconds</span>
        </div>
      </div>
    </div>
  );
};

const calculateTimeRemaining = (targetDate) => {
  const now = new Date().getTime();
  const targetTime = new Date(targetDate).getTime();
  const timeDifference = targetTime - now;

  if (timeDifference <= 0) {
    return {
      total: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  return {
    total: timeDifference,
    days,
    hours,
    minutes,
    seconds,
  };
};

export default Countdown;
