const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const { dbURI } = require('./config/db');

// API routes
const cakeRoute = require('./routes/cakeRoute');

// port
const port = process.env.PORT || 3000;

//express app
const app = express();

//database connection
mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(res => app.listen(port, () => {
        console.log('Listening on port ' + port);
    }))
    .catch(err => console.log(err));

// middleware
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(cors());

// static files
app.use(express.static(path.join(__dirname, 'public')));

// API root
app.use('/api/cake', cakeRoute);
