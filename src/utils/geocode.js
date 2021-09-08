const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?language=es&limit=3&access_token=pk.eyJ1IjoibWF1cm9zOTMiLCJhIjoiY2t0N3RzY253MHZvaDJ5bXU2bHcyanNzaiJ9.5GkyFVp5CYtFdhyiacplNA`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to conect to location services", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Try onother search.", undefined);
    } else {
      callback(undefined, {
        latitude: response.body["features"][0].center[1],
        longitude: response.body["features"][0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
