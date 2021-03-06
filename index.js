var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.get('/', function(req, res){
	res.sendFile(__dirname+'/index.html');
});

app.get('/LocalWeatherApp', function(req, res){
	res.sendFile(__dirname+'/LocalWeatherApp/index.html');
});
 
app.listen(process.env.PORT || 3000, function(){
	console.log("App running on http://localhost:3000")
}); 
