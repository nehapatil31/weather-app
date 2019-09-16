const path = require('path')


const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: "Neha Patil"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: "Neha Patil"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: "Neha Patil"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address.'
        })
    }
    //Find location and weather 
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            //Send back data
            res.send({
                address: req.query.address,
                location: data.location,
                forecast: forecastData
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('error', {
        error: 'Help article not found',
        name: 'Neha Patil'
    });
})
app.get('*', (req, res) => {
    res.render('error', {
        error: 'My 404 page',
        name: 'Neha Patil'
    });
})

app.listen(port, () => {
    console.log("Server is up on port " + port + ".")
})