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
router.get('/EditProfile/:user_id', (req, res)=>{

	userModel.getById(req.params.user_id, (result) => {
		var vehicle = {
			name : req.session.name,
			id: req.session.user_id,
				
		};
		res.render('admin/editvehicle', vehicle);
	});
});

router.post('/EditProfile/:user_id', (req, res)=>{
	var vehicle = {
		vid: req.params.vid,
	
	}
	userModel.update(vehicle, (result) => {
		console.log(result);
	});
	res.redirect('/admin/vehiclelist');
	

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