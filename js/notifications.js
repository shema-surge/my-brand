function renderNotifications() {
    const notificationsContainer = document.querySelector(".notifications")
    axios.get('http://127.0.0.1:4500/notifications/', {
        headers: {
            'authorization': `Bearer ${token}`
        }
    }).then(res => {
        console.log(res.data.notifications)
        notificationsContainer.innerHTML=""
        res.data.notifications.forEach(notification => {
            const notificationDiv = document.createElement('div')
            notificationDiv.classList.add('notification')
            notificationDiv.innerHTML = `
            <p class="notificationContent">${notification.content}</p>
            <div class="notificationSideContainer">
                <p class="notificationTime">${new Date(notification.createdAt).toLocaleString()}</p>
                <i class="fa-solid fa-ellipsis moreOptionsBtn"></i>
                <div class="notificationOptions options">
                  <a href="#" onclick="renderDeleteDialog('${notification._id}')">Delete</a>
                </div>
            </div>
            `
            notificationsContainer.appendChild(notificationDiv)
        })
        
        const moreOptionsBtn = document.querySelectorAll(".moreOptionsBtn")
        let currentActive = null

        moreOptionsBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                console.log("Clicked")
                let optionMenu = btn.nextElementSibling
                console.log(optionMenu.style.display)
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

    }).catch(err => {
        console.log(err)
    })
}

function renderDeleteDialog(nid){
    const popup=document.querySelector(".popupDialog")
    const confirmBtn=document.querySelector("#confirmBtn")
    const cancelBtn=document.querySelector("#cancelBtn")
    const dialog=document.querySelector(".dialog")
    popup.style.display="flex"
    dialog.innerText="Are you sure you want to delete this notification?"
    confirmBtn.addEventListener('click',()=>{
      deleteNotification(nid)
      popup.style.display="none"
    })
    cancelBtn.addEventListener('click',()=>{
      popup.style.display="none"
    })
  }

function deleteNotification(nid){
    axios.delete(`http://127.0.0.1:4500/notifications/${nid}`,{
        headers:{
            'authorization':`Bearer ${token}`
        }
    }).then(res=>{
        console.log(res)
        renderNotifications()
    }).catch(err=>{
        console.log(err)
    })
}

renderNotifications()