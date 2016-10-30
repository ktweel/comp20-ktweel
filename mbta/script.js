var map;
var mycords;
prevStation = null;

/* Red Line station coordinates */


var stations = [
	["South Station", {lat: 42.352271, lng: -71.05524200000001}],
	["Andrew", {lat: 42.330154, lng: -71.057655}],
	["Porter Square", {lat: 42.3884, lng: -71.11914899999999}],
	["Harvard Square", {lat: 42.373362, lng: -71.118956}],
	["JFK/UMass", {lat: 42.320685, lng: -71.052391}],
	["Savin Hill", {lat: 42.31129, lng: -71.053331}],
	["Park Street", {lat: 42.35639457, lng: -71.0624242}],
	["Broadway", {lat: 42.342622, lng: -71.056967}],
	["North Quincy", {lat: 42.275275, lng: -71.029583}],
	["Shawmut", {lat: 42.29312583, lng: -71.06573796000001}],
	["Davis", {lat: 42.39674, lng: -71.121815}],
	["Alewife", {lat: 42.395428, lng: -71.142483}],
	["Kendall/MIT", {lat: 42.36249079, lng: -71.08617653}],
	["Charles/MGH", {lat: 42.361166, lng: -71.070628}],
	["Downtown Crossing", {lat: 42.355518, lng: -71.060225}],
	["Quincy Center", {lat: 42.251809, lng: -71.005409}],
	["Quincy Adams", {lat: 42.233391, lng: -71.007153}],
	["Ashmont", {lat: 42.284652, lng: -71.06448899999999}],
	["Wollaston", {lat: 42.2665139, lng: -71.0203369}],
	["Fields Corner", {lat: 42.300093, lng: -71.061667}],
	["Central Square", {lat: 42.365486, lng: -71.103802}],
	["Braintree", {lat: 42.2078543, lng: -71.0011385}]
];
var markerArray = new Array(stations.length);
var infowindows = new Array(stations.length);


function findPos(){
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            mycords = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            map.setCenter(mycords);
            findClosestStation(mycords);
            var myMarker = new google.maps.Marker({
				position: mycords,
				map: map,
				title: 'My Position',
			});
			wind = new google.maps.InfoWindow({
				content: '<p class="loc">The closest station is ' + stations[minIndex][0] +
						'.</p><p class="loc"> It is ' + minDistance + " miles away.</p>"
			});
			myMarker.addListener('click', function(){
				wind.open(map, myMarker);
				if(prevStation != null){
					infowindows[prevStation].close();
				}
			});
          }, function() {
            alert("Location Error");
          });
    } else {
          // Browser doesn't support Geolocation
          alert("Location Error - browser doesn't support geolocation");
    }
}
	
