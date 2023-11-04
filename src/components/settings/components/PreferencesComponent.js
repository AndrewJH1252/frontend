import React, { useState } from 'react';

const EmailPreferencesComponent = () => {
  const [emailPreferences, setEmailPreferences] = useState(false);
  const [selectedUpdates, setSelectedUpdates] = useState([]);
  const [emailFrequency, setEmailFrequency] = useState('none'); // Set default to 'none'

  const handleEmailPreferencesChange = () => {
    // Update the 'emailPreferences' state
    setEmailPreferences(!emailPreferences);
  };

  const handleUpdateSelection = (updateType) => {
    // Toggle selected updates
    if (selectedUpdates.includes(updateType)) {
      setSelectedUpdates(selectedUpdates.filter((type) => type !== updateType));
    } else {
      setSelectedUpdates([...selectedUpdates, updateType]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Email Preferences</h3>
        <p className="text-gray-600">
          Customize your email preferences below.
        </p>
      </div>
      <div className="mb-4">
        <label className="flex items-center cursor-pointer space-x-2">
          <input
            type="checkbox"
            checked={emailPreferences}
            onChange={handleEmailPreferencesChange}
            className="form-checkbox h-5 w-5 text-blue-500"
          />
          <span className="text-lg">Receive course recommendations</span>
        </label>
      </div>
      <div className="mb-4">
        <p className="text-gray-700 text-sm font-bold mb-2">
          Choose the types of updates you want to receive:
        </p>
        <div className="mt-2 mb-4 space-y-2">
          <label className="flex items-center cursor-pointer space-x-2">
            <input
              type="checkbox"
              checked={selectedUpdates.includes('newCourses')}
              onChange={() => handleUpdateSelection('newCourses')}
              className="form-checkbox h-5 w-5 text-blue-500"
            />
            <span className="text-base">New courses</span>
          </label>
          <label className="flex items-center cursor-pointer space-x-2">
            <input
              type="checkbox"
              checked={selectedUpdates.includes('promotions')}
              onChange={() => handleUpdateSelection('promotions')}
              className="form-checkbox h-5 w-5 text-blue-500"
            />
            <span className="text-base">Promotions</span>
          </label>
          {/* Add more options as needed */}
       </div>

        <p className="text-gray-700 text-sm font-bold mb-2">
          Frequency of emails:
        </p>
        <div className="mt-2 space-x-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="emailFrequency"
              value="none"
              checked={emailFrequency === 'none'}
              onChange={() => setEmailFrequency('none')}
              className="form-radio h-5 w-5 text-blue-500"
            />
            <span className="ml-3">None</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="emailFrequency"
              value="daily"
              checked={emailFrequency === 'daily'}
              onChange={() => setEmailFrequency('daily')}
              className="form-radio h-5 w-5 text-blue-500"
            />
            <span className="ml-3">Daily</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="emailFrequency"
              value="weekly"
              checked={emailFrequency === 'weekly'}
              onChange={() => setEmailFrequency('weekly')}
              className="form-radio h-5 w-5 text-blue-500"
            />
            <span className="ml-3">Weekly</span>
          </label>
          {/* Add more frequency options as needed */}
        </div>
      </div>
    </div>
  );
};

export default EmailPreferencesComponent;
