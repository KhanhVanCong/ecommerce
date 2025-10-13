'use strict';

const dev = {
    app: {
        port: process.env.PORT || 3000,
    },
    db: {
        user: process.env.DEV_DB_USER,
        password: process.env.DEV_DB_PASSWORD,
        host: process.env.DEV_DB_HOST,
        name: process.env.DEV_DB_NAME,
    }
}

const prod = {
    app: {
        port: process.env.PORT || 3000,
    },
    db: {
        user: process.env.PROD_DB_USER,
        password: process.env.PROD_DB_PASSWORD,
        host: process.env.PROD_DB_HOST,
        name: process.env.PROD_DB_NAME,
    }
}

const config = { dev, prod }
module.exports = config[process.env.NODE_ENV || 'dev'];