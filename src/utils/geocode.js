const request = require('request')

const geocode = (address, callback) => {
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYWZla2xldjU1IiwiYSI6ImNrN3ltOHVrNDAzZ3czZnA5dThhaXpjbzAifQ.ZyAu8ycKlrj2dDHF0o1qGA&limit=1'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback({error:'Unable to connect to location services!'},undefined)
        }else if(body.features.length === 0){
            callback({error:'Unable to find location, Try Another search'}, undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports =geocode