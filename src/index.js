import express from 'express';
import mongoose from 'mongoose';
import winston from 'winston';
import bodyParser from 'body-parser';
import http from 'http';
import path from 'path';

import initializeCronJob from './database/InitializeCronJob';
import api from './api';
import initializeSocket from './socket';

const PORT = 3000;

mongoose.connect('mongodb://localhost/dev-dashboard', { useMongoClient: true });
mongoose.Promise = global.Promise;

initializeCronJob();
const app = express();
app.server = http.createServer(app);
initializeSocket(app.server);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));
app.use(express.static('static-public'));

app.use('/api/v1', api);

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get('*', (req, res) => {
  res.render('index');
});

app.server.listen(PORT, () => {
  winston.info(`Express Listening on Port ${PORT}`);
});
