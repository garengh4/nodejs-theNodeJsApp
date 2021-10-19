const request = require('request')

const geocode = (address, callback) =>{
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ2FyZW5naDQiLCJhIjoiY2t1c3RyeWhkMDc4OTJxcDZkYzYzOWVuYiJ9.j6l74ugRH9qVpUlaZjNR2g&limit=1'
    request( {url: geoUrl, json:true }, (error, { body }) => {
        if (error){
            callback('Error: unable to connect to location services...', undefined)
        } else if (body.features.length === 0) {
            callback('Error: why are you typing nonsence? Please try again.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name

            })
        }
    })
}


module.exports = geocode;