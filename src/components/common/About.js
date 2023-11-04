

import React, { useState, useEffect, useRef } from 'react';
import { FaArrowRight } from 'react-icons/fa'; // Import the arrow icon

import CourseMarketplaceImage from '../../images/marketplace.jpeg';
import ForumsImage from '../../images/forumm.jpeg';
import MeetupsImage from '../../images/forumm.jpeg';
import PersonalizedLearningImage from '../../images/personal.png';
import ProgressTrackingImage from '../../images/progress.jpeg';

const About = () => {
  const sections = [
    {
      title: 'About Us',
      content: (
        <p>
          Our website is a comprehensive learning platform that aims to provide high-quality educational resources and facilitate knowledge sharing among students and tutors. We offer a wide range of courses in various subjects, allowing learners to enhance their skills and pursue their educational goals.
          Learn more about our mission and how we are committed to making education accessible to everyone.
        </p>
      ),
    },
    {
      title: 'Course Marketplace',
      image: CourseMarketplaceImage,
      content: (
        <p>
          Discover and enroll in a diverse selection of courses from expert instructors around the world. Whether you're looking to learn a new skill, boost your career, or simply pursue a hobby, our marketplace has something for everyone.
          Start your learning journey today!
        </p>
      ),
    },
    {
      title: 'Forums',
      image: ForumsImage,
      link: '/forum',
      content: (
        <p>
          Engage in lively discussions with fellow learners and instructors. Our forums provide a platform for meaningful interactions, sharing insights, and seeking help from a supportive community of learners.
          Join the conversation and expand your knowledge.
        </p>
      ),
    },
    {
      title: 'Meetups',
      image: MeetupsImage,
      content: (
        <p>
          Connect with like-minded individuals through virtual or in-person meetups. Our meetups are designed to foster networking, collaboration, and friendship among learners with similar interests.
          Attend a meetup and grow your network!
        </p>
      ),
    },
    {
      title: 'Personalized Learning',
      image: PersonalizedLearningImage,
      content: (
        <p>
          Tailor your learning experience to meet your specific needs and interests. Our platform provides personalized recommendations based on your preferences and learning goals.
          Achieve your learning objectives, your way.
        </p>
      ),
    },
    {
      title: 'Progress Tracking',
      image: ProgressTrackingImage,
      content: (
        <p>
          Stay on top of your course progress and track your achievements. Our progress tracking feature enables you to monitor your learning journey and celebrate your accomplishments along the way.
          Keep motivated and reach new milestones!
        </p>
      ),
    },
    {
      title: 'Additional Information',
      content: (
        <p>
          Our platform empowers both students and tutors. Students can buy courses, request meetups, or hire a tutor to receive personalized guidance. Tutors can accept hires or meetups, create and sell courses, and generate passive income.
          Be part of our growing community and embark on a path of continuous learning and growth.
        </p>
      ),
    },
  ];

  const [currentSection, setCurrentSection] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSection((prevSection) => (prevSection + 1) % sections.length);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [sections.length]);

  const handleMouseEnter = () => {
    clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    intervalRef.current = setInterval(() => {
      setCurrentSection((prevSection) => (prevSection + 1) % sections.length);
    }, 5000);
  };

  return (
    <div className="about-section p-8">
      <div
        className="section-container flex items-center justify-center mb-8"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="section-content text-center p-4">
          <h1 className="text-4xl font-bold mb-4">{sections[currentSection].title}</h1>
          {sections[currentSection].content}
          <a
            href={sections[currentSection].link}
            className="text-blue-500 hover:underline inline-flex items-center mt-4 transition-transform duration-300 transform hover:translate-x-2"
          >
            Learn More
            <FaArrowRight className="ml-2" />
          </a>
        </div>
        {sections[currentSection].image && (
          <div className="section-image flex-1 max-w-3/5 relative">
            <img
              src={sections[currentSection].image}
              alt={sections[currentSection].title}
              className="max-w-full h-auto rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl"
            />

            <div className="absolute inset-0 rounded-lg border-4 border-blue-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
