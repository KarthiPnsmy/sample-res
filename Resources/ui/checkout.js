exports.checkout = function(selectedItems) {
	//alert("itemId == "+itemId);
	var db = require('db');
	//var item = db.getMenuItem(selectedItems);
	selectedItems = selectedItems.toString(); 
	alert("selectedItems == "+selectedItems);
	Ti.API.info("chk selectedItems == "+selectedItems);
	var selectedItems = db.getMenuItem(selectedItems);
	Ti.API.info("chk data == "+JSON.stringify(selectedItems));
	var win = Titanium.UI.createWindow({
		backgroundColor : '#fff'
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
		text: "Checkout",
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
	
	var container = Ti.UI.createScrollView({
		layout:"vertical",
		top:40,
		left:0
	});
	win.add(container);
	
    var headerRow = Ti.UI.createView({
		layout:"horizontal",
		height : Ti.UI.SIZE,
		backgroundColor:"#2881BB"
	});
	container.add(headerRow);
	
	var coloumn1 = Ti.UI.createView({
		width:"50%",
		height : Ti.UI.SIZE,
		borderWidth:1,
		borderColor:"#999"
	});
	headerRow.add(coloumn1);

	var itemLabel = Ti.UI.createLabel({
		top : 10,
		bottom:10,
		height : Ti.UI.SIZE,
		text : "Items",
		color : '#fff',
		font : {
			fontsSize : 14,
			fontWeight : "bold",
			fontFamily : 'Helvetica Neue'
		},
		textAlign : "center"
	});
	coloumn1.add(itemLabel);

	var coloumn2 = Ti.UI.createView({
		width:"25%",
		height : Ti.UI.SIZE,
		borderWidth:1,
		borderColor:"#999"
	});
	headerRow.add(coloumn2);

	var priceLabel = Ti.UI.createLabel({
		top : 10,
		bottom:10,
		height : Ti.UI.SIZE,
		text : "Price",
		color : '#fff',
		font : {
			fontsSize : 14,
			fontWeight : "bold",
			fontFamily : 'Helvetica Neue'
		},
		textAlign : "center"
	});
	coloumn2.add(priceLabel);
	
	var coloumn3 = Ti.UI.createView({
		width:"25%",
		height : Ti.UI.SIZE,
		borderWidth:1,
		borderColor:"#999"
	});
	headerRow.add(coloumn3);

	var unitLabel = Ti.UI.createLabel({
		top : 10,
		bottom:10,
		height : Ti.UI.SIZE,
		text : "Quantity",
		color : '#fff',
		font : {
			fontsSize : 14,
			fontWeight : "bold",
			fontFamily : 'Helvetica Neue'
		},
		textAlign : "center"
	});
	coloumn3.add(unitLabel);	

	var rowData = [];
	for ( i = 0; i < selectedItems.length; i++) {
		Ti.API.info("chk inside loop == "+i);
	    var itemRow = Ti.UI.createView({
			layout:"horizontal",
			height : Ti.UI.SIZE
		});
		container.add(itemRow);
		
		var coloumn1 = Ti.UI.createView({
			width:"50%",
			height : Ti.UI.SIZE,
			//borderWidth:1,
			//borderColor:"#999"
		});
		itemRow.add(coloumn1);
	
		var itemLabel = Ti.UI.createLabel({
			top : 10,
			bottom:10,
			height : Ti.UI.SIZE,
			text : selectedItems[i].name,
			color : '#000',
			font : {
				fontsSize : 14,
				//fontWeight : "bold",
				fontFamily : 'Helvetica Neue'
			},
			textAlign : "center"
		});
		coloumn1.add(itemLabel);
	
		var coloumn2 = Ti.UI.createView({
			width:"25%",
			height : Ti.UI.SIZE,
			//borderWidth:1,
			//borderColor:"#999"
		});
		itemRow.add(coloumn2);
	
		var priceLabel = Ti.UI.createLabel({
			top : 10,
			bottom:10,
			height : Ti.UI.SIZE,
			text : "$ "+selectedItems[i].price,
			color : '#000',
			font : {
				fontsSize : 14,
				//fontWeight : "bold",
				fontFamily : 'Helvetica Neue'
			},
			textAlign : "center"
		});
		coloumn2.add(priceLabel);
		
		var coloumn3 = Ti.UI.createView({
			width:"25%",
			height : Ti.UI.SIZE,
			//borderWidth:1,
			//borderColor:"#999"
		});
		itemRow.add(coloumn3);
	
		var unitLabel = Ti.UI.createLabel({
			top : 10,
			bottom:10,
			height : Ti.UI.SIZE,
			text : 1,
			color : '#000',
			font : {
				fontsSize : 14,
				//fontWeight : "bold",
				fontFamily : 'Helvetica Neue'
			},
			textAlign : "center"
		});
		//coloumn3.add(unitLabel);
		
		var unitLabel = Ti.UI.createTextField({
			value:1,
			borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
			keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
			color: '#336699',
			top: 3, 
			//bottom: 5,
			width: 50, height: 40
		});		
		coloumn3.add(unitLabel);
		
		var separator = Ti.UI.createView({
			height : 1,
			left:0,
			right:0,
			backgroundColor:"#999"
		});
		container.add(separator);
	}
	return win;
}