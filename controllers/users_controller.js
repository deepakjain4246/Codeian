// module.exports.profile=function(req,res){
//     return res.end(`<h1>Users profile</h1>`)
//   }
const path = require('path');
const fs = require('fs');
const User=require('../models/user')
  module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
      return res.render('users_profile',{
        title:"User Profile",
        profile_user:user
    });
    });
  }


  // module.exports.update = function(req,res){
  //   if(req.user.id == req.params.id){
  //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
  //       return res.redirect('back');
  //     });
  //   }else{
  //     return res.status(401).send('unauthorized');
  //   }
  // }

  module.exports.update =async function(req,res){
    if(req.user.id == req.params.id){
      try{
        let user=await User.findById(req.params.id);
        User.uploadedAvatar(req,res,function(err){
          if(err){console.log('**************Multer Error:'+err)}
          
          user.name=req.body.name;
          user.email=req.body.email;
   
          //saving the file path into avatar field in user
          if(req.file){
              
            //if file alredy exists it deletes the previous file.
            if(user.avatar){
            fs.unlinkSync(path.join(__dirname,'..',user.avatar));
            }
                user.avatar=User.avatarPath+'/'+req.file.filename;
         }
         user.save();
         req.flash('success','Updated!');
         return res.redirect('back');
        });
      }catch(err){
        req.flash('error',err);
        return res.redirect('back');
      }
      
      // User.findById(req.params.id,req.body,function(err,user){
      //   return res.redirect('back');
      // });
    }else{
      req.flash('error','Unauthorized');
      return res.status(401).send('unauthorized');
    }
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
    req.flash('success','Logged in successfully!');
    return res.redirect('/');
  }

  //destroy session
  module.exports.destroySession=function(req,res){
    req.logout();
    req.flash('success','You have been logged out!');
    return res.redirect('/');
  }