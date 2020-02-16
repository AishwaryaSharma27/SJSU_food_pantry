/**
 * http://usejsdoc.org/
 */
var express = require('express');
var router = express.Router();
// var ctrlMain = require("../controllers/main");


/*
 * GET Login page.
 */
router.get('/', function(req, res)
{
	res.render('../views/login', { title: ''});
});

// /*
//  * GET home page.
//  */
 router.post('/foodhome', function(req,res){
 if(req.body.Logout){
    res.render('../views/login', { title: ''});
}
else if(req.body.username === 'user' && req.body.password === 'password') {
    res.render('../views/pantryhome', { title: req.body.username});
} else {
    res.send('Wrong username or password');
}
 });

// /*
//  * GET restaurant page.
//  */
// router.post('/restaurant', ctrlMain.restaurant);

// /*
//  * GET billing page.
//  */
// router.post('/billing', ctrlMain.billing);

module.exports = router;