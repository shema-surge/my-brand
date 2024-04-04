const profileSection=document.querySelector(".profileSection")
const postContainer=document.querySelector(".postContainer")
const errMessage=document.querySelector(".errMessage")

window.addEventListener('DOMContentLoaded',async()=>{
    //render blog posts
    try{
        const postsResponse=await fetch('http://172.21.126.12:4500/posts/getAllPosts')
        const postData=await postsResponse.json()
        if(postsResponse.status!==200) throw new Error(postData.message)
        if(postData.posts) renderBlogPosts(postData.posts)
    }catch(err){
        console.log(err)
        errMessage.style.display="block"
        errMessage.innerHTML=err.message
    }
})

const renderBlogPosts=(posts)=>{
    postContainer.innerHTML=''
    if(posts.length==0){
        postContainer.innertHTML=`<div class="emptyMessage"><p>No posts available</p></div>`
        return
    }

    posts.forEach(post => {
        const postDiv=document.createElement('div')
        postDiv.classList.add('post')
        postDiv.innerHTML+=`
        <div class="post">
        <a class="postTitle" href="./post.html?pid=${post._id}"
          >${post.title}</a
        >
        <a class="postReadMore" href="./post.html?pid=${post._id}">Read more</a>
        <div class="stats">
          <div>
            <i class="fa-regular fa-heart"></i>
            <p>${post.likes} likes</p>
          </div>
          <div>
            <i class="fa-regular fa-comment"></i>
            <p>${post.comments} comments</p>
          </div>
        </div>
      </div
        `
        postContainer.appendChild(postDiv)
    });
}
