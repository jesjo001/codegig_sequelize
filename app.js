const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/database');

// Test DB
db.authenticate()
    .then(() => console.log('Database Connected'))
    .catch(err => console.log('Error: ' + err))

const app = express();

//handlebars
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Body DB
app.use(bodyParser.urlencoded({ extended: false }))

//Set static folder
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.render('index', { layout: 'landing' }));

// Gig routes
app.use('/gigs', require('./routes/gigs'));

const PORT = process.env.port  || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT} `));

