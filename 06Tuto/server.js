const express = require('express');
const app = express();
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');
const PORT = process.env.PORT || 3500;

// Custom Middleware Logger
// app.use((req, res, next) => {
//     logEvents(`${req.method} \t ${req.header.origin} \t ${req.url}`, 'reqLog.txt');
//     console.log(`${req.method} ${req.path}`);
//     next();
// })

// OR

app.use(logger);

// Cross Origin Resource Sharing
const whiteList = ['https://www.google.com', 'http://127.0.0.1:3000', 'http://localhost:3500'];
const corsOptions = {
    origin: (origin, callback) => {
        if(whiteList.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

// Built-in Middleware to handle urlcoded data(form data)
app.use(express.urlencoded({ extended: false}));

// Built-In Middleware to handle json
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '/public')));

app.get('/$|/index(.html)?', (req, res) => {
     res.sendFile('./views/index.html', {root: __dirname})
    // OR
    // res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));   
});

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, './new-page.html')
});


// Route Handlers
app.get('/hello(.html)?', (req, res, next) => {
    console.log("attempted to load hello.html");
    next();
}, (req, res) => { 
    res.send('Hello World!');
})


// Chaining Route handlers
const one = (req, res, next) => {
    console.log('one');
    next();
}

const two = (req, res, next) => {
    console.log(two);
    next();
}

const three = (req, res) => {
    console.log('three');
    res.send('Finished!');
}

app.get('/chain(.html)?', [one, two, three]);

app.all('*', (req, res) => {

    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.sendFile({ error: '404 Not Found!!!' });
    } else {
        res.type('txt').send("404 Not Found!!!")
    }
});

app.use(() => errorHandler);


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
    