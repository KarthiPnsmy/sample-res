
exports.getCurrentLocation = function() {
	Ti.Geolocation.purpose = "Recieve User Location";
	var location = undefined;
	var result = {};
	
	if (Titanium.Geolocation.locationServicesEnabled === false){
        library.config.showDialog('Turn on Location Services to Determine Your Location');
    }
    
    Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
    Titanium.Geolocation.distanceFilter = 10;
    
    Titanium.Geolocation.getCurrentPosition(function(e) {
    	
        if (!e.success || e.error) {
            return;
        }   
        var longitude = e.coords.longitude;
        var latitude = e.coords.latitude;
        var altitude = e.coords.altitude;
        var heading = e.coords.heading;
        var accuracy = e.coords.accuracy;
        var speed = e.coords.speed;
        var timestamp = e.coords.timestamp;
        var altitudeAccuracy = e.coords.altitudeAccuracy;
        result.latitude = latitude;
        result.longitude = longitude;   
        Ti.App.CurrentLatitude = latitude;
		Ti.App.Currentlongitude = longitude;
        Titanium.API.info('geo - current location: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);
    });
    
    var locationCallback = function(e) {
    	
        if (!e.success || e.error) {
            return;
        }

        var longitude = e.coords.longitude;
        var latitude = e.coords.latitude;
        var altitude = e.coords.altitude;
        var heading = e.coords.heading;
        var accuracy = e.coords.accuracy;
        var speed = e.coords.speed;
        var timestamp = e.coords.timestamp;
        var altitudeAccuracy = e.coords.altitudeAccuracy;
        result.latitude = latitude;
        result.longitude = longitude;
        Ti.App.CurrentLatitude = latitude;
		Ti.App.Currentlongitude = longitude;
        Titanium.API.info('geo - location updated: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);       
    };
    Titanium.Geolocation.addEventListener('location', locationCallback);
    
    return result;
};


Number.prototype.toDeg = function() {
    return this * 180 / Math.PI;
}

Number.prototype.toRad = function() {
    return this * Math.PI / 180;
}
	

exports.getDistance = function(lat1,lon1,lat2,lon2){
	/*
	var lat1,lon1,lat2,lon2;
	lat1=40.28;
	lon1=-74.82;
	lat2=40.17;
	lon2=-47.12
	*/
	var R = 6371; // km
	var dLat = (lat2-lat1).toRad();
	var dLon = (lon2-lon1).toRad();
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
	Math.sin(dLon/2) * Math.sin(dLon/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c;
	
	alert("km " + d);
	alert("miles " + d/1.609344);
}

