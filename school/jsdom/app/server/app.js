import express from 'express';
import fs from 'fs';

export const app = express();

app.get('/', function (_, response) {
    response.setHeader('Content-Type', 'text/html');
    const html = fs
        .readFileSync('school/jsdom/app/client/index.html')
        .toString();

    response.write(html);
    response.end();
});

app.get('/app.js', function (_, response) {
    response.setHeader('Content-Type', 'text/javascript');
    const code = fs.readFileSync('school/jsdom/build/app.js').toString();

    response.write(code);
    response.end();
});

app.get('/data', function (_, response) {
    response.setHeader('Content-Type', 'application/json');
    const data = JSON.stringify({ message: 'hello world' });

    response.write(data);
    response.end();
});
