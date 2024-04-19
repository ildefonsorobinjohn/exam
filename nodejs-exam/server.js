const express = require('express'); 
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
const PORT = process.env.PORT || 4000;

 
app.use(bodyParser.json());
 
app.use(bodyParser.json());

 
mongoose.connect('mongodb://localhost:27017/todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// User Model
const User = mongoose.model('Todo', {
  todo: String
});

// Routes
app.get('/todo', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/todo', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});