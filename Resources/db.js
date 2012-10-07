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
	Ti.API.info("db ItemId == "+ItemId);
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute("SELECT hotel_id, category, id, name, description, price, is_veg  FROM menu WHERE id IN ("+ItemId+")");
	//var rows = db.execute("SELECT hotel_id, category, id, name, description, price, is_veg  FROM menu WHERE id IN (?)", ItemId);
	var count = rows.getRowCount();
	Ti.API.info("db items count == "+count);
	while (rows.isValidRow()) {
		result.push({hotel_id:rows.fieldByName('hotel_id'), item_id:rows.fieldByName('id'), category:rows.fieldByName('category'), name:rows.fieldByName('name'), description:rows.fieldByName('description'), price:rows.fieldByName('price'), is_veg:rows.fieldByName('is_veg')});
		rows.next();
	}
	db.close();
	return result;
};

exports.addUser = function(arg){
	var mydb = Ti.Database.open(DATABASE_NAME);
	Ti.API.info("addUser arg == "+JSON.stringify(arg))
    mydb.execute('INSERT INTO users (name, email, phone, address) VALUES (?,?,?,?)', arg.name,arg.email,arg.phone,arg.address);
    
    //fetch user id
	var dbrows = mydb.execute('SELECT MAX(id) as "userId" from users');
	var userId = 0;
	if (dbrows.isValidRow()) {
		Ti.API.info("this userId == "+userId);
		userId = dbrows.fieldByName('userId');
	}
	//userId = userId + 1;
	dbrows.close();
	mydb.close();
	
	return userId;
};

exports.addOrder = function(arg){
	var mydb = Ti.Database.open(DATABASE_NAME);
	Ti.API.info("addOrder arg == "+JSON.stringify(arg))
    mydb.execute('INSERT INTO orders (user_id, total_amount) VALUES (?,?)', arg.userId,arg.totalAmount);
    
    //fetch order id
	var dbrows = mydb.execute('SELECT MAX(id) as "orderId" from orders');
	var orderId = 0;
	if (dbrows.isValidRow()) {
		Ti.API.info("this orderId == "+orderId);
		orderId = dbrows.fieldByName('orderId');
	}
	//orderId += 1;
	dbrows.close();
	mydb.close();
	
	return orderId;
};

exports.addOrderLine = function(arg){
	var mydb = Ti.Database.open(DATABASE_NAME);
	Ti.API.info("addOrder arg == "+JSON.stringify(arg))
    mydb.execute('INSERT INTO order_line (user_id, order_id, item_id, quantity) VALUES (?,?,?,?)', arg.userId, arg.orderId, arg.itemId, arg.quantity);
	mydb.close();
};