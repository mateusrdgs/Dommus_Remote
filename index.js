require('dotenv').config({ path: '.env' });
require('./api/config/database');
require('./api/config/passport');

const fs = require('fs'),
      http = require('http'),
      express = require('express'),
      helmet = require('helmet'),
      bodyParser  = require('body-parser'),
      morgan = require ('morgan'),
      cors = require('cors'),
      passport = require('passport'),
      dist = require('./api/routes/dist'),
      api = require('./api/routes/index'),
      port = 3000,
      app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use('/api', api);
app.use('/', dist);

http.createServer(app)
     .listen(port || process.env.PORT, () => console.log(`Express listening on port ${port}`));