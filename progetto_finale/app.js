const express = require('express');
const hbs = require('hbs');
const session = require('express-session')

const loginRouter = require('./routers/login')
const registerRouter = require('./routers/register')
const aircraftRouter = require('./routers/aircraft')
const hangarRouter = require('./routers/hangar')
const adminRouter = require('./routers/admin')

const database = require("./modules/database.js")

const PORT = 8080;

const app = express();

app.use(session({
    secret: 'abcde',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000
    }
  }));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('./public'));

app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/aircrafts', aircraftRouter)
app.use('/hangar', hangarRouter)
app.use('/admin', adminRouter)

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname+'/views/partials')
hbs.registerHelper('join', function(array, separator) {
  return array.join(separator);
});

app.get('/', (req, res) => {
  res.redirect('/login')
});

app.get('/login', loginRouter)
app.get('/register', registerRouter)
app.get('/aircrafts', aircraftRouter)
app.get('/hangar', hangarRouter)
app.get('/admin', adminRouter)

app.get('*', (req, res) => {
  res.render('error/404', {});
});

app.listen(PORT);

