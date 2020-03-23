const request = require('request')

const forecast = (latitude, longgitude, callback) => {
    const url = 'https://api.darksky.net/forecast/32c84d39063d7d36b223b78f7dda9e98/' + latitude +  ',' + longgitude
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to wrather service!', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            const currently=body.currently
            callback(undefined,body.daily.data[0].summary + ' It is currently ' + currently.temperature + ' degrees out.This high today is ' +currently.temperatureHigh + ' with low of ' + currently.temperatureLow+ ' there is a ' + currently.precipProbability + ' chance of rain.')
        }
    })
}

module.exports = forecast