var DarkSkyKey = "d22ee70a5d19dfc81bf5eac09e8d6e51";
var DarkSkyRequest = "https://api.darksky.net/forecast/" + DarkSkyKey + "/";

//google api key AIzaSyDQV1m-AHKnntgP3s8jcvZMNCbbyawyeEw
//https://maps.googleapis.com/maps/api/js?key=AIzaSyDQV1m-AHKnntgP3s8jcvZMNCbbyawyeEw&callback=initMap
var geocoder;
var currentLocation = {
  longitude: "",
  latitude: "",
  country: "",
  city: "",
  temperature: 0
}

$(document).ready(function(){
  console.log("Document ready");
                 getGeoLocation();
  $("#btnGetLocation").click(tempAxio);
                  });


//http://maps.googleapis.com/maps/api/geocode/json?latlng=33.7532358,-117.7901088&sensor=false

/*function tempAxio(){
 console.log("tempaxio");
  axios.get('http://maps.googleapis.com/maps/api/geocode/json',
  {
      params:{
        key : 'AIzaSyDQV1m-AHKnntgP3s8jcvZMNCbbyawyeEw',
        latlng : '33.7532358,-117.7901088'
      }
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log("Inside catch");
    console.log(error.toString());
  });
 console.log("End function");
}
*/

function getGeoLocation(){
  geocoder = new google.maps.Geocoder();
  
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

  } else{
    console.log("Geolocation is not supported in this browser");
  }
  function showPosition(position) {
    console.log( "Latitude: " + position.coords.latitude + 
    " Longitude: " + position.coords.longitude) 
}
}




function geoSuccess(position){
  currentLocation.longitude = position.coords.longitude;
  currentLocation.latitude = position.coords.latitude;
  //codeLatLng(currentLocation.latitude, currentLocation.longitude)
  getTemperature();
  
  $("#location").html("Latitude: " + currentLocation.latitude + " Longitude: " + currentLocation.longitude + " Ciudad: "+ currentLocation.city + " Pais: " );
  //console.log(currentLocation.longitude);
 // console.log( "Latitude: " + position.coords.latitude + 
   // " Longitude: " + position.coords.longitude) 
}

function geoError(){
 // alert("Geo location failed");
}

function codeLatLng(lat, lng) {

    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        currentLocation.city = results[0].address_components[2].long_name;
        currentLocation.country = results[0].address_components[4].long_name;
        getTemperature;
        }
      else {
        alert("Geocoder failed due to: " + status);
      }
    });
}

function getTemperature(){
  var URL = DarkSkyRequest + currentLocation.latitude + "," + currentLocation.longitude;
  
  console.log("Inside getTemperature");
  console.log(URL);
  
  $.getJSON(URL, function(forecast) {
    console.log(forecast.latitude);
  });
}