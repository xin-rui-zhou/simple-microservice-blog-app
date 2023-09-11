import React, { useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ postId }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`http://blog.com/posts/${postId}/comments`, {
      content,
    });
    setContent('');
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          />
          <button className="btn btn-secondary">Submit</button>
        </div>
      </form>
    </div>
  );
};
