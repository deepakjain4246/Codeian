// module.exports.profile=function(req,res){
//     return res.end(`<h1>Users profile</h1>`)
//   }
  

  module.exports.profile=function(req,res){
    return res.render('users_profile',{
      title:"Profile"
    })
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