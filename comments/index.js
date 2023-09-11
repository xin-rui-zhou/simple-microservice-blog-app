const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 4001;
const commentsByPostID = {};

app.get('/posts/:id/comments', (req, res) => {
  var id = req.params.id;
  res.send(commentsByPostID[id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentID = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostID[req.params.id] || [];
  comments.push({ id: commentID, content, status: 'pending' });
  commentsByPostID[req.params.id] = comments;

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentID,
      content,
      postId: req.params.id,
      status: 'pending',
    },
  });

  res.status(201).send(commentsByPostID[req.params.id]);
});

app.post('/events', async (req, res) => {
  console.log('Received Event', req.body.type);

  const { type, data } = req.body;
  if (type === 'CommentModerated') {
    const { id, status, postId, content } = data;
    const comments = commentsByPostID[postId];
    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;

    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        content,
        postId,
        status,
      },
    });
  }
  res.send({});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
