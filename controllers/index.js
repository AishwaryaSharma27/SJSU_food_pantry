var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const config = require("config");

const User = require("../models/user");
const Products=require("../models/products");
var cart=[];
var user = new Map();
var firstName="";
var lastName="";
var studentId="";
var search="";
router.get('/', function(req, res) {
  let sess = req.session;
  if(sess.studentId)
  {
    res.render('../views/pantryhome', { title: sess.studentId });
  }
    res.render('../views/login', { title: '' });
});

router.post('/foodhome', function(req, res) {
  let sess = req.session;

  User.findOne({studentId:req.body.username,password:req.body.password}).then(item=>{
       if(item){
        sess.studentId = req.body.username;
        res.cookie('username',req.body.username)
        console.log(item.firstName);
        firstName=item.firstName;
        lastName=item.lastName;
        studentId=item.studentId;
        res.render('../views/pantryhome', { title:item.firstName});
        
       }
       else {
      
        res.send('Wrong username or password. or User not found,Please Signin');
    }
  });
    
    
});

router.post('/submitsearch', function(req, res) {
  var search=req.body.search;
  Products.findOne({productName:search}).then(product => {
    if(product)
    {
      
      var zone=product.zoneNumber
      console.log("Search Result Document for",search);
      console.log(search +" belongs to "+zone);
      console.log(product)
      if (zone=="zone1") {
        res.render('../views/zone1', { title: 'zone1', name: 'zone1' });
    } else if (zone=="zone2") {
        res.render('../views/zone2', { title: 'zone2', name: 'zone2' });
    } else {
        res.render('../views/zone3', { title: 'zone3', name: 'zone3' });
    }
      
    }
    else
    {
    res
    .status(400)
    .json({ errors: [{ msg: "No product found" }] });
    };
    // product.exec(function (err, products) {
    //   if (err) return handleError(err);
//});
});
});

router.post('/submititem', function(req, res) {
  var search=req.body.search;
  var result=[]
  Products.find({zoneNumber:search}).then(product => {
      
    if(product)
    {
      console.log("Display Result Documents for",search);
      console.log(product);
      product.forEach(item=>{
        result.push(item.productName);
      });
       res.render('../views/displayResult',{items:result});
    }
    else
    {
    res
    .status(400)
    .json({ errors: [{ msg: "No zones found" }] });
    };
    // product.exec(function (err, products) {
    //   if (err) return handleError(err);
//});
});
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

router.get('/searchitem', function(req, res) {
  res.render('../views/displaySearch', { items: cart });
});

router.get('/orderplace', function(req, res) {
  res.render('../views/orderplace', { items: cart });
});
router.get('/signup', function(req, res) {
  res.render('../views/signup');
});

router.post('/signup', function(req, res)
{
  var id=req.body.studentId;
  console.log(id);
  user.set(
    id , {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        studentId: req.body.studentId,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
        }
  );


  const { firstName, lastName,studentId,password } = req.body;
  User.findOne({ studentId }).then(user => {
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "User already exists" }] });
    } else {
      const user = new User({
        firstName,
        lastName,
        studentId,
        password
      });

      
          user
            .save()
            .then(student=>{
              console.log("Insert Document for User",firstName);
              console.log(student);
            })
            .catch(err => console.log(err));
    }
  });

});

router.get('/profile/:title',function(req,res){
  var studentID=req.params.title;
  console.log(firstName)
  res.render('../views/profile', { "username" : studentID,"firstName":firstName,"lastName":lastName,"studentId":studentId} );
})  

router.get('/deleteprofile/:studentId',function(req,res){
       var studentId=req.params.studentId;
       console.log("in delete",studentId)
       res.render('../views/deleteuser', {"studentID" : studentId} );
})

router.post('/deleteuser/:studentID',function(req,res){
  var studentID=req.params.studentID;
  User.findOneAndDelete({studentId:studentID},function(err){
    if(!err){
      console.log("Deleting User: ",firstName);
      res.send("Deleted User");
    }
    else{
      console.log("not FOund");
    }
  })
})

router.post('/updateuser/:username',function(req,res){
  var studentID=req.params.username;
  console.log("in update",req.body);
  console.log("sd",studentId)
  const{firstName,lastName}=req.body;
  const profileFields={};
  profileFields.firstName=firstName;
  profileFields.lastName=lastName;
  profileFields.studentId=req.body.studentId;
  User.findOne({studentId:studentId}).then(profile =>{
    if(profile){
      User.findOneAndUpdate({ studentId: studentId },
        { $set: profileFields },
        { new: true }).then(updatedProfile => {
          console.log("Updating the user document for: ",firstName)
          console.log(updatedProfile);
          res.send("Updated Profile")
        })
      }
    
  })
  //   if(!err){
  //     console.log("Modification");
  //     res.send("Deleted User");
  //   }
  //   else{
  //     console.log("not FOund");
  //   }
  // })
})

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
  console.log(req.body);
  res.render('../views/orderplace');
  
});

router.get('/logout', function(req, res){
  req.session.destroy((err) => {
      if(err) {
        return console.log(err);
      }
      res.redirect('/');
  });
});
module.exports = router;