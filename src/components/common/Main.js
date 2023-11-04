import React from 'react';
import Header from './Header';
import Categories from '../categories/Categories';
import FeaturedCourses from '../home/FeaturedCourses';
import CommunityForum from '../home/CommunityForum';
import Content from './content';
import About from './About';
import Team from './Team';
import Events from './Events';


const Main = () => {
  return (
    <div>
      <Header />
      <Events />
      <FeaturedCourses />
      <Categories />
      <Content />
      <About />
      <Team />
   
    </div>
  );
};

export default Main;
