var DATABASE_NAME = 'sample';

exports.createDb = function() {
	Ti.Database.install('sample.sqlite', DATABASE_NAME);
};

exports.selectRestarunts = function() {
	var result=[];
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute("SELECT id, name, address, latitude, longitude from hotels ORDER BY name");
	var count = rows.getRowCount();

	while (rows.isValidRow()) {
		result.push({id:rows.fieldByName('id'),name:rows.fieldByName('name'),address:rows.fieldByName('address'),latitude:rows.fieldByName('latitude'),longitude:rows.fieldByName('longitude')});
		rows.next();
	}
	db.close();
	return result;
};

exports.selectRestaruntsByQuery = function(queryText) {
	
	var result=[];
	var db = Ti.Database.open(DATABASE_NAME);
	//var rows = db.execute("select id, name, address, latitude, longitude FROM hotels WHERE name LIKE '%?%' = ?", queryText);
	var rows = db.execute("select id, name, address, latitude, longitude FROM hotels WHERE name LIKE '%"+ queryText +"%' ");
	var count = rows.getRowCount();
	alert("count == "+count)
	while (rows.isValidRow()) {
		result.push({id:rows.fieldByName('id'),name:rows.fieldByName('name'),address:rows.fieldByName('address'),latitude:rows.fieldByName('latitude'),longitude:rows.fieldByName('longitude')});
		rows.next();
	}
	db.close();
	return result;
};

exports.selectRestaruntsByLocation = function() {
	alert("Ti.App.CurrentLatitude "+Ti.App.CurrentLatitude +", Ti.App.Currentlongitude = "+ Ti.App.Currentlongitude);
	var result=[];
	var db = Ti.Database.open(DATABASE_NAME);
	//var rows = db.execute("select  + testCal(a.latitude, a.longitude)+" FROM hotels a");
	var rows = db.execute("SELECT id, name, address, latitude, longitude from hotels ORDER BY ");
	var count = rows.getRowCount();

	while (rows.isValidRow()) {
		result.push({id:rows.fieldByName('id'),name:rows.fieldByName('name'),address:rows.fieldByName('address'),latitude:rows.fieldByName('latitude'),longitude:rows.fieldByName('longitude')});
		rows.next();
	}
	db.close();
	return result;
};

exports.selectMenuCateoryList = function() {
	var result=[];
	var db = Ti.Database.open(DATABASE_NAME);
	//var rows = db.execute("select  + testCal(a.latitude, a.longitude)+" FROM hotels a");
	var rows = db.execute("SELECT hotel_id, category, COUNT(category) AS category_count FROM menu GROUP BY category");
	var count = rows.getRowCount();

	while (rows.isValidRow()) {
		result.push({hotel_id:rows.fieldByName('hotel_id'),category:rows.fieldByName('category'),category_count:rows.fieldByName('category_count')});
		rows.next();
	}
	db.close();
	return result;
};

exports.getMenuList = function(categoryText) {
	var result=[];
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute("SELECT hotel_id, category, id, name, description, price, is_veg  FROM menu WHERE category = ?", categoryText);
	var count = rows.getRowCount();

	while (rows.isValidRow()) {
		result.push({hotel_id:rows.fieldByName('hotel_id'), item_id:rows.fieldByName('id'), category:rows.fieldByName('category'), name:rows.fieldByName('name'), description:rows.fieldByName('description'), price:rows.fieldByName('price'), is_veg:rows.fieldByName('is_veg')});
		rows.next();
	}
	db.close();
	return result;
};

exports.getMenuItem = function(ItemId) {
	var result=[];
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute("SELECT hotel_id, category, id, name, description, price, is_veg  FROM menu WHERE id = ?", ItemId);
	var count = rows.getRowCount();

	while (rows.isValidRow()) {
		result.push({hotel_id:rows.fieldByName('hotel_id'), item_id:rows.fieldByName('id'), category:rows.fieldByName('category'), name:rows.fieldByName('name'), description:rows.fieldByName('description'), price:rows.fieldByName('price'), is_veg:rows.fieldByName('is_veg')});
		rows.next();
	}
	db.close();
	return result;
};