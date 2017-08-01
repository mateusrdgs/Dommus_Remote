require('../models/account');
require('../models/board');
require('../models/component');
require('../models/residence');
require('../models/room');
require('../models/user');

const mongoose = require('mongoose'),
      remoteDatabaseURI = 'mongodb://dommus-user:1112131415@ds111123.mlab.com:11123/dommus-remote',
      localDatabaseURI = 'mongodb://localhost:27017/remote',
      databaseURI = process.env.NODE_ENV === 'production' ? remoteDatabaseURI : localDatabaseURI;

mongoose.connect(databaseURI, {
  useMongoClient: true
});

mongoose.connection.on('connected', () => console.log(`Mongoose connected to ${databaseURI}`));
mongoose.connection.on('error', error => console.log(`Mongoose connection error ${error}`));
mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));

function gracefulShutdown(message, callback) {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${message}`);
    callback();
  })
}

//Reinicios do Nodemon
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

//Encerramento da aplicação no ambiente local
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});

//Encerramento da aplicação no ambiente de produção (Heroku)
process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});