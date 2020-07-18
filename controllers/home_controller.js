// module.exports.home=function(req,res){
//   return res.end(`<h1>Express is up for Codeian</h1>`)
// }



module.exports.home=function(req,res){
  console.log(req.cookies);  //manually set the cookie in inspect appli and check throuh here
  res.cookie('user_id',10); //way to send the cookie to server side ...can be checked through inspect application
  return res.render('home',{
    title:"Home"
  })
}

//module.exports.actionName=function(){}