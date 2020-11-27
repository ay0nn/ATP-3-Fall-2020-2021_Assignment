const db 		= require('./db');
module.exports= {
	validate: function(user, callback){	
		var sql = "SELECT * FROM `user` WHERE email='"+user.email+"' AND password='"+user.password+"'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getAllUser: function(callback){
		var sql = "select * from user";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert:(user,callback)=>{
		
		var sql="INSERT INTO `user`(`name`,`phone_number`,`address`,`user_type`,`email`,`password`) VALUES ('"+user.name+"','"+user.phone_number+"','"+user.address+"','"+user.user_type+"','"+user.email+"','"+user.password+"')";
        db.execute(sql,(status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
    },
	update: function(user, callback){
		console.log(user);
		var sql ="UPDATE `user` SET `name` = '"+user.name+"',`phone_number` = '"+user.phone_number+"',`address` = '"+user.address+"',`user_type` = '"+user.user_type+"',`email` = '"+user.email+"' WHERE user_id = '"+user.user_id+"'";
		db.execute(sql, (result) => {
			callback(result);
		});
	},

	delete: function(user_id, callback){
		var sql = "DELETE FROM `user` WHERE user_id='"+user_id+"';";
		db.execute(sql, function(status){
			callback(status);
		});
	},
	searchUser: function(n, callback){
		var sql = "SELECT * FROM user WHERE "+n.searchby+" LIKE '%"+n.search+"%'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});
	},
	getByEmail: function(email, callback){
		var sql = "SELECT * FROM `user` WHERE email='"+email+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insertV:(user,callback)=>{
		
		var sql="INSERT INTO `vehicle`(`mdln`,`img`,`details`,`category`,`pr`) VALUES ('"+user.mdln+"','"+user.img+"','"+user.details+"','"+user.category+"','"+user.pr+"')";
        db.execute(sql,(status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
    },
	getAllVehicle: function(callback){
		var sql = "select * from vehicle";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getByVId: function(vid, callback){
		var sql = "select * from vehicle where vid='"+vid+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	updateV: function(ve, callback){
		console.log(ve);
		var sql ="UPDATE `vehicle` SET `mdln` = '"+ve.mdln+"',`img` = '"+ve.img+"',`details` = '"+ve.details+"',`category` = '"+ve.category+"',`pr` = '"+ve.pr+"' WHERE vid = '"+ve.vid+"'";
		db.execute(sql, (result) => {
			callback(result);
		});
	},
	deleteV: function(vid, callback){
		var sql = "DELETE FROM `vehicle` WHERE vid='"+vid+"';";
		db.execute(sql, function(status){
			callback(status);
		});
	},
	getById: function(user_id, callback){
		var sql = "select * from user where user_id='"+user_id+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
///////Bookings
getAllBooking: function(callback){
	var sql = "select * from book";
	db.getResults(sql, function(results){
		callback(results);
	});
},
deleteB: function(bid, callback){
	var sql = "DELETE FROM `book` WHERE bid='"+bid+"';";
	db.execute(sql, function(status){
		callback(status);
	});
},
insertB:(book,callback)=>{	
	var sql=	"INSERT INTO `book`(`bby`, `mdln`, `binfo`, `bdate`) VALUES ('"+book.bby+"','"+book.mdln+"','"+book.binfo+"','"+book.bdate+"')";	
	db.execute(sql,(status)=>{
		if(status){
			callback(true);
		}else{
			callback(false);
		}
	});
}
}