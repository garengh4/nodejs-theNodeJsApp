const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utilities/geocode')
const forecast = require('./utilities/forecast')

const app = express()
const port = process.env.PORT || 3000 //process.env allows heroku to set its own port number

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(path.join(publicDirectoryPath)))

//dynamic content
app.get('', (req,res) =>{
    res.render('index', {
        title: 'The nodeJs App',
        name: 'Garen'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Garen'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        helpText: 'This is some helpful text',
        title:'Help',
        name: 'Garen'
    })
})


app.get('/weather', (req,res) =>{
    if( !req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude ,longitude , location}= {}) =>{  // destructuring is confusing...
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
                latitude,
                longitude
            })
        })
    })
})






app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
} )

app.get('/help/*',(req, res) =>{
    res.render('404', {
        title: 'Error 404',
        name: 'kitty-chan',
        errMsg: 'Help article not found.'
    })
})

app.get('*', (req,res) =>{
    res.render('404',{
        title: 'Error 404', //header and footer triggered by 404.hbs needs it
        name: 'kitty-chan',
        errMsg: 'Page not found.'
    })

})

app.listen(port, () => {
    console.log('server is running at port '+port)
})