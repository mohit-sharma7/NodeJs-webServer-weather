const request = require("request");

const mapBox = (address, callBack) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibW9oaXRzaGFybWE3IiwiYSI6ImNsMGh6MjR2YjBhZWszY3VlYTN5bW4xdzcifQ.GefDUX3d4duU8RykBB8W4w&limit=1";

  request(
    {
      url: url,
      json: true,
    },
    (error, response) => {
      if (error) {
        callBack("Error Connecting! Check Your Internet....", undefined);
      } else if (response.body.features.length === 0) {
        callBack(
          "Could not find the location. Try another address or try again",
          undefined
        );
      } else {
        callBack(undefined, {
          latitude: response.body.features[0].center[1],
          longitude: response.body.features[0].center[0],
          location: response.body.features[0].place_name,
        });
      }
    }
  );
};

const weatherAPI = (latitude, longitude, callBack) => {
  const url = `http://api.weatherstack.com/current?access_key=e89bfe3463eea18a35a356b336022b83&query=${latitude},${longitude}&units=f`;

  request(
    {
      url,
      json: true,
    },
    (error, response) => {
      if (error) {
        callBack("Error Connecting! Check Your Internet....", undefined);
      } else if (response.body.error) {
        callBack(
          `Unable to find location for LATITUDE: ${latitude} and LONGITUDE: ${longitude}`,
          undefined
        );
      } else {
        callBack(
          undefined,
          `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out, It feels like ${response.body.current.feelslike} degrees out.`
        );
      }
    }
  );
};

module.exports = {
  mapBox: mapBox,
  weatherAPI: weatherAPI,
};
