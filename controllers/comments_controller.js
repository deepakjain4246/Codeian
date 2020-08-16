const Comment= require('../models/comment');
const commentsMailer = require('../mailers/comments_mailer')
const Post=require('../models/posts')

module.exports.create=async function(req,res){
   
        try{
            let post=await Post.findById(req.body.post);
            if(post){
                let comment= await Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user:req.user._id
                });
                    post.comments.push(comment);
                    post.save();
                   //res.redirect('/');
                   comment = await comment.populate('user','name email').execPopulate();
                   commentsMailer.newComment(comment);

                   if(req.xhr){
                       return res.status(200).json({
                           data:{
                               comment:comment
                           },
                           message:"Post Created"
                       })
                   }
                   req.flash('success','comment Published');
                }
        }catch(err){
            console.log('Error'+err);
            return;
        }
    }

   


module.exports.destroy=async function(req,res){
    let comment=await Comment.findById(req.params.id);
    try{
            if(comment.user==req.user.id){
            let postId=comment.post;
            comment.remove();
            let post= await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
            return res.redirect('back');
            }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error'+err);
        return;
    } 
}