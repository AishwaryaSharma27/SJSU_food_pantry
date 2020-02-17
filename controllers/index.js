
var express = require('express');
var router = express.Router();


var data=[];

router.get('/', function(req, res)
{
	res.render('../views/login', { title: ''});
});


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



module.exports = router;