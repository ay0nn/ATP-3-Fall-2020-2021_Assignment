const express 	= require('express');
const router 	= express.Router();
const {body, validationResult} 		= require('express-validator');
const userModel		= require.main.require('./models/userModel');

router.get('/', (req, res) => {
	if (req.session.email != null) {
		userModel.getByEmail(req.session.email, function (result) {
			res.render('user/index', {
				user: result
			});
		})
	} else {
		res.redirect('/login');
	}
}); 

//////Edit User
router.get('/editprofile/:user_id', (req, res)=>{

	userModel.getById(req.params.user_id, (result) => {
		var vehicle = {
			name: result[0].name,
			phone_number:result[0].phone_number,
			address: result[0].address,
			user_type:result[0].user_type,
			email:result[0].email	
		};
		res.render('admin/editprofile', vehicle);
	});
});

router.post('/editprofile/:user_id', (req, res)=>{
	var user = {
		user_id: req.params.user_id,
		name: req.body.name,
		phone_number:req.body.phone_number,
		address: req.body.address,
		user_type:req.body.user_type,
		email:req.body.email
	}
	
	userModel.update(user, (result) => {
		console.log(result);
	});
	res.redirect('/admin/userlist');
	

});
////Vehicle List
router.get('/vehiclelist', (req, res) => {
	if (req.session.email != null) {
		userModel.getAllVehicle(function (result) {
			res.render('user/vehiclelist', {
				vehicles: result
			});
		})
	} else {
		res.redirect('/login');
	}
});

//////Book Vehicle
router.get('/book/:vid', (req, res)=>{

	userModel.getByVId(req.params.vid, (result) => {
		var vehicle = {
			name : req.session.name,
			id: req.session.user_id,
			mdln: result[0].mdln,
			img:result[0].img,
			details: result[0].details,
			category:result[0].category,
			pr:result[0].pr,	
		};
		console.log(vehicle);
		res.render('user/booking', vehicle);
	});
});

router.post('/book/:vid', (req, res)=>{
	var book = {
		bby: req.session.user_id,
		vid: req.params.vid,
		bby:req.params.bby,
		mdln: req.params.mdln,
		binfo:req.body.binfo,
		bdate:req.body.bdate
	}
	
	userModel.insertB(book,(result) => {
		console.log(result);
	});
	res.redirect('/user');
	

});
module.exports = router;