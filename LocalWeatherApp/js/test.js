
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
  temperature: 0
}




$(document).ready(function(){
  
    geocoder = new google.maps.Geocoder();
    getLocation();
    

    $("#btnGetLocation").click( function() {
    //  getCityName();
      //updateLocation(); 
    });
  
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
    $("#location").html(currentLocation.city + " " + currentLocation.country);

  }
  //$("#weatherTemp").html(currentLocation.temperature);
}

function getCityName(){

  var latitudeLongitude = currentLocation.lat + "," + currentLocation.lng;
  console.log(latitudeLongitude);
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
      $("#location").html(currentLocation.city + " " + currentLocation.country);
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
          currentLocation.temperature = json.currently.temperature;
          $("#weatherTemp").html(currentLocation.temperature);
        }
      
  })
  
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setLngLat);
        
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

/*function savePosition(position) {

  currentLocation.lat = position.coords.latitude;
  currentLocation.lng = position.coords.longitude;
  
  $("#location").html("Latitude: " + currentLocation.lat + " Longitude: " + currentLocation.lng + " Ciudad: "+ currentLocation.city + " Pais: " );
}
*/

