//loading all needed packeges
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config();

// files 
const db = require('./db/db')
const userRoutes  =  require('./routes/userRoutes')


// Initialize Express app
const app = express();

// Middlewares
app.use(express.json())
app.use(cors())


// Use the user routes
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
    db() // connecting to database
    console.log(`Server is running on http://localhost:${PORT}`);
});

