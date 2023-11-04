import React from 'react';
import background1 from '../../images/hero.jpg';
import background2 from '../../images/hero.jpg';
import background3 from '../../images/hero.jpg';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const HeroSection = () => {
  const slides = [
    {
      image: background1,
      title: 'Welcome to Tutorium!',
      subtitle: 'Discover a world of knowledge and expand your horizons.',
      ctaText: 'Explore Courses',
      ctaLink: '#featured-courses',
    },
    {
      image: background2,
      title: 'Learn Anytime, Anywhere',
      subtitle: 'Access a wide range of courses from the comfort of your home.',
      ctaText: 'Browse Courses',
      ctaLink: '/results',
    },
    {
      image: background3,
      title: 'Join Our Community',
      subtitle: 'Connect with fellow learners and experts.',
      ctaText: 'Join Now',
      ctaLink: '/register',
    },
  ];

  return (
    <Carousel
      infiniteLoop
      autoPlay
      interval={5000}
      showStatus={false}
      showThumbs={false}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className="relative bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 py-32 px-8 md:px-16 lg:px-32 xl:px-48"
        >
          <img
            src={slide.image}
            alt={`Hero Background ${index}`}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          <div className="relative z-10 text-white text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl mb-8">{slide.subtitle}</p>
            <a
              href={slide.ctaLink}
              className="bg-white text-indigo-600 px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition duration-300 ease-in-out inline-block"
            >
              {slide.ctaText}
            </a>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default HeroSection;
