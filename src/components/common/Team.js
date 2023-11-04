import React from 'react';
import mukelo from '../../images/mukelo.png';
import andrew from '../../images/andrew.jpg';
import sanele from '../../images/sanele.jpg';
import pio from '../../images/profile.png';
import yesira from '../../images/profile.png';
import { FiLinkedin, FiTwitter } from 'react-icons/fi';

const Team = () => {
  return (
    <div className="bg-indigo-900 py-16">
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Meet Our Team</h1>
      <p className="text-white text-center mb-12 max-w-2xl mx-auto">
        Join a group of passionate individuals dedicated to delivering the best online learning experience.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1 flex flex-col items-center justify-center">
        <p className="text-center text-gray-100 mb-4">Join our amazing team and be part of the journey!</p>
        <a
          href="#join-now"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full text-center transition duration-300"
        >
          Join Now
        </a>
      </div>

        
        {teamMembers.map((member, index) => (
          <div
            key={member.name + index}
            className={`bg-${member.bgColor} p-4 rounded-lg shadow-lg hover:shadow-2xl transform transition-transform duration-300 hover:scale-105 flex flex-col items-center`}
          >
            <div className={`rounded-full h-40 w-40 overflow-hidden mb-4 border-4 border-${member.borderColor}`}>
              <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
            </div>
            <h3 className={`text-2xl font-semibold mb-2 text-center text-${member.textColor}`}>{member.name}</h3>
            <p className={`text-${member.textColor} text-center mb-4`}>{member.role}</p>
            <div className="flex space-x-4">
              <a href="#" className={`text-${member.linkColor} hover:text-${member.hoverLinkColor} transition duration-300`}>
                <FiLinkedin className="text-2xl" />
              </a>
              <a href="#" className={`text-${member.linkColor} hover:text-${member.hoverLinkColor} transition duration-300`}>
                <FiTwitter className="text-2xl" />
              </a>
            </div>
          </div>
        ))}

          <div className="ml-10 col-span-2 md:col-span-1 flex flex-col items-center justify-center">
            <div className="text-center mb-4">
              <span className="text-6xl text-gray-400">
                🌟
              </span>
            </div>
            <p className="text-center text-gray-100">Discover the magic behind our team's success.</p>
          </div>


      </div>
    </div>
  </div>
  );
};

const teamMembers = [
  {
    name: 'Mukelo Ziyane',
    role: 'Co-Founder & Designer',
    image: mukelo,
    bgColor: 'red-400',
    borderColor: 'red-600',
    textColor: 'white',
    linkColor: 'gray-700',
    hoverLinkColor: 'purple-600',
  },
  {
    name: 'Pio',
    role: 'Lead Developer',
    image: pio,
    bgColor: 'green-500',
    borderColor: 'green-600',
    textColor: 'white',
    linkColor: 'gray-700',
    hoverLinkColor: 'blue-600',
  },
  {
    name: 'Yesira',
    role: 'Documentation',
    image: yesira,
    bgColor: 'blue-500',
    borderColor: 'blue-600',
    textColor: 'white',
    linkColor: 'gray-700',
    hoverLinkColor: 'green-600',
  },
  {
    name: 'Sanele Mkhulisi',
    role: 'Backend',
    image: sanele,
    bgColor: 'yellow-500',
    borderColor: 'yellow-600',
    textColor: 'white',
    linkColor: 'gray-700',
    hoverLinkColor: 'yellow-600',
  },
  {
    name: 'Andrew Jonathan',
    role: 'Backend Engineer',
    image: andrew,
    bgColor: 'indigo-400',
    borderColor: 'indigo-600',
    textColor: 'white',
    linkColor: 'gray-700',
    hoverLinkColor: 'red-600',
  },
];

export default Team;
