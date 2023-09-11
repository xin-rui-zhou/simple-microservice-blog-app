const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const port = 4005;
const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post('http://posts-clusterip-srv:4000/events', event).catch((err) => {
    // posts
    console.log(err.message);
  });
  axios.post('http://comments-srv:4001/events', event).catch((err) => {
    // comments
    console.log(err.message);
  });
  axios.post('http://query-srv:4002/events', event).catch((err) => {
    // query
    console.log(err.message);
  });
  axios.post('http://moderation-srv:4003/events', event).catch((err) => {
    // moderation
    console.log(err.message);
  });

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
