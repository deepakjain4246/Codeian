// module.exports.profile=function(req,res){
//     return res.end(`<h1>Users profile</h1>`)
//   }
  
const User=require('../models/user')

  module.exports.profile=function(req,res){
    return res.render('users_profile',{
      title:"Profile"
    });
  }
  
  //render the sign up page
  module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
      title:"SignUp"
    })
  }

  //render the sign in page
  module.exports.signIn=function(req,res){
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
    
    //steps to authenticate
    //find user
    User.findOne({email:req.body.email},function(err,user){
      if(err){
        console.log('error in finding user in signing-up') 
        return;
      }

      //handle user found
       if(user){
           
         //handle pass which doesnot match
         if(user.password!=req.body.password){
           return res.redirect('back');
         }
         //handle when pass match ...create a session
          res.cookie('user_id',user.id);
          return res.redirect('/users/profile');
       }
       //handle user not found
       else{
        return res.redirect('back');
       }
    })
  }