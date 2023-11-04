import React, { useState } from 'react';

const LanguagePreferencesComponent = () => {
  const [language, setLanguage] = useState('');

  const handleLanguageChange = (event) => {
    // Update the 'language' state with the selected language
    setLanguage(event.target.value);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-4">
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Language Preferences</h3>
        <p className="text-gray-600">
          Choose your preferred language below.
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input
            type="radio"
            value="en"
            checked={language === 'en'}
            onChange={handleLanguageChange}
            className="form-radio h-5 w-5 text-blue-500"
          />
          <span className="ml-2">English</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            value="es"
            checked={language === 'es'}
            onChange={handleLanguageChange}
            className="form-radio h-5 w-5 text-blue-500"
          />
          <span className="ml-2">Español</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            value="zh"
            checked={language === 'zh'}
            onChange={handleLanguageChange}
            className="form-radio h-5 w-5 text-blue-500"
          />
          <span className="ml-2">中文</span> {/* Chinese */}
        </label>
        {/* Add more language options as needed */}
      </div>
    </div>
  );
};

export default LanguagePreferencesComponent;
