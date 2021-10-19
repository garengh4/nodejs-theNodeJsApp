const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const forecastUrl = 'http://api.weatherstack.com/current?access_key=8d5be6a083a976e060207cb823145b82&query=' +latitude+','+longitude
    request({ url: forecastUrl, json: true }, (error, { body }) => {
        if (error) {
            callback('Error: unable to connect to services.', undefined)
        } else if (body.error === 0) {
            callback('Error: unable to find your location. Please try another city.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + 'oC in ' + body.location.name + ' with a uv index of ' + body.current.uv_index )
        }

    })
}
module.exports = forecast   