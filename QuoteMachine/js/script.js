var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=33.7532358,-117.7901088&sensor=false";
var color = "";

$(document).ready(function(){
  ex();
  getQuote();
  $("#quoteButton").click(getQuote);
});

var ex = function (){
   console.log("test");   
   $.getJSON(url, function(data){
        console.log(data);
      });
   
  }

function getQuote(){
  
  $.ajax({
        url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
        type: 'GET',
        cache: false,
        dataType: 'json', // added data type
        success: function(json) {
          var post = json.shift();
          color = Math.floor(Math.random()* colors.length);
          
          $("#quote").animate({
          opacity: 0
          }, 500, function(){
            $(this).animate({
              opacity: 1
              }, 500);
          $('#quote').html("&quot;" + post.content.replace('<p>','').replace("<\/p>\n", "") + "&quot;");
            changeColor(color);
        });

      $("#author").animate({
          opacity: 0
        }, 1000,
        function() {
          $(this).animate({
            opacity: 1
          }, 500);
          $('#author').html(post.title);
          changeColor(color);
        });
        }
      
  });
  
}


function changeColor(color){
       
  $("body").css({
        backgroundColor: colors[color]
        //color: colors[color+1]
      });
  
  $("#quoteButton").css({
        "background-color": shadeColor2(colors[color],0.7),
    "border-color": shadeColor2(colors[color],0.3),
    "color": shadeColor2(colors[color],0.2),
        //color: colors[color]
      });
      
   $("#quoteContainer").css({
     "border-color": shadeColor2(colors[color],0.8),
     
        //color: colors[color]
      });
   $("#author").css({
        "color" : shadeColor2(colors[color],0.1)
        //color: colors[color]
      });
  $("#quote").css({
        "color" : shadeColor2(colors[color],0.1)
        //color: colors[color]
      });
  
}

function shadeColor2(color, percent) {   
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}
