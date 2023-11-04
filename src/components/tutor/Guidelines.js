
import React, { useState } from 'react';
import { FiInfo, FiUser, FiEdit, FiBookOpen, FiDollarSign, FiStar, FiCalendar } from 'react-icons/fi';

const Guidelines = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState('options');

  const sections = {
    options: {
      title: 'Getting Started',
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <FiUser className="text-indigo-500 text-xl" />
            <span>Profile: Customize your tutor profile.</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiEdit className="text-pink-500 text-xl" />
            <span>Edit Profile: Update your profile information.</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiBookOpen className="text-yellow-500 text-xl" />
            <span>Create Course: Start creating your courses.</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiDollarSign className="text-purple-500 text-xl" />
            <span>Earnings: Track your earnings and payments.</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiStar className="text-orange-500 text-xl" />
            <span>Reviews: View and manage student reviews.</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiCalendar className="text-indigo-500 text-xl" />
            <span>Calendar: Manage your schedule and appointments.</span>
          </div>
        </div>
      ),
    },
    success: {
        title: 'Key to Success',
        content: (
          <div className="space-y-6 ">
            <p className="text-lg font-semibold">
              Here are some guidelines to become a successful tutor:
            </p>
            <ul className="list-disc pl-8 space-y-2">
              <li className="text-gray-800">
                Provide high-quality and engaging courses.
              </li>
              <li className="text-gray-800">
                Interact with your students and provide timely feedback.
              </li>
              <li className="text-gray-800">
                Offer clear explanations and examples.
              </li>
              <li className="text-gray-800">
                Encourage active participation from your students.
              </li>
              <li className="text-gray-800">
                Promote a positive learning environment.
              </li>
              <li className="text-gray-800">
                Continuously update and improve your courses.
              </li>
              <li className="text-gray-800">
                Collaborate with other tutors for new ideas.
              </li>
              <li className="text-gray-800">
                Use multimedia elements to enhance learning experiences.
              </li>
              <li className="text-gray-800">
                Address diverse learning styles and needs.
              </li>
              <li className="text-gray-800">
                Set realistic expectations for your students.
              </li>
           
              {/* Add more guidelines here */}
            </ul>
          </div>
        ),
      },
      events: {
        title: 'Upcoming Events',
        content: (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FiCalendar className="text-blue-500 text-xl" />
              <span>Webinar: Effective Teaching Strategies (August 15)</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiCalendar className="text-blue-500 text-xl" />
              <span>Workshop: Engaging Course Design (August 22)</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiCalendar className="text-blue-500 text-xl" />
              <span>Conference: Innovations in Education (September 5-7)</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiCalendar className="text-blue-500 text-xl" />
              <span>Meetup: Networking with Tutors (September 10)</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiCalendar className="text-blue-500 text-xl" />
              <span>Job Offers: Tutoring Opportunities (Ongoing)</span>
            </div>
         
          </div>
        ),
      },
      
  };

  const setActive = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 overflow-y-auto">
    <div className="bg-white w-96 p-6 rounded-lg shadow-lg animate-fade-in-down ">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold">{sections[activeSection].title}</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <FiInfo className="text-xl" />
        </button>
      </div>
      <div className="mb-4 flex">
        {Object.keys(sections).map((sectionKey) => (
          <button
            key={sectionKey}
            onClick={() => setActive(sectionKey)}
            className={`mr-4 text-lg ${
              activeSection === sectionKey ? 'text-blue-500' : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            {sections[sectionKey].title}
          </button>
        ))}
      </div>
      <div className="text-gray-700">{sections[activeSection].content}</div>
    </div>
  </div>
  );
};

export default Guidelines;

