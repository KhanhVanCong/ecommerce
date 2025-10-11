const compression = require('compression');
const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const app = express();


// init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

// init db

// init routes
app.get('/', (req, res, next) => {
    const test = 'test';
  return res.status(200).json({ message: 'Welcome My project', metadata: test.repeat(1000) });
});

// init error handler

module.exports = app;