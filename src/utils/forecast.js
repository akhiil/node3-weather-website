const request = require("request")

const forecast = (address, callback) => {
  const url =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    address +
    "&APPID=316460bd228149c7f13d818ffd92929d"
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to reach location", undefined)
    } else if (response.body.message === "city not found") {
      callback("Please try valid places", undefined)
    } else {
      const max = response.body.main.temp_max - 273
      const min = response.body.main.temp_min - 273
      temperature =
        response.body.main.temp -
        273 +
        " celsius. With a high of " +
        max +
        " celsius and low of " +
        min +
        " celsius."

      rain = "There is " + response.body.clouds.all + "% chance of rain today"
      place = response.body.name
      callback(undefined, { temperature, rain, place })
    }
  })
}

module.exports = forecast
