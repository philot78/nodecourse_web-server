const request = require('request');

const geocode = (address, callBack) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicGhpbGwtdGF5bG9yIiwiYSI6ImNrbmlhc2ZxeDJvd3Ayb3BqN2hueW1wejkifQ.WE3IJp2HflXtBnNgUuZGnA&limit=1`;
  request(
    {
      url,
      json: true,
    },
    (error, { body } = {}) => {
      if (error) {
        callBack('ERROR: Unable to connect to mapping service.');
      } else if (body.features.length === 0) {
        callBack(`ERROR: Search term returned no value.  Please try a different search.`);
      } else {
        callBack(undefined, {
          lat: body.features[0].center[1],
          lng: body.features[0].center[0],
          place: body.features[0].place_name,
        });
      }
    }
  );
};
module.exports = geocode;
