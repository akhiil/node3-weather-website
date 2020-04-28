const request = require ('request')

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (address, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' +address+ '&APPID=316460bd228149c7f13d818ffd92929d'
    request({url: url, json: true}, (error, response)=> {
  if(error) {
      callback('unable to reach data', undefined)
  }
  else if(response.body.message === 'city not found') {
    callback('could not find ur proper search', undefined)
  }
  else{
      temperature = response.body.main.temp - 273 + ' celsius'
      rain = 'there is ' + response.body.clouds.all + '% chance of rain today'
      place = response.body.name
      callback(undefined , {temperature, rain, place })
  }
    })
}

module.exports = forecast