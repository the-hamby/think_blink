const express = require('express');
const fs = require('fs');

let logName = 'variantLog.json';

function readLogFile() {
    if (fs.existsSync(logName)) {
        const rawData = fs.readFileSync(logName);
        return JSON.parse(rawData);
    } else {
        return json = {
            'A': {
                noOfSignups: 0,
                noOfLoads: 0
            },
            'B': {
                noOfSignups: 0,
                noOfLoads: 0
            }
        }
    }
}

function writeLogFile(log) {
    fs.writeFileSync(logName, JSON.stringify(log));
}

function logger(filename) {}

/*
    Each time a variant is selected, it is logged so the success rate can be measure
*/
logger.recordVariantLoad = (variant) => {
    const variantLog = readLogFile();
    variantLog[variant].noOfLoads += 1;
    writeLogFile(variantLog);
}

/*
    Records a successful login for a given variant
*/
logger.recordLogin = () => {
    return (req, res, next) => {
        const analyticLogs = readLogFile();
        const variant = req.query.variant;
        analyticLogs[variant].noOfSignups += 1;
        writeLogFile(analyticLogs);
        
        res.testResults = analyticLogs;
        next();
    }
}
module.exports = logger;