require('babel/register')
var React = require('react/addons')
var express = require('express')
var app = express()
var compress = require('compression')();
var request = require('request-promise');
var env = require('node-env-file');
var Foo = require('./app/components/foo.jsx')

if(process.env.NODE_ENV == 'development') {
  try {
    env(__dirname + '/.env');
  } catch(e){}
}

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('port', (process.env.PORT || 5000));

app.use(compress);
app.use(express.static(__dirname + '/public'));
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/', function (req, res) {
  var initObject = { serverTime: Date().toString() };
  var reactElement = React.createElement(Foo, initObject);
  var reactRendered = React.renderToString(reactElement);
  res.render(
    'index',
    { title : 'Home', mainComponent: reactRendered, initObject: JSON.stringify(initObject) }
  )
});

app.listen(app.get('port'));

