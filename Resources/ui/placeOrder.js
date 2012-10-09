exports.placeOrder = function() {
	var db = require('db');
	
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
		text: "Place Order",
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
	
	var checkedOutList = Ti.App.Properties.getList('checkedOutList', false);
	var totalAmount = 0;
	for(var i=0; i<checkedOutList.length; i++){
		Ti.API.info("totalAmount  == "+totalAmount);
		totalAmount += checkedOutList[i].itemPrice * checkedOutList[i].itemQuantity;
	}
	
    var infoLabel = Titanium.UI.createLabel({
    	text:"Your order total amount is $ "+totalAmount,
    	color: '#2881BB',
    	height:25,
    	top:10,
    	//bottom:10,
    	font:{fontSize:15,fontWeight:"bold"}
    });
    container.add(infoLabel);
    
    var orderFormContainer = Titanium.UI.createView({
    	layout:"vertical",
    	backgroundColor:"#fff",
    	borderRadius:9,
    	borderColor:"#ccc",
    	borderWidth:1,
    	height:Ti.UI.SIZE,
    	top:20,
    	bottom:20,
    	left:10,
    	right:10
    });
    container.add(orderFormContainer);
        
    var userNameLabel = Titanium.UI.createLabel({
    	text:"Name",
    	color: '#2a2a2b',
    	top:10,
    	left:10,
    	font:{fontSize:14,fontWeight:"bold"}
    });
    orderFormContainer.add(userNameLabel);
    
	var userName = Ti.UI.createTextField({
		height : 35,
		top : 5,
		left : 10,
		right : 10,
		font:{fontSize:14},
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	orderFormContainer.add(userName);

    var emailLabel = Titanium.UI.createLabel({
    	text:"Email",
    	color: '#2a2a2b',
    	top:13,
    	left:10,
    	font:{fontSize:14,fontWeight:"bold"}
    });
    orderFormContainer.add(emailLabel);
    	
	var email = Ti.UI.createTextField({
		height : 35,
		top : 5,
		left : 10,
		right : 10,
		font:{fontSize:14},
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	orderFormContainer.add(email);

    var phoneNoLabel = Titanium.UI.createLabel({
    	text:"Phone No",
    	color: '#2a2a2b',
    	top:13,
    	left:10,
    	font:{fontSize:14,fontWeight:"bold"}
    });
    orderFormContainer.add(phoneNoLabel);
    
	var phoneNo = Ti.UI.createTextField({
		height : 35,
		top : 5,
		left : 10,
		right : 10,
		font:{fontSize:14},
		keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	orderFormContainer.add(phoneNo);

    var addressLabel = Titanium.UI.createLabel({
    	text:"Address",
    	color: '#2a2a2b',
    	top:13,
    	left:10,
    	font:{fontSize:14,fontWeight:"bold"}
    });
    orderFormContainer.add(addressLabel);
    	
    var address = Ti.UI.createTextArea({
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        color: '#000',
        textAlign: 'left',
		font:{fontSize:14},
        top: 5,
        left:10,
        bottom:15,
		right : 10,
        height : 70
    });
    orderFormContainer.add(address);
    
    var submitBtn = Ti.UI.createButton({
    	title:"Submit",
    	top:10,
    	bottom:20,
    	width:100,
    	height:35
    });
	orderFormContainer.add(submitBtn);

	submitBtn.addEventListener('click', function(e) {
		if(userName.value == ""){
			alert("Please enter valid user name");
			return false;
		}else if(email.value == ""){
			alert("Please enter valid email");
			return false;	
		}else if(phoneNo.value == ""){
			alert("Please enter valid phone no");
			return false;
		}else if(address.value == ""){
			alert("Please enter valid address");
			return false;
		}
		
		var userId = db.addUser({name:userName.value, email:email.value, phone:phoneNo.value, address:address.value});
		var orderId = db.addOrder({userId:userId, totalAmount:totalAmount});
		for(var i=0; i<checkedOutList.length; i++){
			var orderLine = db.addOrderLine({userId:userId, orderId:orderId, itemId:checkedOutList[i].itemId, quantity:checkedOutList[i].itemQuantity});
		}
		
		//alert("userId == "+userId);
		alert("Your order has been submitted successfully.");
	});
	return win;
}