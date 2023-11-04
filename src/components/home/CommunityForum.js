import React, { useState, useEffect } from 'react';

const CommunityForum = () => {
  const [step, setStep] = useState(0);
  const [threads, setThreads] = useState([]);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [activeThread, setActiveThread] = useState(null);

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Welcome to the Community Forum!",
    "Click the 'Community Forum' button to get started.",
    "Explore the forum and view existing threads.",
    "Create a new thread to start a discussion.",
    "Reply to a thread to engage with the community.",
    "That's it! You've successfully simulated the Community Forum.",
  ];

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  useEffect(() => {
    // Simulate loading existing threads
    const simulatedThreads = [
      {
        id: 1,
        title: 'Introduce Yourself',
        posts: [
          { id: 1, content: 'Hello, I am new here!' },
          { id: 2, content: 'Nice to meet you!' },
        ],
      },
      {
        id: 2,
        title: 'React Tips and Tricks',
        posts: [
          { id: 1, content: 'Here are some React tips:' },
          { id: 2, content: 'Tip 1: Use hooks for state management.' },
          { id: 3, content: 'Tip 2: Keep components small and focused.' },
        ],
      },
    ];

    setThreads(simulatedThreads);
  }, []);

  const createThread = () => {
    setStep(3);
  };

  const createPost = (thread) => {
    setActiveThread(thread);
    setStep(6);
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div
            className="step-container bg-gradient-to-b from-blue-50 via-blue-20 to-blue-50 p-4 rounded-lg m-5 "
            style={{
         
              padding: '20px', // Add padding as needed
              borderRadius: '8px', // Add border radius for rounded corners
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Add a subtle box shadow
              transition: 'transform 0.2s ease-in-out', // Add a smooth transform effect
            }}
          >

                      <p className="text-2xl font-bold mb-4">{steps[0]}</p>
            {currentStep < steps.length - 1 && (
              <button
                onClick={handleNextStep}
                className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-300"
              >
                Next Step
              </button>
            )}
          </div>
        );
      case 1:
        return (
          <div>
            <p className="text-xl">{steps[1]}</p>
            {currentStep < steps.length - 1 && (
              <button
                onClick={handleNextStep}
                className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-300"
              >
                Next Step
              </button>
            )}
          </div>
        );
      case 2:
        return (
          <div>
            <p className="text-xl">{steps[2]}</p>
            {currentStep < steps.length - 1 && (
              <button
                onClick={createThread}
                className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-300 mt-4"
              >
                Next Step
              </button>
            )}
          </div>
        );
      case 3:
        return (
          <div>
            <p className="text-xl">{steps[3]}</p>
            <input
              type="text"
              placeholder="Enter thread title"
              value={newThreadTitle}
              onChange={(e) => setNewThreadTitle(e.target.value)}
              className="border border-gray-300 rounded-md p-2 mt-2"
            />
            <button
              onClick={handleNextStep}
              className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-300 mt-4"
            >
              Next Step
            </button>
          </div>
        );
      case 4:
        return (
          <div>
            <p className="text-xl">{steps[4]}</p>
            {currentStep < steps.length - 1 && (
              <button
                onClick={handleNextStep}
                className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-300"
              >
                Next Step
              </button>
            )}
          </div>
        );
      case 5:
        return (
          <div>
            <p className="text-xl">{steps[5]}</p>
            {threads.map((thread) => (
              <div key={thread.id}>
                <button
                  onClick={() => createPost(thread)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-300 mt-2"
                >
                  Add Post to "{thread.title}"
                </button>
              </div>
            ))}
          </div>
        );
      case 6:
        return (
          <div>
            <p className="text-xl">{steps[6]}</p>
            <textarea
              placeholder="Enter post content"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="border border-gray-300 rounded-md p-2 mt-2"
            />
            <button
              onClick={handleNextStep}
              className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-300 mt-4"
            >
              Next Step
            </button>
          </div>
        );
      case 7:
        return (
          <div>
            <p className="text-xl">{steps[7]}</p>
            <button
              onClick={() => setStep(2)}
              className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-300 mt-4"
            >
              Explore More
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto mt-10 text-center">
      {renderStepContent()}
    </div>
  );
};

export default CommunityForum;
