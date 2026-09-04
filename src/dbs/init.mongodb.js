'use strict';

const mongoose = require('mongoose');
const { db: { user, password, host, name }} = require('../configs/config.mongodb');
const { checkConnection, checkOverload } = require('../helpers/check.connnect');
const connectString = `mongodb+srv://${user}:${password}@${host}/${name}`;

class Database {
    constructor() {
        this.connect();
    }

    connect() {
        if(1 === 1) {
            mongoose.set('debug', true);
            mongoose.set('debug', { color: true });
        }

        mongoose.connect(connectString)
            .then(() => {
                console.log('Database connection successful');
                checkConnection();
                checkOverload();
            })
            .catch(err => {
                console.error('Database connection error', err);
            });
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceongoDB = Database.getInstance();
module.exports = instanceongoDB;