import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart, FaComment, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { getPostById, updatePost, deletePost, likePost, unlikePost } from '../../redux/Thunks/postThunk';
import ReplyModal from './RepliesModal';
import { useNavigate } from 'react-router-dom';

const Post = ({ post }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const author = post.author;
  const postId = post._id;
  const currentUser = useSelector((state) => state.auth.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Define a state variable to trigger a re-render
  const [reloadRequests, setReloadRequests] = useState(0);

  useEffect(() => {
    if (postId && isEditing) {
      dispatch(getPostById(postId))
        .then((postData) => {
          setEditedContent(postData.content);
        })
        .catch((error) => {
          console.error('Error fetching post data:', error);
        });
    } else {
      setEditedContent(post.content);
    }
  }, [dispatch, postId, isEditing, post.content]); // Include reloadRequests as a dependency

  const handleLikePost = () => {
    dispatch(likePost(postId))
      .then((likedPost) => {
        setReloadRequests((prevReloadRequests) => prevReloadRequests + 1); // Trigger re-render
      })
      .catch((error) => {
        console.error('Error liking post:', error);
      });
      navigate(0);
  };

  const handleUnlikePost = () => {
    dispatch(unlikePost(postId))
      .then((unlikedPost) => {
        setReloadRequests((prevReloadRequests) => prevReloadRequests + 1); // Trigger re-render
      })
      .catch((error) => {
        console.error('Error unliking post:', error);
      });
      navigate(0);
  };

  const handleEditPost = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    dispatch(
      updatePost({
        postId: post._id, // Pass the post ID
        content: editedContent,
      })
    )
      .then(() => {
        setIsEditing(false);
        setReloadRequests((prevReloadRequests) => prevReloadRequests + 1); // Trigger re-render
      })
      .catch((error) => {
        console.error('Error updating post:', error);
      });
    navigate(0);
  };


  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(post.content);
  };

  const handleDeletePost = () => {
    dispatch(deletePost(postId))
      .then(() => {
        setReloadRequests((prevReloadRequests) => prevReloadRequests + 1); // Trigger re-render
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
      });
      navigate(0);
  };

  const toggleReplyModal = () => {
    setIsReplyModalOpen(!isReplyModalOpen);
  }

  


  return (
    <div className="bg-white shadow-md rounded-lg p-6 my-4">
       {isEditing ? (
        <div className="mb-4">
        <textarea
          className="w-full px-3 py-2 text-gray-800 border rounded-md focus:outline-none focus:ring focus:border-blue-300 resize-none"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          rows={4}
          placeholder={editedContent ? editedContent : "Edit Content"}
        />

        </div>
      ) : (
        <p className="text-gray-800 text-lg leading-snug mb-4">{post.content}</p>
      )}

      <div className="flex items-center justify-between text-gray-600 text-sm">
        <div className="flex items-center space-x-2">
          <FaHeart
            className={`w-4 h-4 fill-current transition-transform duration-300 ${
              post.likes.includes(currentUser._id) ? 'text-red-500 transform hover:scale-110 cursor-pointer' : 'text-gray-400 cursor-pointer transform hover:scale-110'
            }`}
            onClick={post.likes.includes(currentUser._id) ? handleUnlikePost : handleLikePost}
          />
          <span className="text-xs font-semibold">
            {post.likes.length > 0 ? post.likes.length : '0'}
          </span>
        </div>
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={toggleReplyModal}
        >
          <FaComment className="w-4 h-4 fill-current transition-transform duration-300 transform hover:scale-110 text-blue-500 cursor-pointer" />
          <span className="text-xs font-semibold">
            {post.replies.length > 0 ? post.replies.length : '0'}
          </span>
        </div>
        <div className="text-xs text-gray-400">
          {new Date(post.createdAt).toLocaleDateString()}
        </div>
      </div>

      <div className="mt-4 text-gray-600 text-sm border-t pt-4">
        <p className="mb-2">
          Author: {post.author.firstName} {post.author.lastName}
        </p>
        <p>Thread: {post.thread.title}</p>
      </div>

      <div className="mt-4 flex justify-end space-x-3">
        {!isEditing ? (
          <button
            onClick={handleEditPost}
            className="text-orange-500 hover:text-orange-700 focus:outline-none transform transition-transform duration-300 hover:scale-110"
            title='Edit'
          >
            <FaEdit className="w-4 h-4" />
          </button>
        ) : (
          <>
            <button
              onClick={handleSaveEdit}
              className="text-indigo-600 hover:text-indigo-700 focus:outline-none"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="text-red-600 hover:text-red-700 focus:outline-none"
            >
              Cancel
            </button>
          </>
        )}
        {currentUser && author._id === currentUser._id && (
          <button
            onClick={handleDeletePost}
            className="text-red-600 hover:text-red-700 focus:outline-none transform transition-transform duration-300 hover:scale-110"
            title='Delete'
          >
            <FaTrashAlt className="w-4 h-4" />
          </button>
        )}
      </div>

      <ReplyModal
        postId={postId}
        isOpen={isReplyModalOpen}
        onRequestClose={toggleReplyModal}
      />
    </div>
  );
};

export default Post;
