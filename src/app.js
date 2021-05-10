const path = require('path');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

const app = express();

/////Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsLocation = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

/// set up parsing middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

///hbs initialization and views directory location
app.set('view engine', 'hbs');
app.set('views', viewsLocation);
hbs.registerPartials(partialsPath);

///setup public directory to serve from
app.use(express.static(publicDirectoryPath));

///handler paths
app.get('', (req, res) => {
  res.render('index');
});
app.get('/services', (req, res) => {
  res.render('services');
});
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send('Error: missing address');
  }
  geocode(req.query.address, (error, { lng, lat, place } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(lng, lat, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        weather: forecastData,
        place,
        address: req.query.address,
      });
    });
  });
});

app.get('*', (req, res) => {
  res.send('404: Page not found.');
});

app.listen(3000, () => {
  console.log('The server is running');
});
