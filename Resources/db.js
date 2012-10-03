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

exports.selectRestaruntsByLocation = function(latitude, longitude) {
	var result=[];
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute("SELECT id, name, address, latitude, longitude from hotels WHERE name LIKE lower(latitude) ORDER BY name");
	var count = rows.getRowCount();

	while (rows.isValidRow()) {
		result.push({id:rows.fieldByName('id'),name:rows.fieldByName('name'),address:rows.fieldByName('address'),latitude:rows.fieldByName('latitude'),longitude:rows.fieldByName('longitude')});
		rows.next();
	}
	db.close();
	return result;
};

