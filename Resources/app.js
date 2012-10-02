// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
var db = require('db');

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
	top: 8,
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

var restaruntList = Titanium.UI.createTableView({
	top:40,
	backgroundColor:'transparent'
});
win.add(restaruntList);

function getRestaruntListing(){
	var rowData = [];
	restaruntList.setData(rowData);	
	var rows = db.selectRestarunts();
		for(i=0;i<rows.length;i++){
			var row = Ti.UI.createTableViewRow({
				height:60
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
        		font:{fontsSize:14, fontWeight:"bold", fontFamily:'Helvetica Neue'},
        		textAlign:"left"
        	});
        	row.add(restaruntAddress);

			rowData.push(row);
	}
	restaruntList.setData(rowData);	
}
getRestaruntListing()
	
win.open();
