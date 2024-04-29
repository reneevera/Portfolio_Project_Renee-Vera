var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', message: 'Welcome to My Portfolio' });
});


router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Me' });
});


router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects' });
});

router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Me' });
});

router.get('/terms', function(req, res, next) {
  res.render('terms',{ title: 'Terms ' });
});

module.exports = router;
