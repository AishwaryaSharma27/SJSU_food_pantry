var express = require('express');
var router = express.Router();


var data = [];

router.get('/', function(req, res) {
    res.render('../views/login', { title: '' });
});

router.get('/login', function(req, res) {
    console.log("Order placed")
        // res.render('../views/login', { title: ''});
});


router.post('/foodhome', function(req, res) {
    if (req.body.Logout) {
        res.render('../views/login', { title: '' });
    } else if (req.body.username === 'user' && req.body.password === 'password') {
        res.render('../views/pantryhome', { title: req.body.username });
    } else {
        res.send('Wrong username or password');
    }
});


router.post('/zones', function(req, res) {
    console.log(req.body);
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

router.post('/billing', function(req, res) {
    console.log(req.body);
    var arr1 = Object.keys(req.body);
    console.log(arr1);
    // req.body(item=>{
    // 	registeredUsers.push(items);
    // })
    //res.render('../views/billing', { items: arr1 });
});


module.exports = router;