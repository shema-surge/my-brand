let postId

try{
    const params=new URLSearchParams(window.location.search)
    postId=params.get("pid")
    console.log(postId)
}catch(err){
    console.log(err)
}

const errMessage=document.querySelector(".errMessage")
const titleInput=document.getElementById("titleInput")

console.log(mytextarea)

window.addEventListener('DOMContentLoaded',()=>{
    axios.get(`http://172.21.126.12:4500/posts/${postId}`)
    .then(res=>{
        titleInput.value=res.data.post.title
        document.getElementById("mytextarea").value=res.data.post.content
    }).catch(err=>{
        console.log(err)
    })
})

document.getElementById("editBtn").addEventListener('click',()=>{
    const content=tinymce.get("mytextarea").getContent()

    if(!titleInput.value || !content){
        errMessage.style.display="block"
        errMessage.innerHTML=`<p>Empty Data Fields, Please fill in all required data fields.</p>`
        return
    }

    axios.post(`http://172.21.126.12:4500/posts/editPost/${postId}`,
    {
        title:titleInput.value,
        content:content
    },
    {
        headers:{
            'authorization':`Bearer ${token}` 
        }
    }).then(()=>{
        window.location.href="/blog.html"
    })
    .catch(err=>{
        console.log(err)
    })

})