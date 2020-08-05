const Post=require('../models/posts');
const User=require('../models/user')
// module.exports.home=function(req,res){
//   return res.end(`<h1>Express is up for Codeian</h1>`)
// }




// module.exports.home=function(req,res){
//   // console.log(req.cookies);  //manually set the cookie in inspect appli and check throuh here
//   // res.cookie('user_id',10); //way to send the cookie to server side ...can be checked through inspect application
//   // return res.render('home',{
//   //   title:"Home"
//   // })

//   // Post.find({},function(err,posts){
//   //   return res.render('home',{
//   //     title:'Codial | Home',
//   //     posts: posts
//   //   });
//   // });
  
//   Post.find({})
//   .populate('user')
//   .populate({
//     path:'comments',
//     populate:{
//       path:'user'
//     }
//   })
//   .exec(function(err,posts){
    
//     User.find({},function(err,users){
//       return res.render('home',{
//         title:'Codial | Home',
//         posts: posts,
//         all_users:users
//     });
//   });
// });
// }

//optimizing by adding async and await.
module.exports.home=async function(req,res){

  try{
  let posts= await Post.find({})
  .sort('-createdAt')
  .populate('user')
  .populate({
   path:'comments',
    populate:{
    path:'user'
  }
});

let users= await User.find({});

return res.render('home',{
  title:'Codial | Home',
  posts: posts,
  all_users:users
});
  }catch(err){
    console.log('Error:'+err);
    return;
  }
}

//module.exports.actionName=function(){}