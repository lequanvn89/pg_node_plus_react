require('babel-core/register');

var express = require('express'),
    app = express(),
    React = require('react'),
    ReactDOM = require('react-dom/server.js'),
    components = require('./public/components.jsx');

var HelloMessage = React.createFactory(components.HelloMessage);


app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.render('index', {
        react: ReactDOM.renderToString(HelloMessage({name: "John"}))
    })
});

app.get('/name', function(req, res){
    res.send("Paul, " + new Date().toString())
});

app.listen(3001, function() {
    console.log('Listening on port 3001...')
});
