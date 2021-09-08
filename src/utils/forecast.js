const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=ffaeb5dc288d3068f858e98206202b4b&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to conect to location services", undefined);
    } else if (response.body.error) {
      console.log("Unable to find location", response);
    } else {
      const data = response.body["current"];
      const latitudeW = response.body.location.lat;
      const longitudeW = response.body.location.lon;
      const msg =
        data.weather_descriptions[0] +
        ". It is currently degress " +
        data.temperature +
        ". It feels like " +
        data.feelslike +
        " degress out.";
      callback(undefined, {
        msg,
        latitudeW,
        longitudeW,
      });
    }
  });
};

module.exports = forecast;
