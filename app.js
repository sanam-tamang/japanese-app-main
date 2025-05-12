// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Import routes
const userRoutes = require('./routes/userRoutes');
const gamifyRoutes = require('./routes/gamifyRoutes');
const learningRoutes = require('./routes/learningRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const chatRoutes = require('./routes/chatRoutes');
// const paymentRoutes = require('./routes/paymentRoutes');
const socialRoutes = require('./routes/socialRoutes');





// config
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


// Middleware to handle file uploads
// Routes
app.use('/api/users', userRoutes);
app.use('/api/gamify', gamifyRoutes);
app.use('/api/learning', learningRoutes);
app.use('/uploads', express.static('uploads'));// Serve static files from the uploads directory
app.use('/api/upload', uploadRoutes); // Upload route
app.use('/api/chat', chatRoutes);
// app.use('/api/payment', paymentRoutes);
app.use('/api/social', socialRoutes);

// connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// base route
app.get('/', (req, res) => {
  res.send('API is working ✅');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
