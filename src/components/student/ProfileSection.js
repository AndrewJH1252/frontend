import React from 'react';
import { useSelector } from 'react-redux';
import { BiCoinStack } from 'react-icons/bi';
import { AiOutlineFieldTime,  AiOutlineTrophy, AiOutlineLogin } from 'react-icons/ai';

const ProfileSection = () => {
  const user = useSelector((state) => state.auth.profile); // Assuming you have a user state in Redux

  return (
    <div className="bg-blue-900">
     <div className="bg-cover bg-center h-64 relative overflow-hidden">
     <div
      className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black to-transparent z-10"
    ></div>

      <div className="flex justify-center items-center h-full relative z-20">
        <div className="text-white text-center">
          <img
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-32 h-32 mx-auto rounded-full object-cover mb-4 shadow-lg"
          />
          <h1 className="text-4xl text-white font-semibold mb-2 tracking-wide">
            {user.firstName} {user.lastName}
          </h1>
         


    </div>
  </div>
  <div
    className="bg-cover bg-center absolute top-0 left-0 w-full h-full"
    style={{ backgroundImage: `url(${user.headerImage})` }}
  ></div>
</div>

      <div className="container  px-5 py-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-yellow-100 rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <BiCoinStack className="text-3xl text-yellow-500" />
              <p className="ml-2 text-xl font-semibold">Courses Enrolled</p>
            </div>
            <p className="text-3xl mt-2 text-end">{user.enrollmentCount}</p>
          </div>
          <div className="bg-green-100 rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <AiOutlineFieldTime className="text-3xl text-green-500" />
              <p className="ml-2 text-xl font-semibold">Requests Created</p>
            </div>
            <p className="text-3xl mt-2 text-end">{user.requestsCreatedCount}</p>
          </div>
          <div className="bg-blue-100 rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <AiOutlineTrophy className="text-3xl text-blue-500" />
              <p className="ml-2 text-xl font-semibold">Achievements</p>
            </div>
            <p className="text-3xl mt-2 text-end">{user.achievements}</p>
          </div>
          <div className="bg-purple-100 rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <AiOutlineLogin className="text-3xl text-purple-500" />
              <p className="ml-2 text-xl font-semibold">Number of Logins</p>
            </div>
            <p className="text-3xl mt-2 text-end">{user.numLogins}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
