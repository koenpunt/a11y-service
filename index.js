var express = require('express');
var app = express();
var a11y = require('a11y');
var engines = require('consolidate');
var _ = require('underscore');

var partials = { layout: 'layout' };

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/app/views');
app.engine('html', engines.hogan);
app.set('view engine', 'html');

app.get('/', function(request, response) {
  response.render('index', { partials: _.clone(partials) });
});

app.get(/^\/report\/(.+)/, function(req, res) {

  var url = req.params[0];

  a11y(url, function(err, reports) {

    if(err) {
      return res.status(400).send(err.message);
    }

    var passed = reports.audit.filter(function(el) {
      return el.result === 'PASS';
    });

    var failed = reports.audit.filter(function(el) {
      return el.result === 'FAIL';
    });

    var na = reports.audit.filter(function(el) {
      return el.result === 'NA';
    });

    res.render('report', {
      partials: _.clone(partials),
      passed  : passed,
      failed  : failed,
      na      : na,
      url     : url
    });

  });

});

app.listen(app.get('port'), function() {
  console.log('Node app is running at localhost:' + app.get('port'));
});
