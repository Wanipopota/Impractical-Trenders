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
    <div className="comment-section">
      <h3>Comments</h3>

      {/* Display the list of comments */}
      <div className="comments-list">
        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>
                <strong>{comment.username}:</strong> {comment.commentText}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Show comment form if the user is logged in */}
      {isLoggedIn ? (
        <div className="add-comment">
          <textarea
            value={newComment}
            onChange={handleInputChange}
            placeholder="Write your comment here..."
            className="comment-input"
            disabled={loading}
          />
          <button onClick={handleAddComment} className="add-comment-btn" disabled={loading}>
            {loading ? 'Adding Comment...' : 'Add Comment'}
          </button>
          {error && <p>Error adding comment. Please try again.</p>}
        </div>
      ) : (
        <p>Please log in to add a comment.</p>
      )}
    </div>
  );
};

export default CommentSection;
