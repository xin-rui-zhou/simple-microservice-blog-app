import React from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let content;
    if (comment.status === 'accepted') {
      content = comment.content;
    }
    if (comment.status === 'rejected') {
      content = 'This comment has been rejected.';
    }
    if (comment.status === 'pending') {
      content = 'This comment has been waiting to be moderated.';
    }
    return <li key={comment.id}>{content}</li>;
  });

  return (
    <div>
      <p>{comments.length} comments</p>
      <ul>{renderedComments}</ul>
    </div>
  );
};
