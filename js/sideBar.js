const sectionContainer=document.querySelector(".sectionContainer")
const mobileSectionContainer=document.querySelector(".mobileSectionContainer")

const headers={
    'authorization':`Bearer ${token}`
}

const getPosts=()=>axios.get('http://127.0.0.1:4500/posts',{headers:headers})
const getMessages=()=>axios.get('http://127.0.0.1:4500/messages',{headers:headers})
const getUsers=()=>axios.get('http://127.0.0.1:4500/users',{headers:headers})
const getNotifications=()=>axios.get('http://127.0.0.1:4500/notifications',{headers:headers})

const loadSideBar=()=>{
    Promise.all([getPosts(),getMessages(),getUsers(),getNotifications()])
    .then(res=>{

        sectionContainer.innerHTML=`
        <a href="./dashboard.html">
          <div class="section active">
            <p class="sectionName">Posts</p>
            <p id="postsCounter" class="sectionCount">${res[0].data.posts.length}</p>
          </div>
        </a>
        <a href="./dashmessages.html">
          <div class="section">
            <p class="sectionName">Messages</p>
            <p id="messagesCounter" class="sectionCount">${res[1].data.messages.length}</p>
          </div>
        </a>
        <a href="./dashusers.html">
          <div class="section">
            <p class="sectionName">Users</p>
            <p id="usersCounter" class="sectionCount">${res[2].data.users.length}</p>
          </div>
        </a>
        <a href="./dashnotifications.html">
          <div class="section">
            <p class="sectionName">Notifications</p>
            <p id="notificationsCounter" class="sectionCount">${res[3].data.notifications.length}</p>
          </div>
        </a>
        <a href="./dashaccount.html">
          <div class="section">
            <p class="sectionName">Account</p>
          </div>
        </a>
        `

        mobileSectionContainer.innerHTML=`
        <option value="Posts" selected>Posts (${res[0].data.posts.length})</option>
        <option value="Messages">Messages (${res[1].data.messages.length})</option>
        <option value="Users">Users (${res[2].data.users.length})</option>
        <option value="Notifications">Notifications (${res[3].data.notifications.length})</option>
        <option value="Account">Account</option>
        `


        /*document.querySelector("#postsCounter").innerText=res[0].data.posts.length
        document.querySelector("#mobilePostsCounter").innerText=`Posts (${res[0].data.posts.length})`
        document.querySelector("#messagesCounter").innerText=res[1].data.messages.length
        document.querySelector("#mobileMessagesCounter").innerText=`Messages (${res[1].data.messages.length})`
        document.querySelector("#usersCounter").innerText=res[2].data.users.length
        document.querySelector("#mobileUsersCounter").innerText=`Users (${res[2].data.users.length})`
        document.querySelector("#notificationsCounter").innerText=res[3].data.notifications.length
        document.querySelector("#mobileNotificationsCounter").innerText=`Notifications (${res[3].data.notifications.length})`*/
    })
    .catch(err=>{
        console.log(err)
    })
}

loadSideBar()