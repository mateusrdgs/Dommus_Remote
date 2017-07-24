import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import './api/config/database';
import routes from './api/routes/index';

const port = 3000;
const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

app.use('/api', routes);

app.listen(port, () => console.log(`Express listening on port ${port}`));