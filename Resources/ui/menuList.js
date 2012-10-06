exports.menuList = function(categoryText) {
	var db = require('db');
	var selectedItem = [];
	var menuDetailWin = require('ui/menuDetail');
	
	var win = Titanium.UI.createWindow({
		title : 'Menu List',
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
		//text: "Menu List",
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
	
	var menuListing = Titanium.UI.createTableView({
		top : 40,
		backgroundColor : 'transparent'
	});
	win.add(menuListing);
	
	menuListing.addEventListener('click', function(e) {
		Ti.API.info("e.source "+JSON.stringify(e.source));
		Ti.API.info("before Ti.App.selectedItem = = = "+selectedItem);
		if(e.source.isItemCheckbox){
			//alert("source.item_id = "+e.source.itemId);
			if(e.source.checked == true){    
				Ti.API.info("removing one item = = = "+e.source.itemId);				   				
				selectedItem.splice(selectedItem.indexOf(e.source.itemId),1); 
				e.source.image = 'images/unchecked.png';
				e.source.checked = false;
			}else{
				Ti.API.info("adding one item = = = "+e.source.itemId);
				selectedItem.push(e.source.itemId);  								   			
				e.source.image = '/images/checked.png';
				e.source.checked = true;
			}
			Ti.API.info("after Ti.App.selectedItem = = = "+selectedItem);
		}else if(e.rowData.itemId){
			var window = menuDetailWin.menuDetail(e.rowData.itemId);
			//window.open({modal:true});
			window.open();
			alert("open win for e.rowData.itemId = "+e.rowData.itemId);
		}
		
	});

	var rows = db.getMenuList(categoryText);
	var rowData = [];
	for ( i = 0; i < rows.length; i++) {
		var row = Ti.UI.createTableViewRow({
			height : 80,
			hasChild : true,
			itemId : rows[i].item_id,
			categoryText : rows[i].category,
			restaruntId: rows[i].hotel_id
		});

		var itemImage = Ti.UI.createImageView({
			top : 10,
			left : 10,
			height : 60,
			width :55,
			//image:"images/default_food_icon.png",
		});
		row.add(itemImage);
		
		var itemName = Ti.UI.createLabel({
			top : 10,
			left : 75,
			height : 20,
			text : rows[i].name,
			color : '#000',
			font : {
				fontsSize : 14,
				fontWeight : "bold",
				fontFamily : 'Helvetica Neue'
			},
			textAlign : "left"
		});
		row.add(itemName);
		
		var itemPrice = Ti.UI.createLabel({
			top : 30,
			left : 75,
			height : Ti.UI.SIZE,
			text : "$ "+rows[i].price,
			font : {
				fontsSize : 14,
				fontFamily : 'Helvetica Neue'
			},
			textAlign : "left"
		});
		row.add(itemPrice)

		var isVegIcon = Ti.UI.createImageView({
			top : 50,
			left : 75,
			height : 15,
			width :15,
			backgroundColor : rows[i].is_veg ? "green" : "red"
		});
		row.add(isVegIcon);

		var itemCheckbox = Ti.UI.createImageView({
			//top : 10,
			right : 20,
			height : 22,
			width :22,
			checked:false,
			itemId:rows[i].item_id,
			isItemCheckbox:"yes",
			image:"images/unchecked.png"
		});
		row.add(itemCheckbox);

		rowData.push(row);
	}
	menuListing.setData(rowData);

	
	return win;
}