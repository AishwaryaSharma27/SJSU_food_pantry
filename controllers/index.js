var express = require('express');
var router = express.Router();


var cart=[];

router.get('/', function(req, res) {
    res.render('../views/login', { title: '' });
});



router.post('/foodhome', function(req, res) {
    if (req.body.username === 'test' && req.body.password === 'test') {
        res.render('../views/pantryhome', { title: req.body.username });
    } else {
        res.send('Wrong username or password. Please enter test as username and password');
    }
});


router.post('/zones', function(req, res) {
    if (req.body.Logout) {
        res.render('../views/login', { title: 'Login!' });
    } else if (req.body.zone1) {
        res.render('../views/zone1', { title: 'zone1', name: 'zone1' });
    } else if (req.body.zone2) {
        res.render('../views/zone2', { title: 'zone2', name: 'zone2' });
    } else {
        res.render('../views/zone3', { title: 'zone3', name: 'zone3' });
    }
});

router.post('/cart', function(req, res) {
    var arr1 = Object.keys(req.body);
    arr1.map(item=>{
    	cart.push(item);
    })
    res.render('../views/pantryhome', { items: cart });
});

router.get('/cart', function(req, res) {
    res.render('../views/itemcart', { items: cart });
});

router.post('/delete',function(req,res){

    if(req.body.potato){
		cart = cart.filter(function(item) {
			return item !== "potato"
		})
    }
    else if(req.body.chilli){
		cart = cart.filter(function(item) {
			return item !== "chilli"
		})
    }

    else if(req.body.apple){
		cart = cart.filter(function(item) {
			return item !== "apple"
		})
    }

    else if(req.body.freshcutcorns){
		cart = cart.filter(function(item) {
			return item !== "freshcutcorns"
		})
    }

    else if(req.body.greenBeans){
		cart = cart.filter(function(item) {
			return item !== "greenBeans"
		})
    }

    else if(req.body.mushroomsoup){
		cart = cart.filter(function(item) {
			return item !== "mushroomsoup"
		})
    }

    else if(req.body.milk){
		cart = cart.filter(function(item) {
			return item !== "milk"
		})
    }

    else if(req.body.cheese){
		cart = cart.filter(function(item) {
			return item !== "cheese"
		})
    }

    else if(req.body.meat){
		cart = cart.filter(function(item) {
			return item !== "meat"
		})
    }

   
    
	res.render('../views/itemcart',{items:cart});
});

router.post('/placeorder', function(req,res){
	res.render('../views/orderplace');
});
module.exports = router;