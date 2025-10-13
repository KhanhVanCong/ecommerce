'use strict';

const mongoose = require('mongoose');

const connectString = 'mongodb+srv://khanh:FpbzPorz2aeMlbyi@cluster0.ikzod5p.mongodb.net/';

mongoose.connect(connectString).then( _ => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

if(1 === 1) {
    mongoose.set('debug', true);
    mongoose.set('debug', { color: true });
}

module.exports = mongoose;