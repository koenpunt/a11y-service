var express = require('express');
var app = express();
var a11y = require('a11y');
var engines = require('consolidate');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// app.set('views', __dirname + '/views');
app.engine('html', engines.hogan);
app.set('view engine', 'html');

app.get('/', function(request, response) {
  response.render('index');
});

app.get('/report/:domain', function(req, res) {

  var domain = req.params.domain;

  a11y(domain, function(err, reports) {

    if(err) {
      return res.status(400).send(err.message);
    }

    var passed = reports.audit.filter(function(el){
      return el.result === 'PASS';
    });

    var failed = reports.audit.filter(function(el){
      return el.result === 'FAIL';
    });

    var na = reports.audit.filter(function(el){
      return el.result === 'NA';
    });

    app.locals.passed = passed;
    app.locals.failed = failed;
    app.locals.na     = na;

    app.locals.domain = domain;

    res.render('report');

  });

});

app.listen(app.get('port'), function() {
  console.log('Node app is running at localhost:' + app.get('port'));
});
