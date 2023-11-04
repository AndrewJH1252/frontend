import React from 'react';
import { Link } from 'react-router-dom';
import ThreadCard from './ThreadCard';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ThreadList = ({ threads }) => {
  // Calculate the number of rows based on the maximum row count (12)
  const rowCount = Math.ceil(threads.length / 3);
  
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Threads</h2>
      <TransitionGroup component="div" className="grid grid-cols-3 gap-4">
        {threads.map((thread, index) => (
          <CSSTransition
            key={thread.id}
            classNames={{
              enter: 'fade-in',
              enterActive: 'fade-in-active',
              exit: 'fade-out',
              exitActive: 'fade-out-active',
            }}
            timeout={300}
          >
            <div className={`py-2 px-4 hover:bg-gray-100 ${index >= rowCount * 3 ? 'hidden' : ''}`}>
              <ThreadCard thread={thread} />
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default ThreadList;
