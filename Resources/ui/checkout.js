exports.checkout = function(selectedItems) {
	//alert("itemId == "+itemId);
	var db = require('db');
	var placeOrderWin = require('ui/placeOrder');
	//var item = db.getMenuItem(selectedItems);
	selectedItems = selectedItems.toString(); 
	//alert("selectedItems == "+selectedItems);
	Ti.API.info("chk selectedItems == "+selectedItems);
	var selectedItems = db.getMenuItem(selectedItems);
	Ti.API.info("chk data == "+JSON.stringify(selectedItems));
	var win = Titanium.UI.createWindow({
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

    var checkedOutList = Ti.UI.createView({
    	layout:"vertical",
		height : Ti.UI.SIZE,
	});
	container.add(checkedOutList);
	
	var placeOrderButton = Ti.UI.createButton({
		title:"Place Order",
		height:30,
		width:150,
		top:10
	});
	container.add(placeOrderButton);
	
	placeOrderButton.addEventListener('click', function(e) {
		Ti.API.info("inside event listen === ");
		if(checkedOutList.children){
			Ti.API.info("checkedOutList.children === "+checkedOutList.children);
			var childLen = checkedOutList.children.length;
			Ti.API.info("childLen === "+childLen);
			if(childLen!=0){
				var finalCheckedoutList = [];
				for(var i=0; i<childLen; i++){
					Ti.API.info("childLen loop === "+i);
					//Ti.API.info("sub child === "+JSON.stringify(checkedOutList.children[i]));
					//Ti.API.info("sub child length === "+checkedOutList.children[i].children.length);
					if(checkedOutList.children[i] && checkedOutList.children[i].children.length){
						//Ti.API.info("sub child length 			=== "+checkedOutList.children[i].children.length);
						//Ti.API.info("sub child item name1 		=== "+JSON.stringify(checkedOutList.children[i].children[0]));
						//Ti.API.info("sub child item name2		=== "+JSON.stringify(checkedOutList.children[i].children[0].children[0]));
						var itemName 		= checkedOutList.children[i].children[0].children[0].text;
						var itemId 			= checkedOutList.children[i].children[0].children[0].itemId;
						var itemPrice 		= checkedOutList.children[i].children[1].children[0].itemPrice;
						var itemQuantity 	= checkedOutList.children[i].children[2].children[0].value;
						
						Ti.API.info("sub child item name 		=== "+itemName);
						Ti.API.info("sub child item id 			=== "+itemId);
						Ti.API.info("sub child item price 		=== "+itemPrice);
						Ti.API.info("sub child item quantity 	=== "+itemQuantity);
						finalCheckedoutList.push({itemId:itemId, itemName:itemName, itemPrice:itemPrice, itemQuantity:itemQuantity})
					}else{
						Ti.API.info("this may be separetor === "+i);
					}
				}
				Ti.API.info("finalCheckedoutList == "+finalCheckedoutList);
				Ti.App.Properties.setList('checkedOutList', finalCheckedoutList);
				var tmpStr = Ti.App.Properties.getList('checkedOutList', false);
				Ti.API.info("tmpStr == "+JSON.stringify(finalCheckedoutList));
				var window = placeOrderWin.placeOrder();
				window.open({navBarHidden:true, modal:true});
			}
		}
	});
	
	var rowData = [];
	for ( i = 0; i < selectedItems.length; i++) {
		Ti.API.info("chk inside loop == "+i);
	    var itemRow = Ti.UI.createView({
			layout:"horizontal",
			height : Ti.UI.SIZE
		});
		checkedOutList.add(itemRow);
		
		var coloumn1 = Ti.UI.createView({
			width:"50%",
			height : Ti.UI.SIZE,
			//borderWidth:1,
			//borderColor:"#999"
		});
		itemRow.add(coloumn1);
		Ti.API.info("itemid === "+selectedItems[i].item_id +", name == "+selectedItems[i].name);
		var itemLabel = Ti.UI.createLabel({
			top : 10,
			bottom:10,
			height : Ti.UI.SIZE,
			text : selectedItems[i].name,
			itemId: selectedItems[i].item_id,
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
			itemPrice: selectedItems[i].price,
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
		});
		itemRow.add(coloumn3);
	
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
		checkedOutList.add(separator);
	}
	return win;
}