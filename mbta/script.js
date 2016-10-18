var map;
var mycords;

/* Red Line station coordinates */


var stations = [
	["South Station", {lat: 42.352271, lng: -71.05524200000001}],
	["Andrew", {lat: 42.330154, lng: -71.057655}],
	["Porter Square", {lat: 42.3884, lng: -71.11914899999999}],
	["Harvard Square", {lat: 42.373362, lng: -71.118956}],
	["JFK/UMAS", {lat: 42.320685, lng: -71.052391}],
	["Savin Hill", {lat: 42.31129, lng: -71.053331}],
	["Park Street", {lat: 42.35639457, lng: -71.0624242}],
	["Broadway", {lat: 42.342622, lng: -71.056967}],
	["North Quincy", {lat: 42.275275, lng: -71.029583}],
	["Shawmut", {lat: 42.29312583, lng: -71.06573796000001}],
	["Davis Square", {lat: 42.39674, lng: -71.121815}],
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

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }

function findPos(){
	// var infoWindow = new google.maps.InfoWindow({map: map});
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            mycords = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            // infoWindow.setPosition(mycords);
            // infoWindow.setContent('Location found.');
            map.setCenter(mycords);
            findClosestStation(mycords);
            var myMarker = new google.maps.Marker({
				position: mycords,
				map: map,
				title: 'My Position',
			});
			var wind = new google.maps.InfoWindow({
				content: "The closest station is " + stations[minIndex][0] +
						". It is " + minDistance + " miles away."
			});
			myMarker.addListener('click', function(){
			//var wind = infowindows[i];
				wind.open(map, myMarker);
			});
            // console.log('1');
            // console.log(mycords);
          }, function() {
            // handleLocationError(true, infoWindow, map.getCenter());
          });
    } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
    }
}
	
function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 42.320685, lng: -71.052391},
      zoom: 12
    });
    findPos();
    
    makeMarkers();

	var branch1 = [
          {lat: 42.395428, lng: -71.142483},
          {lat: 42.39674, lng: -71.121815},
          {lat: 42.3884, lng: -71.11914899999999},
          {lat: 42.373362, lng: -71.118956},
          {lat: 42.365486, lng: -71.103802},
          {lat: 42.36249079, lng: -71.08617653},
          {lat: 42.361166, lng: -71.070628},
          {lat: 42.35639457, lng: -71.0624242},
          {lat: 42.355518, lng: -71.060225},
          {lat: 42.352271, lng: -71.05524200000001},
          {lat: 42.342622, lng: -71.056967},
          {lat: 42.330154, lng: -71.057655},
          {lat: 42.320685, lng: -71.052391},
          {lat: 42.275275, lng: -71.029583},
          {lat: 42.2665139, lng: -71.0203369},
          {lat: 42.251809, lng: -71.005409},
          {lat: 42.233391, lng: -71.007153},
          {lat: 42.2078543, lng: -71.0011385}
    ];
	var branch2 = [
          {lat: 42.320685, lng: -71.052391},
          {lat: 42.31129, lng: -71.053331},
          {lat: 42.300093, lng: -71.061667},
          {lat: 42.29312583, lng: -71.06573796000001},
          {lat: 42.284652, lng: -71.06448899999999}
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
			//var wind = infowindows[i];
			console.log(this.infoIndex);
			updateWindow(this.infoIndex);
			//infowindows[this.infoIndex].open(map, markerArray[this.infoIndex]);
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
	// console.log(stations[minIndex][0]);
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
	console.log("trying to update");
	console.log(index);
	request = new XMLHttpRequest();
	request.open("get", "https://rocky-taiga-26352.herokuapp.com/redline.json");
	request.onreadystatechange = getRequest;
	request.send();
	// console.log(newHTML);
	// infowindows[i].setContent('');
}
    
function getRequest() {
	/*console.log("ready state" + request.readyState);
	console.log("The data is =>" + request.responseText);
	console.log(request.responseText);*/
	// console.log(station);
	console.log("here");
	if (request.readyState == 4 && request.status == 200) {
		console.log("in readyState");
		// console.log(request.responseText);
		theData = request.responseText;
		trains = JSON.parse(theData);
		newHTML = "";

		console.log(trains);

		console.log(trains["TripList"]["Trips"][0]["Destination"]);

		newHTML = "train to " + trains["TripList"]["Trips"][0]["Destination"] + 
			      " at station " + trains["TripList"]["Trips"][0]["Predictions"][0]["Stop"] + 
			      " in " + trains["TripList"]["Trips"][0]["Predictions"][0]["Seconds"];
		console.log(newHTML);
		console.log(station);
		// infowindows[i].setContent(newHTML);
		// infowindows[i].open(map, markerArray[i]);
		

	}
}
    /*
    var marker = new google.maps.Marker({
		position: south,
		map: map,
		title: 'South Station',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: andrew,
		map: map,
		title: 'Andrew',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: porter,
		map: map,
		title: 'Porter Square',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: harvard,
		map: map,
		title: 'Harvard Square',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: jfk,
		map: map,
		title: 'JFK/UMASS',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: savin,
		map: map,
		title: 'Savin Hill',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: park,
		map: map,
		title: 'Park Street',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: broadway,
		map: map,
		title: 'Broadway',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: nquincy,
		map: map,
		title: 'North Quincy',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: shawmut,
		map: map,
		title: 'Shawmut',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: davis,
		map: map,
		title: 'Davis',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: alewife,
		map: map,
		title: 'Alewife',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: kendall,
		map: map,
		title: 'Kendall/MIT',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: charles,
		map: map,
		title: 'Charles/MGH',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: dtwncrossing,
		map: map,
		title: 'Downton Crossing',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: qcenter,
		map: map,
		title: 'Quincy Center',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: qadams,
		map: map,
		title: 'Quincy Adams',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: ashmont,
		map: map,
		title: 'Ashmont',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: wollaston,
		map: map,
		title: 'Wollaston',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: fieldscorner,
		map: map,
		title: 'Fields Corner',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: central,
		map: map,
		title: 'Central Square',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: braintree,
		map: map,
		title: 'Braintree',
		icon: image
	});
	
	*/








