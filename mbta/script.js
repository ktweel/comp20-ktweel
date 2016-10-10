var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 42.352271, lng: -71.05524200000001},
      zoom: 10
    });
    var image = 'icon.png';
    var marker = new google.maps.Marker({
		position: {lat: 42.352271, lng: -71.05524200000001},
		map: map,
		title: 'South Station',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: {lat: 42.330154, lng: -71.057655},
		map: map,
		title: 'Andrew',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: {lat: 42.3884, lng: -71.11914899999999},
		map: map,
		title: 'Porter Square',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: {lat: 42.373362, lng: -71.118956},
		map: map,
		title: 'Harvard Square',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: {lat: 42.320685, lng: -71.052391},
		map: map,
		title: 'JFK/UMASS',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: {lat: 42.31129, lng: -71.053331},
		map: map,
		title: 'Savin Hill',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: {lat: 42.35639457, lng: -71.0624242},
		map: map,
		title: 'Park Street',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: {lat: 42.342622, lng: -71.056967},
		map: map,
		title: 'Broadway',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: {lat: 42.275275, lng: -71.029583},
		map: map,
		title: 'North Quincy',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: {lat: 42.29312583, lng: -71.06573796000001},
		map: map,
		title: 'Shawmut',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: {lat: 42.39674, lng: -71.121815},
		map: map,
		title: 'Davis',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: {lat: 42.395428, lng: -71.142483},
		map: map,
		title: 'Alewife',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: {lat: 42.36249079, lng: -71.08617653},
		map: map,
		title: 'Kendall/MIT',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: {lat: 42.361166, lng: -71.070628},
		map: map,
		title: 'Charles/MGH',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: {lat: 42.355518, lng: -71.060225},
		map: map,
		title: 'Downton Crossing',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: {lat: 42.251809, lng: -71.005409},
		map: map,
		title: 'Quincy Center',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: {lat: 42.233391, lng: -71.007153},
		map: map,
		title: 'Quincy Adams',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: {lat: 42.284652, lng: -71.06448899999999},
		map: map,
		title: 'Ashmont',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: {lat: 42.2665139, lng: -71.0203369},
		map: map,
		title: 'Wollaston',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: {lat: 42.300093, lng: -71.061667},
		map: map,
		title: 'Fields Corner',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: {lat: 42.365486, lng: -71.103802},
		map: map,
		title: 'Central Square',
		icon: image
	});
	var marker = new google.maps.Marker({
		position: {lat: 42.2078543, lng: -71.0011385},
		map: map,
		title: 'Braintree',
		icon: image
	});

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
	var branch1 = [
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















