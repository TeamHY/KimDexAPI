const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const indexRouter = require('./routes/index');
const collectiblesRouter = require('./routes/collectibles');
const tipsRouter = require('./routes/tips');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/api', indexRouter);
app.use('/api/collectibles', collectiblesRouter);
app.use('/api/tips', tipsRouter);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

module.exports = app;
