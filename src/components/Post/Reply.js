import React from 'react';

const Reply = ({ reply }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-2 sm:m-4 md:m-6 lg:m-8 xl:m-10">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3">
          <p className="text-gray-800 text-xs font-semibold mb-2">{reply.author.firstName} {reply.author.lastName}</p>
          <p className="text-gray-600">{reply.content}</p>
        </div>
        <div className="w-full lg:w-1/3 mt-4 lg:mt-0 lg:text-right">
          <p className="text-gray-400 text-xs">{new Date(reply.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Reply;
