// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
var db = require('db');
db.createDb()

var win = Titanium.UI.createWindow({  
    title:'Restarunts',
    backgroundColor:'#fff'
});

//Custom Nav Bar
var navBar = Titanium.UI.createView({
	left: 0,
	top: 0,
	height: 40,
	width: Ti.Platform.displayCaps.platformWidth,
	backgroundColor:"#999"
});
win.add(navBar);

var navTitle = Ti.UI.createLabel({
	text: "Restarunts",
	textAlign: 'center',
	top: 6,
	height: 28,
	width: 180,
	color: '#ffff',
	font: {
		fontSize: 19,
		fontWeight: 'bold',
		fontFamily: 'Helvetica Neue'
	},
});
navBar.add(navTitle);

var geoLocationIcon = Ti.UI.createImageView({
	image : 'images/geo_location.png',
	width : 40,
	height : 40,
	top : 0,
	right : 10
});
navBar.add(geoLocationIcon);

geoLocationIcon.addEventListener('click', function() {
	alert("current_location");
	getRestaruntListing({filter:"currentLocation", latitude:searchBar.value, longitude:searchBar.value});
});

var restaruntList = Titanium.UI.createTableView({
	top:83,
	backgroundColor:'transparent'
});
win.add(restaruntList);

//search bar
var searchBar = Titanium.UI.createSearchBar({
	hintText:"Enter Search Text",
    showCancel:true,
    height:43,
    top:40,
});
win.add(searchBar);

searchBar.addEventListener('cancel', function  (e) {
    searchBar.value ="";
    // hiding and showing the search bar forces it back to its non-focused appearance.
    searchBar.hide();
    searchBar.show();
});

searchBar.addEventListener('return', function  (e) {
    alert("value = "+searchBar.value);
    if(searchBar.value){
    	getRestaruntListing({filter:"search", queryText:searchBar.value});
    }
    searchBar.blur();
});
	
function getRestaruntListing(arg){
	var rowData = [];
	restaruntList.setData(rowData);	
	
	if(arg.filter){
		if(arg.filter == "search"){
			var rows = db.selectRestaruntsByQuery(arg.queryText);
		}else if(arg.filter == "currentLocation"){
			var rows = db.selectRestaruntsByLocation(arg.latitude, arg.longitude);
		}
	}else{
		var rows = db.selectRestarunts();
	}
	
		for(i=0;i<rows.length;i++){
			var row = Ti.UI.createTableViewRow({
				height:65
			});
 
            var restaruntName = Ti.UI.createLabel({
            	top:10,
            	left:5,
            	height: Ti.UI.SIZE,
            	text:rows[i].name,
            	color:'#000',
        		font:{fontsSize:14, fontWeight:"bold", fontFamily:'Helvetica Neue'},
        		textAlign:"left"
        	});
        	row.add(restaruntName);

            var restaruntAddress = Ti.UI.createLabel({
            	top:30,
            	left:5,
            	height: Ti.UI.SIZE,
            	text:rows[i].address,
            	color:'#000',
        		font:{fontsSize:14, fontFamily:'Helvetica Neue'},
        		textAlign:"left"
        	});
        	row.add(restaruntAddress);
			rowData.push(row);
	    }
	restaruntList.setData(rowData);	
}

//init
getRestaruntListing({})
	
win.open();
