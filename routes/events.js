// routes/events.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all events
router.get('/', (req, res) => {
  db.all("SELECT * FROM events", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Create an event
router.post('/', (req, res) => {
  const { title, description, date, location } = req.body;
  db.run("INSERT INTO events (title, description, date, location) VALUES (?, ?, ?, ?)", [title, description, date, location], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
});

// Update an event
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, date, location } = req.body;
  db.run("UPDATE events SET title = ?, description = ?, date = ?, location = ? WHERE id = ?", [title, description, date, location, id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ changes: this.changes });
  });
});

// Delete an event
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM events WHERE id = ?", id, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
