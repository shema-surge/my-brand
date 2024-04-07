const searchBar=document.querySelector(".searchContainer")

searchBar.addEventListener('keyup',()=>{
  console.log(searchBar.value)
  axios.post('http://127.0.0.1:4500/posts/searchUserPosts/',
  {keyword:searchBar.value},
  {
    headers: {
      'authorization': `Bearer ${token}`
    }
  }).then(res=>{
    console.log(res.data)
    renderPosts(res.data.posts)
  }).catch(err=>{
    console.log(err)
  })
})

const renderPosts = (posts) => {
  const postContainer = document.querySelector(".posts")
  postContainer.innerHTML = ''
  if(posts.length===0) return
  posts.forEach(post => {
    const postDiv = document.createElement('div')
    postDiv.classList.add('post')
    postDiv.innerHTML += `
            <div class="postData">
              <p class="postTitle">${post.title}</p>
              <p class="postDate">Published: ${new Date(post.createdAt).toLocaleString()}</p>
            </div>
            <div class="postSideContainer">
              <div class="interactions">
                <div class="postViews">
                  <i class="fa-regular fa-eye"></i>
                  <p>${post.views}</p>
                </div>
                <div class="postLikes">
                  <i class="fa-regular fa-heart"></i>
                  <p>${post.likes}</p>
                </div>
                <div class="postComments">
                  <i class="fa-regular fa-comment"></i>
                  <p>${post.comments}</p>
                </div>
              </div>
              <i class="fa-solid fa-ellipsis moreOptionsBtn"></i>
              <div class="postOptions options">
                <a href="/editPost.html?pid=${post._id}">Edit</a>
                <a href="#" onclick="renderDeleteDialog('${post._id}')">Delete</a>
              </div>
            </div>
            `
    postContainer.appendChild(postDiv)
  })

  const moreOptionsBtn = document.querySelectorAll(".moreOptionsBtn")
  let currentActive = null

  moreOptionsBtn.forEach(btn => {
    btn.addEventListener('click', (event) => {
      let optionMenu = btn.nextElementSibling
      if (optionMenu.style.display === "flex") {
        currentActive = null
        optionMenu.style.display = "none"
        return
      }
      if (currentActive) currentActive.style.display = "none"
      optionMenu.style.display = "flex"
      currentActive = optionMenu
    })
  })

  document.addEventListener('click', (event) => {
    if (currentActive && currentActive.previousElementSibling != event.target) {
      currentActive.style.display = "none"
    }
  })
}


function handlePostDelete(postId) {
  axios.delete(`http://127.0.0.1:4500/posts/deletePost/${postId}`, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  })
    .then((res) => {
      loadPosts()
    }).catch(err => {
      console.log(err)
    })
}

function renderDeleteDialog(id) {
  const popup = document.querySelector(".popupDialog")
  const confirmBtn = document.querySelector("#confirmBtn")
  const cancelBtn = document.querySelector("#cancelBtn")
  const dialog = document.querySelector(".dialog")
  popup.style.display = "flex"
  dialog.innerText = "Are you sure you want to delete this post?"
  confirmBtn.addEventListener('click', () => {
    handlePostDelete(id)
    popup.style.display = "none"
  })
  cancelBtn.addEventListener('click', () => {
    popup.style.display = "none"
  })
}

function loadPosts() {
  axios.get(`http://127.0.0.1:4500/posts`, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  }).then(res => {
    console.log(res.data)
    renderPosts(res.data.posts)
  }).catch(err => {
    console.log(err)
  })
}

loadPosts()