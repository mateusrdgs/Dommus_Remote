import mongoose from 'mongoose';
import '../models/account';
import '../models/board';
import '../models/component';
import '../models/residence';
import '../models/room';
import '../models/user';

let databaseURI = 'mongodb://localhost:27017/remote';

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