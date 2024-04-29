var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs'); // Import fs module for file operations

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// This is to manage the middleware 
var expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Middleware to parse POST request body
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Handle POST request for the FORM submission
app.post('/', (req, res) => {
    // Access form data from req.body
    const formData = req.body;
    
    // Convert form data to formatted JSON
    const jsonData = JSON.stringify(formData, null, 2);

    // Save data to a JSON file coming from the contac me FORM
    fs.writeFile('formData.json', jsonData, (err) => {
        if (err) {
            console.error('Error saving data:', err);
            res.status(500).send('Internal server error');
            return;
        }

        // Redirect user to home page after saving data
        res.redirect('/about');
    });
});

// catch 404 and forward to error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    title: 'Error', // Make sure to pass a title here
    message: err.message
  });
});

module.exports = app;
