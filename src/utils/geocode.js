const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1IjoiYWtoaWxjaGVzdGVyIiwiYSI6ImNrOWZ1eG9sbzBmYWszZnFtbWJuajIyc3cifQ.rpVydBIGUcwNxTJsXwYMaw&limit=1'
  request({url: url, json: true}, (error, response) => {
      if(error) {
          callback("network not reachable", undefined)
      }
      else if(response.body.features.length === 0) {
      callback("insufficient data", undefined)
      }
      else {
          const longitude = response.body.features[0].center[0]
      const lattitude = response.body.features[0].center[1]
      const location = response.body.features[0].place_name
      
           callback(undefined ,{ longitude , lattitude, location})
  }
  })
  }

  module.exports = geoCode