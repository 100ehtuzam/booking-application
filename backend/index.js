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
connectMongoDB('mongodb://localhost/student_management');

app.get('/ping',(req,res)=>{
  res.send('PONG');
})

//use Signup and Login
app.use('/auth',AuthRouter);

// Use student routes
app.use('/student', studentRoutes); 


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
