require('dotenv').config({ path: '.env' });
require('./api/config/database');
require('./api/config/passport');

const fs = require('fs'),
      https = require('https'),
      express = require('express'),
      helmet = require('helmet'),
      bodyParser  = require('body-parser'),
      morgan = require ('morgan'),
      cors = require('cors'),
      passport = require('passport'),
      routes = require('./api/routes/index'),
      port = 3000,
      app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use('/api', routes);

const options = {
      key: fs.readFileSync('/etc/openssl/remote-key.pem'),
      cert: fs.readFileSync('/etc/openssl/remote-cert.pem'),
      passphrase: process.env.PASSPHRASE,
      requestCert: false,
      rejectUnauthorized: false
}

https.createServer(options, app)
     .listen(port || process.env.PORT, () => console.log(`Express listening on port ${port}`));