const express = require('express');
const sequelize = require('./config/database');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
// const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const bidRoutes = require('./routes/bidRoutes');
const auctionRoutes = require('./routes/auctioRoutes');

const { Server } = require('socket.io'); // Import socket.io

// const multer = require('multer');
// const upload = multer();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (modify as per your needs)
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(upload.none()); 

app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'Images')));

// Routes
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api', bidRoutes);
app.use('/api/auction', auctionRoutes);
// app.use('/api', adminRoutes);

sequelize
  .sync({ alter:true})
  .then(() => {
    console.log('Database connected!');

    // Start HTTP and WebSocket server
    server.listen(3001, () => {
      console.log('Server running on http://localhost:3001');
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

module.exports = {io};
