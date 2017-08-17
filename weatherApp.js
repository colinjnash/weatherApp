
$(document).ready(function() {

   $.ajaxSetup({ cache: false });


	//Variables for url fetches...
	var locationurl = "https://ipinfo.io/json";


	// Global Variables for Weather Data
	var city = "";
	var region = "";
	var country = "";
	var temp = "";
	var currently = "";
	var wind = "";
	var pressure = "";
	var degreeSymbol = '&deg;';
	var measurements = 'metric'; //default for most countries.
	var latitude="";
	var longitude="";
	var latlong = "";
	var windDirection="";
	var sunrise= "";
	var sunset="";

	function fetchLocation() {


	$.getJSON(locationurl, function(data) {

	  city = data.city;
	  region = data.region;
	  country = data.country;
  	  var locationdata = city + ",  " + region;
  
  
  
	  $('#location').append(locationdata);
	 latlong = data.loc.split(",");
	 latitude = latlong[0];
	 longitude = latlong[1];
	  country= data.country;
	  setCountryUnits();
	  weatherData();



		});


		}
  
		function setCountryUnits() {
  		if ( country === "US" || country === "LY") {measurements ='imperial';}
  		else {measurements='metric';}
 
  
		}  


		function weatherData() {

   		var weatherurl =  "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;
  
   		$.getJSON(weatherurl, function(json) {


	   		function timeToLocal(unix) {
	   		var local = new Date(0);
	   		local.setUTCSeconds(unix);
        return local.toString().slice(16,21);
	   		}

	// Weather data defaulted for metric.

			currently = json.weather[0].main;
			temp = Math.floor(json.main.temp) + degreeSymbol + ' C ';
			tempMin= Math.floor(json.main.temp_min) + degreeSymbol + ' C ';
			tempMax= Math.floor(json.main.temp_max) + degreeSymbol + ' C ';
			pressure = 'Pressure: ' + json.main.pressure + ' mb';
			wind= 'Wind: ' + Math.floor(json.wind.speed) + ' km/h';
			windDirection = json.wind.deg + '&deg';
			sunrise = 'Sunrise:  ' +  timeToLocal(json.sys.sunrise) + ' AM' ;
			sunset = 'Sunset: ' +  timeToLocal(json.sys.sunset) + ' PM';
			$('#temperature').html(temp);
			$('#currently').html(currently);
			$('#wximg').attr("src",json.weather[0].icon);
			$('#pressure').html(pressure);
			$('#wind').html(wind);
			$('#windDir').html(windDirection);
			$('#sunrise').html(sunrise)
			$('#sunset').html(sunset);
			$('#minMax').html('Min:  ' + tempMin + '<br>' + 'Max:  ' + tempMax)

			//switch for data to imperial...some repeating code...will work on more elegant solution in future.

				if (measurements ==='imperial') {
				temp = Math.floor(json.main.temp * 9/5 +32) + degreeSymbol + ' F ';
				tempMin = Math.floor(json.main.temp_min * 9/5 +32) + degreeSymbol + ' F ';
				tempMax = Math.floor(json.main.temp_max * 9/5 +32) + degreeSymbol + ' F ';
				pressure = 'Pressure: ' + json.main.pressure /10 + " Kpa" ;
				wind = 'Wind: ' + Math.floor(json.wind.speed * 0.65) + ' mph';

				$('#temperature').html(temp);
				$('#currently').html(currently);
				$('#wximg').attr("src",json.weather[0].icon);
				$('#pressure').html(pressure);
				$('#wind').html(wind);
				$('#windDirection').html(windDirection);
				$('#minMax').html('Min:  ' + tempMin + '<br>' + 'Max:  ' + tempMax)

					}
		});





		}
 

			fetchLocation();

			$('#toggle').click(function () {

			//Could also use != signs but easier to read when same assignment operator
				if (measurements ==='metric') {
					measurements ='imperial'}
				else {measurements ='metric'};


//Callback for weatherData with new measurement standard in order to change data in AJAX flow.
				weatherData();

				});
		
});