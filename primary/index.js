require('dotenv').config()

const express = require('express')
const router = require('../routes/api')
const bodyParser = require('body-parser')
const session = require('express-session');

const app = express()

const port = process.env.port || process.env.PORT || 3000
const appName = process.env.APP_NAME
const appEnv = process.env.APP_ENV

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 2 * 60 * 60 * 1000
  }
}));

app.use('/api', router)

app.get('/', (req, res) => {
  return res.status(200).json({
    message: `Success Running App ${appName} (${appEnv})`
  });
})


app.listen(port, () => {
    console.log(`\n${ appName } (${appEnv}) listening to http://localhost:${ port }`)
})

Date.prototype.addHours= function(h){
  this.setHours(this.getHours()+h);
  return this;
}
