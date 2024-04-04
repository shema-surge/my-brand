const postContainer = document.querySelector(".postContainer")
const commentInput = document.querySelector("#commentInput")
const commentBtn = document.querySelector("#commentBtn")
const commentsContainer = document.querySelector(".comments")

window.addEventListener("DOMContentLoaded", async () => {
  await renderBlog()
  await renderComments()
})

const renderBlog = async () => {
  try {
    if (!document.cookie) throw new Error('Missing cookies, please login again')
    const token = document.cookie.split('=')[1]

    if (!token) throw new Error('Invalid token')
    const params = new URLSearchParams(window.location.search)
    const postId = params.get("pid")
    if (!postId) throw new Error('No post Id Provided')

    const postResponse = await fetch(`http://172.21.126.12:4500/posts/${postId}`, {
      method: 'get',
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
    const postData = await postResponse.json()
    console.log(postData)
    if (postResponse.status !== 200) throw new Error(postData.message)

    postContainer.innerHTML = `
        <h1>${postData.post.title}</h1>
        <p class="postDate">${new Date(postData.post.createdAt).toDateString()}</p>
        ${postData.post.content}
        <div class="stats">
          <div id="postLikesBtn"">
            <i class="fa-regular fa-heart"></i>
            <p >${postData.post.likes} likes</p>
          </div>
          <div id="postComments">
            <i class="fa-regular fa-comment"></i>
            <p>${postData.post.comments} comments</p>
          </div>
        </div>`

    document.querySelector("#postLikesBtn").addEventListener('click', () => {
      axios.get(`http://172.21.126.12:4500/posts/likePost/${postId}`, {
        headers: {
          'authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          console.log(res.data)
          document.querySelector("#postLikesBtn>p").innerText = `${res.data.post.likes} likes`
        }).catch(err => {
          console.log(err)
        })
    })

  } catch (err) {
    console.log(err)
  }
}


const renderComments = async () => {
  try {
    const params = new URLSearchParams(window.location.search)
    const postId = params.get("pid")
    if (!postId) throw new Error('No post Id Provided')
    const commentsResponse = await fetch(`http://172.21.126.12:4500/comments/${postId}`, {
      method: 'get',
    })
    const commentsData = await commentsResponse.json()
    console.log(commentsData)
    if (commentsResponse.status !== 200) throw new Error(commentsData.message)

    commentsContainer.innerHTML = ""


    commentsData.comments.forEach(com => {
      const comment = document.createElement('div')
      comment.classList.add('comment')

      comment.innerHTML += `
            <div class="commentTopBar">
            <div class="commentInfo">
              <div class="profile">
                <img src="${com.author.profileImg}" alt="" />
                <p>${com.author.name}</p>
              </div>
              <p class="commentDate">${new Date(com._doc.createdAt).toDateString()}</p>
            </div>
            <i class="fa-solid fa-ellipsis moreOptionsBtn"></i>
            <div class="commentOptions options">
              <a href="">Edit</a>
              <a href="#" onclick="renderDeleteDialog('${com._doc._id}')">Delete</a>
            </div>
            </div>
            <p class="commentContent">
            ${com._doc.content}
            </p>
            <div class="stats">
              <div>
                <i class="fa-regular fa-heart"></i>
                <p id="commentLikes">${com._doc.likes} likes</p>
              </div>
            </div>
            `
      commentsContainer.appendChild(comment)

    })

    if (document.getElementById('postComments')) {
      document.getElementById('postComments').innerHTML = `
          <i class="fa-regular fa-comment"></i>
          <p>${commentsData.comments.length} comments</p>`
    }

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

  } catch (err) {
    console.log(err)
  }
}

function handleCommentLikes(element, commentId) {
  axios.get(`http://172.21.126.12:4500/comments/likeComment/${commentId}`, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  })
    .then(res => {
      element.innerText = `${res.data.comment.likes} likes`
    }).catch(err => {
      console.log(err)
    })
}

function handleCommentDelete(commentId) {
  axios.delete(`http://172.21.126.12:4500/comments/deleteComment/${commentId}`, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  })
    .then(async(res) => {
      console.log(res.status)
      await renderComments()
    }).catch(err => {
      console.log(err)
    })
}

function renderDeleteDialog(id){
  const popup=document.querySelector(".popupDialog")
  const confirmBtn=document.querySelector("#confirmBtn")
  const cancelBtn=document.querySelector("#cancelBtn")
  const dialog=document.querySelector(".dialog")
  popup.style.display="flex"
  dialog.innerText="Are you sure you want to delete this comment?"
  confirmBtn.addEventListener('click',()=>{
    handleCommentDelete(id)
    popup.style.display="none"
  })
  cancelBtn.addEventListener('click',()=>{
    popup.style.display="none"
  })
}

commentBtn.addEventListener("click", async () => {
  try {
    if (!commentInput.value) throw new Error('Empty comment input field')
    if (!document.cookie) throw new Error('Missing cookies, please login again')
    const token = document.cookie.split('=')[1]

    if (!token) throw new Error('Invalid token')
    const params = new URLSearchParams(window.location.search)
    const postId = params.get("pid")
    if (!postId) throw new Error('No post Id Provided')
    const commentResponse = await fetch(`http://172.21.126.12:4500/comments/newComment/${postId}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ content: commentInput.value })
    })
    const commentData = await commentResponse.json()
    console.log(commentData)
    if (commentResponse.status !== 200) throw new Error(commentData.message)
    await renderComments()
  } catch (err) {
    console.log(err)
  }
})