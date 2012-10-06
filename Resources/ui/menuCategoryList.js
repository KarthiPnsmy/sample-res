exports.menuCategoryList = function() {
	var db = require('db');
	var menuWin = require('ui/menuList');
	
	var win = Titanium.UI.createWindow({
		title : 'Category List',
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
		//text: "Category List",
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
	
	var categoryList = Titanium.UI.createTableView({
		top : 40,
		backgroundColor : 'transparent'
	});
	win.add(categoryList);
	
	
	
	categoryList.addEventListener('click', function(e) {
		if(e.rowData.categoryText){
			var window = menuWin.menuList(e.rowData.categoryText);
			//window.open({modal:true});
			window.open();
		}
	});

	var rows = db.selectMenuCateoryList();
	var rowData = [];
	for ( i = 0; i < rows.length; i++) {
		var row = Ti.UI.createTableViewRow({
			height : 40,
			hasChild:true,
			categoryText : rows[i].category,
			restaruntId: rows[i].hotel_id
		});

		var categoryName = Ti.UI.createLabel({
			top : 10,
			left : 5,
			height : Ti.UI.SIZE,
			text : rows[i].category,
			color : '#000',
			font : {
				fontsSize : 14,
				fontWeight : "bold",
				fontFamily : 'Helvetica Neue'
			},
			textAlign : "left"
		});
		row.add(categoryName);

		var itemCountHolder = Ti.UI.createView({
			top : 7,
			right : 20,
			height : 25,
			width:40,
			borderRadius:12,
			backgroundColor : 'red',
		});
		row.add(itemCountHolder);
		
		var itemCount = Ti.UI.createLabel({
			color:"#fff",
			text : rows[i].category_count,
			font : {
				fontsSize : 14,
				fontWeight : "bold",
				fontFamily : 'Helvetica Neue'
			},
			textAlign : "left"
		});
		itemCountHolder.add(itemCount)
		
		rowData.push(row);
	}
	categoryList.setData(rowData);

	
	return win;
}