const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS Configuration for Development and Production
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  process.env.CLIENT_URL // This will be your Vercel URL
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
  optionsSuccessStatus: 200
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`🔄 ${req.method} ${req.path}`);
  console.log('🔄 Body:', req.body);
  console.log('🔄 Origin:', req.headers.origin);
  next();
});

// Response logging
app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function(data) {
    console.log(`✅ Response sent for ${req.method} ${req.path}:`, data);
    originalSend.call(this, data);
  };
  next();
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: 'Task Management API is running! 🚀',
    status: 'Server is online'
  });
});

// API info route
app.get('/api', (req, res) => {
  res.json({ 
    success: true,
    message: 'API is running successfully! 🚀',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    availableEndpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login'
      },
      tasks: {
        getAllTasks: 'GET /api/tasks',
        createTask: 'POST /api/tasks',
        updateTask: 'PUT /api/tasks/:id',
        deleteTask: 'DELETE /api/tasks/:id'
      }
    }
  });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/taskmanagement')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ API available at: http://localhost:${PORT}/api`);
  console.log(`✅ CORS enabled for: http://localhost:3000`);
});