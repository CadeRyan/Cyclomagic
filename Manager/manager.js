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

manager.post('/repoURL', (request, res) => {
    console.log('Cloning repositry...');
    var repoURL = request.body.Repo;
    var repo = git.Clone(repoUrl, path.join(__dirname, './repo-folder')).catch((error) => {
        console.log('Repositry does not exist');
        console.log(error.message);
    }).then((repo) => {

        reposToFileArray(path.join(__dirname, './repo-folder'), /\.js$/);
        console.log("Cloning complete.");

        for (var i = 0; i < workers.length; i++) {
            request = http.request(workers[i]);
            request.write(JSON.stringify({ "String": "" }));
            request.end();
            workers[i].path = '/work';
        }
    });

    reposToFileArray = (repoPath, fileType) => {
        var files = fs.readdirSync(repoPath);
        for (var i = 0; i < files.length; i++) {
            var file = path.join(repoPath, files[i]);

            if (fs.lstatSync(file).isDirectory()) {
                reposToFileArray(file, fileType);
            }
            else if (fileType.test(file)) {
                repoFiles.push(file);
            }
        }

    };
});