
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
    

    $("#weatherTemp").click(updateTemperature);
/*
    $("#weatherTemp").on("click", function() {
      updateTemperature();
    });*/

    
});



function setCurrentLocation(){

}

function setLngLat(position){

  currentLocation.lat = position.coords.latitude;
  currentLocation.lng = position.coords.longitude;

  getCityName();

}
//http://maps.googleapis.com/maps/api/geocode/json?latlng=33.7532358,-117.7901088&sensor=false
function updateLocation(){
  
  //$("#location").html("Hello World!");
  if(currentLocation.city){
    $("#location").html(currentLocation.city + ", " + currentLocation.country);

  }
  //$("#weatherTemp").html(currentLocation.temperature);
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
      currentLocation.city = fields[0];
      currentLocation.country = fields[1];

      //alert(fields[0] + ", " + fields[1] + " - " + fields[2])
      $("#location").html(currentLocation.city + ", " + currentLocation.country);
      getTemperature();
    });
  }
}


function getTemperature(){
  
  var requestUrl = DarkSkyRequest + currentLocation.lat + "," + currentLocation.lng;
  console.log(requestUrl);
  /*$.getJSON(requestUrl, function(results){
      currentLocation.temperature = results.currently.temperature;
  });*/

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
      $("#weatherTemp").html(str);
      currentLocation.isCelcius = false;
      return;
  }

  str = currentLocation.temperatureC + " &#176;C";
  $("#weatherTemp").html(str);
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
  $("#weatherIcon").addClass("wi-fw");
}


