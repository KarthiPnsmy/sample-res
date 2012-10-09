// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
var db = require('db');
var utility = require('utils');
Ti.App.selectedItem = [];
var categoryWin = require('ui/menuCategoryList');
var reservationWin = require('ui/reservation');
db.createDb()
Ti.App.Properties.setList('checkedOutList', []);

var win = Titanium.UI.createWindow({
	navBarHidden:true,
	exitOnClose:true,
	backgroundColor : '#fff',
	windowSoftInputMode : Ti.UI.Android.SOFT_INPUT_ADJUST_PAN
});

//Custom Nav Bar
var navBar = Titanium.UI.createView({
	left : 0,
	top : 0,
	height : 40,
	width : Ti.Platform.displayCaps.platformWidth,
	backgroundColor : "#999"
});
win.add(navBar);

var navTitle = Ti.UI.createLabel({
	text: "Restaurants",
	textAlign : 'center',
	top : 6,
	height : 28,
	width : 180,
	color : '#ffff',
	font : {
		fontSize : 19,
		fontWeight : 'bold',
		fontFamily : 'Helvetica Neue'
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
	//alert("current_location");
	//utility.getCurrentLocation();
	//utility.getDistance(13.060422, 80.249583, 13.067745, 80.227028);
	Ti.App.fireEvent('show_indicator');
	setTimeout(function() {
		alert("Your current possition 13.060422, 80.249583")
		Ti.App.fireEvent('hide_indicator');
		getRestaruntListing({
			filter : "currentLocation"
		});
	}, 4000);
});

//search bar
var searchBar = Titanium.UI.createSearchBar({
	hintText : "Enter Search Text",
	showCancel : true,
	height : 43,
	top : 40,
});

searchBar.addEventListener('cancel', function(e) {
	searchBar.value = "";
	// hiding and showing the search bar forces it back to its non-focused appearance.
	searchBar.hide();
	searchBar.show();
	searchBar.blur();
});

/*
 searchBar.addEventListener('return', function  (e) {
 alert("value = "+searchBar.value);
 if(searchBar.value){
 getRestaruntListing({filter:"search", queryText:searchBar.value});
 }
 searchBar.blur();
 });
 */

var restaruntList = Titanium.UI.createTableView({
	top : 40,
	search : searchBar,
	filterAttribute : 'searchText',
	backgroundColor : 'transparent'
});
win.add(restaruntList);

restaruntList.addEventListener('click', function(e) {
	if(e.source.bookTabel){
		var window = reservationWin.reservation(e.rowData.searchText);
		window.open({navBarHidden:true, modal:true});
	}else{
		if(e.rowData.restaruntId){
			var window = categoryWin.menuCategoryList();
			window.open({navBarHidden:true, modal:true});
			//window.open();
		}
	}
});


function getRestaruntListing(arg) {
	var rowData = [];
	restaruntList.setData(rowData);

	if (arg.filter) {
		if (arg.filter == "currentLocation") {
			var rows = db.selectRestaruntsByLocation(Ti.App.CurrentLatitude, Ti.App.Currentlongitude);
		}
	} else {
		var rows = db.selectRestarunts();
	}

	for ( i = 0; i < rows.length; i++) {
		var row = Ti.UI.createTableViewRow({
			height : 90,
			searchText : rows[i].name,
			restaruntId: rows[i].id
		});

		var restaruntName = Ti.UI.createLabel({
			top : 10,
			left : 5,
			height : Ti.UI.SIZE,
			text : rows[i].name,
			color : '#000',
			font : {
				fontsSize : 14,
				fontWeight : "bold",
				fontFamily : 'Helvetica Neue'
			},
			textAlign : "left"
		});
		row.add(restaruntName);

		var restaruntAddress = Ti.UI.createLabel({
			top : 30,
			left : 5,
			height : Ti.UI.SIZE,
			text : rows[i].address,
			color : '#000',
			font : {
				fontsSize : 14,
				fontFamily : 'Helvetica Neue'
			},
			textAlign : "left"
		});
		row.add(restaruntAddress);
    
	    var bookTabelButton = Ti.UI.createButton({
	    	title:"Book Tabel",
	    	top:55,
	    	width:120,
	    	height:30,
	    	left:5,
	    	bookTabel:"yes"
	    });
		row.add(bookTabelButton);
	
		rowData.push(row);
	}
	restaruntList.setData(rowData);
}

//init
getRestaruntListing({})


win.addEventListener('focus', function(e) {
	Ti.UI.Android.hideSoftKeyboard();
});
win.open();
Ti.UI.Android.hideSoftKeyboard();

//
//  CREATE CUSTOM LOADING INDICATOR
//
var indWin = null;
var actInd = null;

function showIndicator() {
	if (Ti.Platform.osname != 'android') {
		// window container
		indWin = Titanium.UI.createWindow({
			height: Ti.Platform.displayCaps.platformHeight,
			width: Ti.Platform.displayCaps.platformWidth
		});

		// black view
		var wrappr = Titanium.UI.createView({
			height: Ti.Platform.displayCaps.platformHeight,
			width: Ti.Platform.displayCaps.platformWidth,
			backgroundColor: '#000',
			opacity: 0.4
		});
		indWin.add(wrappr);

		// black view
		var indView = Titanium.UI.createView({
			height: 150,
			width: 150,
			backgroundColor: '#000',
			borderRadius: 10,
			opacity: 0.8
		});
		indWin.add(indView);
	}

	// loading indicator
	actInd = Titanium.UI.createActivityIndicator({
		style: Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
		height: 30,
		width: 30
	});

	if (Ti.Platform.osname != 'android') {
		indWin.add(actInd);

		// message
		var message = Titanium.UI.createLabel({
			text: 'Loading',
			color: '#fff',
			width: 'auto',
			height: 'auto',
			font: {
				fontSize: 20,
				fontWeight: 'bold'
			},
			bottom: 20
		});
		indView.add(message);
		indWin.open();
	} else {
		actInd.message = "Loading";
	}
	actInd.show();

}

function hideIndicator() {
	actInd.hide();
	if (Ti.Platform.osname != 'android') {
		indWin.close({
			opacity: 0,
			duration: 500
		});
	}
}

//
// Add global event handlers to hide/show custom indicator
//
Titanium.App.addEventListener('show_indicator', function (e) {
	showIndicator();
});
Titanium.App.addEventListener('hide_indicator', function (e) {
	hideIndicator();
});
