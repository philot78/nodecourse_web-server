const request = require('request');

const forecast = (lng, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=9e6ea1409e8b19793f52a129b542e33f&query=${lat},${lng}&units=f`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback(`ERROR: Unable to connect to weather service.`);
    } else if (body.error) {
      callback(` ${body.error.code}, ${body.error.type}-${body.error.info} `);
    } else {
      callback(
        undefined,
        `In ${body.location.name} it is currently ${body.current.weather_descriptions} and the temperature is ${body.current.temperature} degrees, and it feels like ${body.current.feelslike} degrees`
      );
    }
  });
};
module.exports = forecast;
