const http = require('http');
const path = require('path');
const fs = require('fs');
const express = require('express');
const git = require('nodegit');
const bodyParser = require('body-parser');
const querystring = require('querystring');
const escomplex = require('escomplex');
const manager = express();

var fileArray = [];
var fileIndex = 0;
var complexities = [];
var workers = [];
var workerPortNumber = 8081;
var workersDone = 0;
var esprima = require('esprima');
var request = require('request');

manager.use(bodyParser.json());
manager.use(bodyParser.urlencoded({ extended: true }));


for (var i = 0; i < 5; i++){  
    var details = {
        hostname: 'localhost',
        port: workerPortNumber,
        path: '/init',
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
        }
    };
    workers.push(details);
    workerPortNumber++;
}