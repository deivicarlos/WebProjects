
//https://api.darksky.net/forecast/[key]/[latitude],[longitude]

const googeApiKey = "AIzaSyDQV1m-AHKnntgP3s8jcvZMNCbbyawyeEw";
const DarkSkyKey = "d22ee70a5d19dfc81bf5eac09e8d6e51";

var DarkSkyRequest = "https://api.darksky.net/forecast/" + DarkSkyKey + "/";
const mapsUrl = "https://maps.googleapis.com/maps/api/geocode/json?sensor=false";

var currentLocation = {
  lng: "",
  lat: "",
  country: "",
  city: "",
  temperatureF: 0,
  temperatureC: 0,
  isCelcius: false,
  icon: ""
}

    
$(document).ready(function(){
  
    geocoder = new google.maps.Geocoder();
    getLocation();
    
    writeMainPage();
    $("#weatherTemp").click(updateTemperature);

});


function setLngLat(position){

  currentLocation.lat = position.coords.latitude;
  currentLocation.lng = position.coords.longitude;

  getCityName();

}


function getCityName(){

  var latitudeLongitude = currentLocation.lat + "," + currentLocation.lng;
  
  if(latitudeLongitude){
    
    $.getJSON( mapsUrl, {
    latlng: latitudeLongitude
    //key: googeApiKey  
    },
    function(results){
      var result = results.results[3].formatted_address;
      var fields = result.split(",");
      var str = "";

      currentLocation.city = fields[0];
      currentLocation.country = fields[1];

      //alert(fields[0] + ", " + fields[1] + " - " + fields[2])
      //$("#location").html(currentLocation.city + ", " + currentLocation.country);
      str = currentLocation.city + ", " + currentLocation.country;
      writeHtml("#location", str);
      getTemperature();
    });
  }
}


function getTemperature(){
  
  var requestUrl = DarkSkyRequest + currentLocation.lat + "," + currentLocation.lng;

  $.ajax({
        url: requestUrl,
        type: 'GET',
        cache: false,
        dataType: 'jsonp', // added data type
        
        success: function(json) {
          currentLocation.temperatureF = json.currently.temperature.toFixed(1);
          currentLocation.temperatureC = ((currentLocation.temperatureF - 32)/1.8).toFixed(1);
          
          updateTemperature();
          setWeatherIcon(json.currently.icon);
        }
      
  })
  
}

function updateTemperature(){

  var str = "";
  
  if(currentLocation.isCelcius){
      
      str = currentLocation.temperatureF + " &#176;F";
      //$("#weatherTemp").html(str);
      writeHtml("#weatherTemp", str);
      currentLocation.isCelcius = false;
      return;
  }

  str = currentLocation.temperatureC + " &#176;C";
  //$("#weatherTemp").html(str);
  writeHtml("#weatherTemp", str);
  currentLocation.isCelcius = true;

}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setLngLat);
        
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function setWeatherIcon(ex){

  switch(ex){
    case "clear-day":
      //setHtmlClass("#weatherIcon", "wi wi-day-sunny");
      $("#weatherIcon").addClass("wi wi-day-sunny");
      break;

    case "clear-night":
      $("#weatherIcon").addClass("wi wi-night-clear");
      break;

     case "rain":
      $("#weatherIcon").addClass("wi wi-rain");
      break;

    case "snow":
      $("#weatherIcon").addClass("wi wi-snow");
      break;

    case "sleet":
      $("#weatherIcon").addClass("wi wi-sleet");
      break;

    case "wind":
      $("#weatherIcon").addClass("wi wi-windy");
      break;

    case "fog":
      $("#weatherIcon").addClass("wi wi-fog");
      break;

    case "cloudy":
      $("#weatherIcon").addClass("wi wi-cloudy");
      break;

    case "partly-cloudy-day":
      $("#weatherIcon").addClass("wi wi-day-cloudy");
      break;

    case "partly-cloudy-night":
      $("#weatherIcon").addClass("wi wi-night-alt-cloudy");
      break;

    default:
      $("#weatherIcon").addClass("wi wi-day-cloudy");
      break;
  }

}


function writeHtml(id, str){

  $(id).animate({
          opacity: 0
          }, 500, function(){
            $(this).animate({
              opacity: 1
              }, 500);
          $(id).html(str);
  });
}

function setHtmlClass(id, str){

  $(id).animate({
      opacity: 0
          }, 500, function(){
            $(this).animate({
              opacity: 1
              }, 500);
          $(id).addClass(str);
  });
}


function clock() {// We create a new Date object and assign it to a variable called "time".

var str = "";
var time = new Date(),
    
    // Access the "getHours" method on the Date object with the dot accessor.
    hours = time.getHours(),
    
    // Access the "getMinutes" method with the dot accessor.
    minutes = time.getMinutes(),
    
    
    seconds = time.getSeconds();


str = "Current time: " + harold(hours) + ":" + harold(minutes) + ":" + harold(seconds);
//console.log(str);
//writeHtml("#clock", str);
$("#clock").html(str);  

  function harold(standIn) {
    if (standIn < 10) {
      standIn = '0' + standIn
    }
    return standIn;
  }
}
setInterval(clock, 1000);

function writeMainPage(){
  writeHtml("#title", "Local Weather App");
  writeHtml("#by", "by");
  writeHtml("#signatureName", "Carlos Garcia");

  
}

