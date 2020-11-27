const express 	= require('express');
const router 	= express.Router();
const {body, validationResult} 		= require('express-validator');
const userModel		= require.main.require('./models/userModel');

router.get('/', (req, res) => {
	if (req.session.email != null) {
		userModel.getByEmail(req.session.email, function (result) {
			if(result){
				res.render('admin/index', {
				user: result
			});}
		})
	} else {
		res.redirect('/login');
	}
}); 
///User Register
router.get('/register', (req, res)=>{
	res.render('admin/register');	
});


router.post('/register', [
    //
    body('name')
    .notEmpty()
    .withMessage('username is required'),
    
    //
    body('phone_number')
    .notEmpty()
    .withMessage('uphone is required'),
    
    // Email nameField & empty,email validation
    body('address')
    .isEmail()
    .withMessage('Address Require'),
        
    body('user_type')
    .notEmpty()
    .withMessage('User type is required'),
    
    body('email')
    .notEmpty()
    .withMessage('Email is required'),

	body('password')
    .notEmpty()
    .withMessage('upassword is required')


  ], (req, res) => {

 
        user={
          name: req.body.name,
          phone_number: req.body.phone_number,
          address: req.body.address,
          user_type: req.body.user_type,
          email: req.body.email,
		  password: req.body.password
			
        };
console.log(user);
        userModel.insert(user,(status)=>{
            if(status){
				console.log('succesful');
				res.redirect('/login');                              
            }else{
                res.send("Registration Failed!");                
            } 
        });

  });

  ///Admin Register
  router.get('/adduser', (req, res)=>{
	res.render('admin/register');	
});


router.post('/register', [
    //
    body('name')
    .notEmpty()
    .withMessage('username is required'),
    
    //
    body('phone_number')
    .notEmpty()
    .withMessage('uphone is required'),
    
    // Email nameField & empty,email validation
    body('address')
    .isEmail()
    .withMessage('Address Require'),
        
    body('user_type')
    .notEmpty()
    .withMessage('User type is required'),
    
    body('email')
    .notEmpty()
    .withMessage('Email is required'),

	body('password')
    .notEmpty()
    .withMessage('upassword is required')


  ], (req, res) => {

 
        user={
          name: req.body.name,
          phone_number: req.body.phone_number,
          address: req.body.address,
          user_type: req.body.user_type,
          email: req.body.email,
		  password: req.body.password
			
        };
console.log(user);
        userModel.insert(user,(status)=>{
            if(status){
				console.log('succesful');
				res.redirect('admin/userlist');                              
            }else{
                res.send("Registration Failed!");                
            } 
        });

  });


router.get('/userlist', (req, res) => {
	if (req.session.email != null) {
		userModel.getAllUser(function (result) {
			res.render('admin/userlist', {
				users: result
			});
		})
	} else {
		res.redirect('/login');
	}
});

router.get('/updateuser/:user_id', (req, res)=>{

	userModel.getById(req.params.user_id, (result) => {
		var vehicle = {
			name: result[0].name,
			phone_number:result[0].phone_number,
			address: result[0].address,
			user_type:result[0].user_type,
			email:result[0].email	
		};
		res.render('admin/updateuser', vehicle);
	});
});

router.post('/updateuser/:user_id', (req, res)=>{
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
////Add Vehicle
router.get('/addvehicle', (req, res) => {
	if (req.session.email != null) {
		userModel.getByEmail(req.session.email, function (result) {
			res.render('admin/addvehicle', {
				vehicle: result
			});
		})
	} else {
		res.redirect('/login');
	}
	
		});
router.post('/addvehicle', [

    body('mdln')
    .notEmpty()
    .withMessage('Model name is required'),
    
    body('img')
    .notEmpty()
	.withMessage('Image is required'),
	
	body('details')
    .notEmpty()
	.withMessage('Details is required'),

	body('category')
    .notEmpty()
	.withMessage('Category is required'),
	
	body('pr')
    .notEmpty()
    .withMessage('Price is required'),

  ], (req, res) => {
		 var vehicle ={
				mdln: req.body.mdln,
				details: req.body.details,
				img: req.body.img,
				category: req.body.category,
				pr: req.body.pr
	
			};
	
			userModel.insertV(vehicle,(status)=>{
				console.log(vehicle);
				if(status){
					console.log('Insertion Succesful');
					res.redirect('/admin/vehiclelist');                              
				}else{
					res.send("Insertion Failed!");                
				} 
			});
		
	  });

	  router.get('/delete/:user_id', (req, res)=>{
		userModel.delete(req.params.user_id,(status)=>{
			if(status){
				res.redirect('/admin/userlist');
				
			}else{
				res.send('Deletion failed');
			}
	  });
	});
////Vehicle List
  router.get('/vehiclelist', (req, res) => {
	if (req.session.email != null) {
		userModel.getAllVehicle(function (result) {
			res.render('admin/vehiclelist', {
				vehicles: result
			});
		})
	} else {
		res.redirect('/login');
	}
});

////Update
router.get('/update/:vid', (req, res)=>{

	userModel.getByVId(req.params.vid, (result) => {
		var vehicle = {
			mdln: result[0].mdln,
			img:result[0].img,
			details: result[0].details,
			category:result[0].category,
			pr:result[0].pr,	
		};
		res.render('admin/editvehicle', vehicle);
	});
});

router.post('/update/:vid', (req, res)=>{
	var vehicle = {
		vid: req.params.vid,
		mdln: req.body.mdln,
		details:req.body.details,
		img: req.body.img,
		category:req.body.category,
		pr:req.body.pr
	}
	
	userModel.updateV(vehicle, (result) => {
		console.log(result);
	});
	res.redirect('/admin/vehiclelist');
	

});

////Deletion
router.get('/deleteN/:vid', (req, res)=>{
	userModel.deleteV(req.params.vid,(status)=>{
		if(status){
			res.redirect('/admin/vehiclelist');
			
		}else{
			res.send('Deletion failed');
		}
  });
});

///////Bookings
router.get('/booklist', (req, res) => {
	if (req.session.email != null) {
		userModel.getAllBooking(function (result) {
			res.render('admin/booklist', {
				books: result
			});
		})
	} else {
		res.redirect('admin/index');
	}
});

router.get('/deleteB/:bid', (req, res)=>{
	userModel.deleteB(req.params.bid,(status)=>{
		if(status){
			res.redirect('/admin/booklist');
			
		}else{
			res.send('Deletion failed');
		}
  });
});
//////Search User
router.post('/search',(req,res)=>{
	var n = {
		search : req.body.search,
		searchby: req.body.searchby
	};
	userModel.searchUser(n, function(results){
		if(results){
			res.json({n:results});
		}else{
			res.json({n:'error'});
		}
	});
});


module.exports = router;