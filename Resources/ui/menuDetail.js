exports.menuDetail = function(itemId) {
	//alert("itemId == "+itemId);
	var db = require('db');
	var item = db.getMenuItem(itemId);
	
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
		text: item[0].name,
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
	
	var container = Ti.UI.createView({
		layout:"vertical",
		top:40,
		left:0
	});
	win.add(container);
	
	var bacicInfoHolder = Ti.UI.createView({
		layout:"horizontal",
		height : Ti.UI.SIZE,
		//backgroundColor:"red"
	});
	container.add(bacicInfoHolder);

	var itemImage = Ti.UI.createImageView({
		top : 10,
		left : 10,
		height : 90,
		width :75,
		backgroundColor:"#ccc",
		image:"../images/default_food_icon.png",
	});
	bacicInfoHolder.add(itemImage);

	var textHolder = Ti.UI.createView({
		layout:"vertical",
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		left:10
	});
	bacicInfoHolder.add(textHolder);

	var itemName = Ti.UI.createLabel({
		top : 10,
		left : 0,
		height : Ti.UI.SIZE,
		text : item[0].name,
		color : '#000',
		font : {
			fontsSize : 14,
			fontWeight : "bold",
			fontFamily : 'Helvetica Neue'
		},
		textAlign : "left"
	});
	textHolder.add(itemName);
	
	var itemPrice = Ti.UI.createLabel({
		top : 5,
		left : 0,
		height : Ti.UI.SIZE,
		text : "$ "+item[0].price,
		font : {
			fontsSize : 14,
			fontFamily : 'Helvetica Neue'
		},
		textAlign : "left"
	});
	textHolder.add(itemPrice)

	var isVegIcon = Ti.UI.createImageView({
		top : 5,
		left : 0,
		height : 15,
		width :15,
		backgroundColor : item[0].is_veg ? "green" : "red"
	});
	textHolder.add(isVegIcon);

	var itemDescription = Ti.UI.createScrollView({
		layout:"vertical",
		//backgroundColor:"yellow",
		top:10,
		height : Ti.UI.SIZE,
	});
	container.add(itemDescription);

	var itemDescriptionText = Ti.UI.createLabel({
		top : 5,
		left : 10,
		height : Ti.UI.SIZE,
		text : "dfhfghfghgfhgfhgf hfghfgh ",
		color:"#999",
		font : {
			fontsSize : 14,
			fontFamily : 'Helvetica Neue'
		},
		textAlign : "left"
	});
	itemDescription.add(itemDescriptionText)
	
	return win;
}