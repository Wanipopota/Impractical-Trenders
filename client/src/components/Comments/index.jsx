import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';
import { QUERY_PRODUCT_BY_ID } from '../../utils/queries'; // Add query to refetch comments

const CommentSection = ({ comments = [], isLoggedIn, productId }) => {
  const [newComment, setNewComment] = useState('');
  const [addComment, { loading, error }] = useMutation(ADD_COMMENT, {
    refetchQueries: [{ query: QUERY_PRODUCT_BY_ID, variables: { id: productId } }],
    awaitRefetchQueries: true, // Ensure refetch happens before the UI update
  });

  // Handle input change
  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  // Handle comment submission
  const handleAddComment = async () => {
    if (newComment.trim() !== '') {
      try {
        await addComment({
          variables: { productId, commentText: newComment },
        });
        setNewComment(''); // Clear the input after adding the comment
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
      <div className="p-6">
        <h3 className="text-2xl font-bold text-forest-green mb-4">Comments</h3>

        <div className="comments-list mb-6">
          {comments.length === 0 ? (
            <p className="text-gray-700">No comments yet. Be the first to comment!</p>
          ) : (
            <ul className="space-y-4">
              {comments.map((comment, index) => (
                <li key={index} className="bg-gray-100 p-4 rounded">
                  <strong className="text-forest-green">{comment.username}:</strong> {comment.commentText}
                </li>
              ))}
            </ul>
          )}
        </div>

        {isLoggedIn ? (
          <div className="add-comment">
            <textarea
              value={newComment}
              onChange={handleInputChange}
              placeholder="Write your comment here..."
              className="w-full p-2 border border-gray-300 rounded mb-2"
              disabled={loading}
            />
            <button 
              onClick={handleAddComment} 
              className="bg-sunflower text-forest-green py-2 px-4 rounded hover:bg-terracotta hover:text-white transition duration-300"
              disabled={loading}
            >
              {loading ? 'Adding Comment...' : 'Add Comment'}
            </button>
            {error && <p className="text-red-500 mt-2">Error adding comment. Please try again.</p>}
          </div>
        ) : (
          <p className="text-gray-700">Please log in to add a comment.</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;

