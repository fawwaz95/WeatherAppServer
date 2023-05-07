const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fetchingAPI = require('./api/fetchAPI');
const apikey = '48ebf7308a22ff1e72288dc068d74de9';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cors());
app.use(bodyParser.json());


// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post('/CurrentWeather', (req, res) => {
  const {cityName} = req.body;
  const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apikey}`;
  fetchingAPI.fetchAPI(apiUrl, 'weather', apikey, res);
});

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post('/FiveDayForecast', (req, res) => {
  const {cityName} = req.body;
  const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apikey}`;
  fetchingAPI.fetchAPI(apiUrl, 'forecast', apikey, res);
});

app.listen(PORT, () =>{
  console.log(`App is running on port ${PORT}`);
});
