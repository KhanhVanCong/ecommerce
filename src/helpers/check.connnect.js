'use strict';
const mongoose = require('mongoose');
const os = require('os');
const process = require('process');
const _TIMETOCHECKOVERLOAD = 5000; // 1s
const _MAXCONNECTTIONOFEACHCORE = 5;

const checkConnection = () => {
    const numberConnections = mongoose.connections.length;
    console.log('Number of connections:', numberConnections);
};

const checkOverload = () => {
    setInterval(() => {
        const numberConnections = mongoose.connections.length;
        const numberCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;

        const maxConnections = numberCores * _MAXCONNECTTIONOFEACHCORE;

        console.log(`Active connections: ${numberConnections}`);
        console.log(`Memory Usage: RSS ${Math.round(memoryUsage / 1024 / 1024 * 100) / 100} MB`);

        if (numberConnections > maxConnections) {
            console.error(`Overload detected: ${numberConnections} connections (max: ${maxConnections})`);
        }
    }, _TIMETOCHECKOVERLOAD);
}

module.exports = { checkConnection, checkOverload };