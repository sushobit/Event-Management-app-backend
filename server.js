// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Import routes
const eventRoutes = require('./routes/events');
const userRoutes = require('./routes/users');

// Use routes
app.use('/events', eventRoutes);
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
