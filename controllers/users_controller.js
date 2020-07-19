// module.exports.profile=function(req,res){
//     return res.end(`<h1>Users profile</h1>`)
//   }
  
const User=require('../models/user')
  module.exports.profile=function(req,res){
    return res.render('users_profile',{
      title:"Profile"
    })
  }
  
  //render the sign up page
  module.exports.signUp=function(req,res){
      
    if(req.isAuthenticated()){     //restrict to go to profile page only.
      return res.redirect('/users/profile')
    }

    return res.render('user_sign_up',{
      title:"SignUp"
    })
  }

  //render the sign in page
  module.exports.signIn=function(req,res){

    if(req.isAuthenticated()){
      return res.redirect('/users/profile')
    }

    return res.render('user_sign_in',{
      title:"SignIn"
    })
  }

  //module.exports.actionName=function(){}


  //get the sign-up data
  module.exports.create=function(req,res){
    if(req.body.password !=req.body.confirm_password){
      return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
                  if(err){
                    console.log('error in finding user in signing-up') 
                    return;
                  }
           if(!user){
             User.create(req.body,function(err,user){
               if(err){
              console.log('error in creating user while signing-up')
              return;
             }
             res.redirect('/users/sign-in');
            })
           }
           else{
             res.redirect('back');
           }
    });
  }

  //sign in and create the session 
  module.exports.createSession=function(req,res){
    return res.redirect('/users/profile');
  }