const path= require('path')
const express = require('express')
const hbs= require('hbs')
const geocode = require('./utils/geocode')
const forecast= require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath= path.join(__dirname, '../public')
const viewsPath=  path.join(__dirname,'../templates/views' )
const partialsPath= path.join(__dirname, '../templates/partials')


// Setup handelebars engine and view location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

 //Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Afek Lev'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'Afek Lev!'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        message: 'if you need help try...',
        title: 'Help',
        name: 'Afek'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a search term of address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send(error)
        }
        forecast(latitude, longitude, (error, forcecastData) => {
            if(error){
                return res.send(error)
            }
            res.send({
                forcast: forcecastData, 
                location, 
                address: req.query.address
            })
        })
    })  

})

app.get('/products', (req,res) => {
    if(!req.query.search){
       return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        productes: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: '404',
        name: 'afek lev',
        errorMessage: 'Not found Help page'
    })

})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'afek lev',
        errorMessage: '404: Not found page'   
    })
})



app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})