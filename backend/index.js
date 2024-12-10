const express = require('express');
const studentRoutes = require('./routes/students');  // Routes for students CRUD
const {connectMongoDB} = require('./connection');
const cors = require('cors');
const bodyParser = require('body-parser');
const AuthRouter = require('./routes/AuthRouter')
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8080; 



// Middleware
app.use(cors());  // Enable Cross-Origin Resource Sharing
app.use(express.json());  // Parse JSON bodies
app.use(bodyParser.json());

// Connect to MongoDB
connectMongoDB('mongodb+srv://Ehtu1511:Ece2014@booking-app.lxcpj.mongodb.net/?retryWrites=true&w=majority&appName=booking-app');

app.get('/ping',(req,res)=>{
  res.send('PONG');
})

//use Signup and Login
app.use('/auth',AuthRouter);

// Use student routes
app.use('/student', studentRoutes); 


// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

app.keepAliveTimeout = 120000; // 120 seconds
app.headersTimeout = 120000;

module.exports = app;
