// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost/user_input', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Input Schema
const userInputSchema = new mongoose.Schema({
  input: String,
  timestamp: Date,
});

const UserInput = mongoose.model('UserInput', userInputSchema);

// API endpoint for user input submission
app.post('/api/input', async (req, res) => {
  try {
    const { input } = req.body;
    const userInput = new UserInput({
      input,
      timestamp: new Date(),
    });
    await userInput.save();
    res.status(200).json({ message: 'User input saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Scheduled task to save user input every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  try {
    const userInputs = await UserInput.find({
      timestamp: {
        $gte: new Date(Date.now() - 5 * 60 * 1000), // Last 5 minutes
      },
    });
    console.log('User inputs saved:', userInputs);
  } catch (error) {
    console.error(error);
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});