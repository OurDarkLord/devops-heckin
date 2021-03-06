var express = require('express');

var app = express();

//blocks header info from server
app.disable('x-powered-by');

var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

app.set('port', process.env.PORT||3000);
app.use(express.static(__dirname+'/public'));

app.get('/', function(req,res){
	res.render('home');
});

app.use(function(req,res,next){
	console.log("looking for URL:" + req.url);
	next();
});

app.get('/contact', function(req,res){
	res.render('contact')
});
app.get('/about', function(req,res){
	res.render('about');

});
app.use(function(req, res){
	res.type('text/html');
	res.status(404);
	res.render('404');
});

app.use(function(err, req,res,next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});


app.listen(app.get('port'),function(){
	console.log('Express started')
});