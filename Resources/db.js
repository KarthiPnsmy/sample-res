var DATABASE_NAME = 'restarunt';

exports.createDb = function() {
	Ti.Database.install('restarunt.sqlite', DATABASE_NAME);
};

exports.selectRestarunts = function(n_id) {
	var result=[];
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute("SELECT id, name, address, latitude, longitude from restarunts ORDER BY name");
	var count = rows.getRowCount();

	while (rows.isValidRow()) {
		result.push({id:rows.fieldByName('id'),name:rows.fieldByName('name'),address:rows.fieldByName('address'),latitude:rows.fieldByName('latitude'),longitude:rows.fieldByName('longitude')});
		rows.next();
	}
	db.close();
	return result;
};

exports.addNewLocation = function(newLocation){
	newLocation = newLocation.toLowerCase();
	var mydb = Ti.Database.open(DATABASE_NAME);
	var rows = mydb.execute('select city_name from city where lower(city_name) = ?', newLocation);
    var count = rows.getRowCount();
    
    if(count == 0){
    	Ti.API.info("Inserting new record");
    	mydb.execute('INSERT INTO city (city_name) VALUES (?)', newLocation);
    }else{
    	Ti.API.info("Location already exist");
    }
    
	mydb.close();
};
