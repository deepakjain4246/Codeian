{
    //method to submit the post data using AJAX
    let createPost=function(){
        let newPostForm = $('#new-post-form');
    
        newPostForm.submit(function(e){
            e.preventDefault();
        
            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),
                success:function(data){
                    //console.log(data);
                    let newPost=newpostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                },error:function(error){
                    console.log(error.responseText());
                }
            });
        });
}
//method to create a Post DOM

let newpostDom = function(post){
    return $(`<li id="post-${post._id}">
    <p>
        <small>
            <a class="delete-post-button" href="posts/destroy/${post.id}">X</a>
        </small>
        ${post.content}
    </p>
    <p>
      ${ post.user.name}
    </p>
    <div>
          <form action="/comments/create" method="POST">
              <input type="text" name="content" placeholder="Type here to add comments..." required>
              <input type="hidden" name="post" value="${post._id}">
              <input type="submit" value="Add Comment">
          </form>
    </div>
    <div class="post-comment-list">
      <ul id="post-comment-${post._id}">
      </ul>
  </div>
  </li>`)
}



createPost();
}