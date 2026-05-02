const express = require('express');
const multer = require('multer');
const upload = multer({dest: "public/uploads"});
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

const homeRoutes = require('./routes/index.routes');
const productRoutes = require('./routes/product.routes');


// connect to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'supermarket'
});

db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('🟩 Connected to database');
})

// global
global.db = db;

// Config middleware
app.set('port', process.env.port || port);
app.set('views', __dirname + '/views');
app.set('viwe engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes for the app
app.use('/', homeRoutes);
app.use('/', productRoutes);

app.listen(port, () => {
    console.log(`🟩 Server is running on PORT: ${port}`);
});


