import axios from 'axios';
import React, { useState } from 'react';

// eslint-disable-next-line
export default () => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent the default behavior of an element in response to a user action

    await axios.post('http://blog.com/posts/create', {
      title,
    });

    setTitle('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='form-control'
          />
          <button className='btn btn-primary'>Submit</button>
        </div>
      </form>
    </div>
  );
};
