const path = require('path');        // route for build(production)
const express = require('express');
const dotenv = require('dotenv');   // for global variables
const colors = require('colors');   // colors for console logs
const morgan = require('morgan'); 
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const transactions = require('./routes/transactions');

const app = express();

app.use(express.json());  // this will allows us to use body parser -> req.body.something

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use('/api/v1/transactions', transactions);

// for production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on 
port ${PORT}`.blue.bold ));