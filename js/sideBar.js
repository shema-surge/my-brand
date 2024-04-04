const headers={
    'authorization':`Bearer ${token}`
}

const getPosts=()=>axios.get('http://172.21.126.12:4500/posts',{headers:headers})
const getMessages=()=>axios.get('http://172.21.126.12:4500/messages',{headers:headers})
const getUsers=()=>axios.get('http://172.21.126.12:4500/users',{headers:headers})
const getNotifications=()=>axios.get('http://172.21.126.12:4500/notifications',{headers:headers})

const loadSideBar=()=>{
    Promise.all([getPosts(),getMessages(),getUsers(),getNotifications()])
    .then(res=>{
        document.querySelector("#postsCounter").innerText=res[0].data.posts.length
        document.querySelector("#mobilePostsCounter").innerText=`Posts (${res[0].data.posts.length})`
        document.querySelector("#messagesCounter").innerText=res[1].data.messages.length
        document.querySelector("#mobileMessagesCounter").innerText=`Messages (${res[1].data.messages.length})`
        document.querySelector("#usersCounter").innerText=res[2].data.users.length
        document.querySelector("#mobileUsersCounter").innerText=`Users (${res[2].data.users.length})`
        document.querySelector("#notificationsCounter").innerText=res[3].data.notifications.length
        document.querySelector("#mobileNotificationsCounter").innerText=`Notifications (${res[3].data.notifications.length})`
    })
    .catch(err=>{
        console.log(err)
    })
}

loadSideBar()