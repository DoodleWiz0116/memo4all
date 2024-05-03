const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB database
mongoose.connect('mongodb://localhost/collaborative-writing', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a schema for the text entry
const EntrySchema = new mongoose.Schema({
  text: String,
  timestamp: Date,
});

const Entry = mongoose.model('Entry', EntrySchema);

// Serve static files from the "public" directory
app.use(express.static('public'));

// API route to handle text entry
app.post('/api/entry', (req, res) => {
  const { text } = req.body;

  // Create a new entry in the database
  const newEntry = new Entry({
    text,
    timestamp: new Date(),
  });

  newEntry.save((err) => {
    if (err) {
      console.error('Error saving entry:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Entry saved successfully' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});