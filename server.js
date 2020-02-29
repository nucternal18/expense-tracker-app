// @ts-nocheck
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const admin = require('firebase-admin');

// const serviceAccount = require('../firebase/expense-tracker-2eaf8-firebase-adminsdk-el7dv-6ee1fc221f.json');

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: 'https://expense-tracker-2eaf8.firebaseio.com',
// });

dotenv.config({ path: './config/config.env' });


const transactions = require('./routes/transactions');

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(bodyParser.json());

app.use('/transactions', transactions);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));