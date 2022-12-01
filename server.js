// Require modules
const express = require('express');

const fs = require('fs') // this engine requires the fs module

// Create the Express app
const app = express();

// Configure the app (app.set)
app.engine('madeline', (filePath, options, callback) => { // define the view engine called madeline
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err)
    // this is an extremely simple view engine we'll be more complex later
    const rendered = content.toString()
      .replace('#title#', '<title>' + options.title + '</title>')
      .replace('#message#', '<h1>' + options.message + '</h1>').replace('#style#', '<h3>' + options.style + '</h3>')
      .replace('#message#', '<h1>' + options.message + '</h1>').replace('#flavors#', '<h3>' + options.flavors + '</h3>')
    return callback(null, rendered)
  })
})
app.set('views', './views') // specify the views directory
app.set('view engine', 'madeline') // register the madeline view engine


// Mount routes
app.get('/', function (req, res) {
  res.send('<h1>Welcome to Just Wing It!!</h1>')
})

app.get('/about', function (req, res) {
  res.send('<h1>Welcome to the ABOUT page.</h1>')
})

app.get('/help', function (req, res) {
  res.send('<h1>Welcome to the HELP page.</h1>')
})

app.get('/locations', function (req, res) {
  res.send('<h1>Welcome to the LOCATIONS page.</h1>')
})

app.get('/wingingit', function (req, res) {
  res.send(`<img src="https://sd.keepcalms.com/i-w600/keep-calm-and-just-wing-it.jpg" >`)
})

app.get('/bonein', (req, res) => {
  res.render('style', { title: 'Bone In Wings', message: 'Bone In Wings', style: 'Classic! Sticking with the original, I like it.' })
})

app.get('/boneless', (req, res) => {
  res.render('style', { title: 'Boneless Wings', message: 'Boneless Wings', style: 'Straight to the meat of it! No bones about it.' })
})

app.get('/mix', (req, res) => {
  res.render('style', { title: 'Mixed Wings', message: 'Mixed Wings', style: `Best of both worlds! It's nice to have options.` })
})

app.get('/saucy', (req, res) => {
  res.render('flavors', { title: 'Saucy Flavors', message: 'Here are your choices for saucy flavors:', flavors: 'Sweet BBQ</br> Spicy BBQ</br> Cajun Sting</br> Buffalo Hot</br> Mango Habanero</br> Soy Garlic' })
})

app.get('/dryrub', (req, res) => {
  res.render('flavors', { title: 'Dry Rub Flavors', message: 'Here are your choices for dry rub flavors:', flavors: 'Lemon Pepper</br> Lime Pepper</br> Garlic Parmesan</br> Cajun</br> Honey Habanero' })
})


let port = 3000
// Tell the app to listen on port 3000
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});