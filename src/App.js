require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require('./config')
const animalsRouter = require('./animals/animals-router');
const namesRouter = require('./names/names-router');

const app = express();

const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

// comment out the following lines (until 'end') when you are satisfies it works
app.use((req, res, next)=> { // debugging access to initial request - notice how these change inside the routers
    console.log('App.js: req.headers: ', req.headers);
    console.log('App.js: req.originalUrl: ', req.originalUrl);
    console.log('App.js: req.params: ', req.params);
    console.log('App.js: req.query: ', req.query);
    next();
})
// end 

// specific routes for resources
app.use('/api/animals', animalsRouter)
app.use('/api/names', namesRouter)

// route for basic health check
app.get('/', (req, res) => { res.send('Hello, world!') })

// handle server-side errors
app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        console.log(error.message);
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})


module.exports = app;
