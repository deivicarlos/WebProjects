
//https://api.darksky.net/forecast/[key]/[latitude],[longitude]

const googeApiKey = "AIzaSyDQV1m-AHKnntgP3s8jcvZMNCbbyawyeEw";
const DarkSkyKey = "d22ee70a5d19dfc81bf5eac09e8d6e51";

var DarkSkyRequest = "https://api.darksky.net/forecast/" + DarkSkyKey + "/";
const mapsUrl = "https://maps.googleapis.com/maps/api/geocode/json";

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
    //getCityName();

    $("#btnGetLocation").click(getCityName);
  
});

//http://maps.googleapis.com/maps/api/geocode/json?latlng=33.7532358,-117.7901088&sensor=false



function getCityName(){

  var latitudeLongitude = currentLocation.lat + "," + currentLocation.lng;

  alert(latitudeLongitude);
  alert(mapsUrl);
  $.getJSON( mapsUrl, {
    latlng: latitudeLongitude,
    key: googeApiKey  
  },
  function(results){
      console.log(results);

  });
        
      
  

}


function getTemperature(){
  
  var requestUrl = DarkSkyRequest + currentLocation.lat + "," + currentLocation.lng;
  console.log(requestUrl);

  $.ajax({
        url: requestUrl,
        type: 'GET',
        cache: false,
        dataType: 'json', // added data type
        
        success: function(json) {
          currentLocation.temperature = json.currently.temperature;
          $("#weatherTemp").html(currentLocation.temperature);
        }
      
  });
  
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(savePosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function savePosition(position) {
    currentLocation.lat = position.coords.latitude;
    currentLocation.lng = position.coords.longitude; 

    $("#location").html("Latitude: " + currentLocation.lat + " Longitude: " + currentLocation.lng + " Ciudad: "+ currentLocation.city + " Pais: " );

    //codeLatLng(currentLocation.latitude, currentLocation.longitude);
}


