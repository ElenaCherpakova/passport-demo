require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const PORT = process.env.PORT || 3000;
const connectDB = require('./db/connect');
const mongoDb = process.env.MONGO_URI;
const passport = require('./config/passportConfig');
const routes = require('./routes/auth');
const setCurrentUserMiddleware = require('./middleware/setCurrentUser');

const store = new MongoDBStore({
  uri: mongoDb,
  collection: 'session',
});

//Catch errors
store.on('error', (error) => {
  console.log(error);
});

app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(setCurrentUserMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(routes);

const start = async () => {
  try {
    await connectDB(mongoDb);
    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
