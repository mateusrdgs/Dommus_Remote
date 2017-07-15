import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import './api/models/database';
import routes from './api/routes/index';

const port = 3000;
const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

app.use('/api', routes)

app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  if(err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({'message': `${err.name}: ${err.message}`})
  }
  if(app.get('env') === 'development') {
    app.use((err, req, res) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }
});

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

app.listen(port, () => console.log(`Express listening on port ${port}`));