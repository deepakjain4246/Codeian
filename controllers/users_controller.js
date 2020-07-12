// module.exports.profile=function(req,res){
//     return res.end(`<h1>Users profile</h1>`)
//   }
  

  module.exports.profile=function(req,res){
    return res.render('users_profile',{
      title:"Profile"
    })
  }
  
  //module.exports.actionName=function(){}