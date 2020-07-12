// module.exports.home=function(req,res){
//   return res.end(`<h1>Express is up for Codeian</h1>`)
// }



module.exports.home=function(req,res){
  return res.render('home',{
    title:"Home"
  })
}

//module.exports.actionName=function(){}