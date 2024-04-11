var mongoose = require('mongoose');
var User = mongoose.model('User');


exports.getUserDetails = (req,res,next)=>{
  console.log(req.body);
  User.find({"email":req.body.email, "pwd":req.body.pwd}).then(data=>{
    console.log(data);
    //data['pwd'] = '';
    res.status(200).send(data);
  }).catch(err=>{
    res.status(500).send(err);
  })
}

exports.getUserDetailsById = (req,res,next)=>{
  User.find({"email":req.params.email}).then(data=>{
    console.log(data);
    res.status(200).send(data);
  }).catch(err=>{
    res.status(500).send(err);
  })
}

exports.postNewUserDetails = (req,res,next) => {
  console.log('hy')
  var body = req.body;
  var user = new User(body);
  user.save().then(dat=>{
    console.log(dat);
    res.status(200).send(dat);
  }).catch(err=>{
    console.log(err);
    res.status(500).send(err);
  })
}

exports.updateUserDetails = (req,res,next) => {
  var body = req.body;
  var email = req.body.email
  console.log(email);
  User.updateMany({"email": email}, {$set: {"email": body.email,
   "first_name":body.first_name, "last_name":body.last_name, "update_dt":body.update_dt} },{many : true}).then(data=>{
    res.status(200).send(data);
  }).catch(err=>{
    res.status(500).send(err);
  });
}


exports.deleteUser = (req,res,next) => {
  User.remove({"email":req.params.email}).then(data=>{
    res.status(200).send(data);
  }).catch(err=>{
    res.status(500).send(err);
  })
}
