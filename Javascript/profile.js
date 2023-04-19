const express = require('express');
const app = express();

// define a server-side endpoint that returns some data
app.get('/data', (req, res) => {
  const data = {
    title: 'Programming 2',
    text: 'Monday, 10:00am - 12:30pm\nWednesday, 10:00am - 12:30pm\n12 complete'
  };
  res.json(data);
});

// start the server
app.listen(3000, () => console.log('Server started on port 3000'));