function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 42.320685, lng: -71.052391},
      zoom: 13
    });
    findPos();
    
    makeMarkers();

	var branch1 = [
		stations[11][1], stations[10][1],
		stations[2][1], stations[3][1],
		stations[20][1], stations[12][1],
		stations[13][1], stations[6][1],
		stations[14][1], stations[0][1],
		stations[7][1], stations[1][1],
		stations[4][1], stations[8][1],
		stations[18][1], stations[15][1],
		stations[16][1], stations[21][1]
    ];
	var branch2 = [
		stations[4][1], stations[5][1],
		stations[19][1], stations[9][1],
		stations[17][1]
    ];

    var path1 = new google.maps.Polyline({
      path: branch1,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    var path2 = new google.maps.Polyline({
      path: branch2,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    path1.setMap(map);
    path2.setMap(map);
}


function makeMarkers(){
	var image = 'icon.png';
	for(i = 0; i < stations.length; i++) {
		markerArray[i] = new google.maps.Marker({
			position: stations[i][1],
			map: map,
			title: stations[i][0],
			icon: image,
			infoIndex: i
		});
		infowindows[i] = new google.maps.InfoWindow({
			content: "This is " + stations[i][0]
		});
		markerArray[i].addListener('click', function(){
			// console.log(this.infoIndex);
			updateWindow(this.infoIndex);
		});
	}
}

function findClosestStation(mycords){
	minIndex = 0;
	minDistance = Infinity;

	for (i = 0; i < stations.length; i++) {
		distance = haversineDistance(mycords, stations[i][1]);
		if (distance < minDistance) {
			minDistance = distance;
			minIndex = i;
		}
	}
	var branch = [
          mycords,
          stations[minIndex][1]
    ];

    var path = new google.maps.Polyline({
      path: branch,
      geodesic: true,
      strokeColor: '#00FF00',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    path.setMap(map);

}


function haversineDistance(coords1, coords2) {
  function toRad(x) {
    return x * Math.PI / 180;
  }

  var lon1 = coords1["lng"];
  var lat1 = coords1["lat"];

  var lon2 = coords2["lng"];
  var lat2 = coords2["lat"];

  var R = 6371; // km

  var x1 = lat2 - lat1;
  var dLat = toRad(x1);
  var x2 = lon2 - lon1;
  var dLon = toRad(x2);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;

  d /= 1.60934;

  return d;
}

function updateWindow(index){
	station = index;
	request = new XMLHttpRequest();
	request.open("get", "https://stark-savannah-16303.herokuapp.com/redline.json");
	request.onreadystatechange = getRequest;
	request.send();
}
    
function getRequest() {
	if (request.readyState == 4 && request.status == 200) {
		theData = request.responseText;
		trains = JSON.parse(theData);

		braintree = [];
		ashmont = [];
		alewife = [];

		trips = trains["TripList"]["Trips"];

		for(i=0; i< trips.length; i++){
			stops = trips[i]["Predictions"];
			for(j=0; j<stops.length; j++) {
				if(stops[j]["Stop"] == stations[station][0]){

					if(trips[i]["Destination"] == "Alewife"){
						alewife.push(stops[j]);
					}
					if(trips[i]["Destination"] == "Braintree"){
						braintree.push(stops[j]);
					}
					if(trips[i]["Destination"] == "Ashmont"){
						ashmont.push(stops[j]);
					}
				}
			}
		}
		buildHTML(alewife, braintree, ashmont);
	}
}

function buildHTML(alewife, braintree, ashmont){
	newHTML = '<div id="info"><p> Upcoming trains at ' + stations[station][0];

	sortLists(alewife);
	sortLists(braintree);
	sortLists(ashmont);

	newHTML += '<div id= "destination"><p>Alewife</p></div>';
	for (i = 0; i < alewife.length; i++) {
		newHTML += "<p> Train in " + alewife[i]["Seconds"]
					 		  + " seconds </p>";
	}
	newHTML += '<div id= "destination"><p>Braintree</p></div>';
	for (i = 0; i < braintree.length; i++) {
		newHTML += "<p> Train in " + braintree[i]["Seconds"]
					 		  + " seconds </p>";
	}
	newHTML += '<div id= "destination"><p>Ashmont</p></div>';
	for (i = 0; i < ashmont.length; i++) {
		newHTML += "<p> Train in " + ashmont[i]["Seconds"]
					 		  + " seconds </p>";
	}


	if(prevStation != null){
			infowindows[prevStation].close();
				
		}
		wind.close();
		prevStation = station;
		infowindows[station].setContent(newHTML);
		infowindows[station].open(map, markerArray[station]);
		// map.setCenter(stations[station][1]);

}


function sortLists(dest) {
    	for (var i = 0; i < dest.length; i++) {
        	var tmp = dest[i]; 
        	for (var j = i - 1; j >= 0 && (dest[j]["Seconds"] > tmp["Seconds"]); j--) {
            	dest[j + 1] = dest[j];
        	}
        	dest[j + 1] = tmp;
    	}
}






