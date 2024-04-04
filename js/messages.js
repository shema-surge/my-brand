const messagesContainer = document.querySelector(".messages")

const renderMessages = () => {
    console.log("Hello")
    axios.get('http://172.21.126.12:4500/messages', {
        headers: {
            'authorization': `Bearer ${token}`
        }
    })
        .then(res => {
            messagesContainer.innerHTML = ''
            res.data.messages.forEach(message => {
                const messageDiv = document.createElement('div')
                messageDiv.classList.add('message')
                messageDiv.innerHTML = `
            <div class="messageTopContainer">
                <div class="messageData">
                  <p>${message.name}</p>
                  <p class="timeSent">${new Date(message.createdAt).toLocaleString()}</p>       
                </div>
                <i class="fa-solid fa-ellipsis moreOptionsBtn"></i>
                <div class="messageOptions options">
                    <a class="messageReply" onclick="expandMessage('${message._id}')">Reply</a>
                  <a class="messageDelete" onclick="renderDeleteDialog('${message._id}')">Delete</a>
                </div>
            </div>
            <p class="senderEmail">
                <span>From:</span> ${message.email}
            </p>
            <p class="messageSubject">
                <span>Subject:</span> ${message.subject}
            </p>
            `
                messagesContainer.appendChild(messageDiv)
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


        })
        .catch((err) => {
            console.log(err)
        })
}

function expandMessage(mid) {
    const messagePopup = document.querySelector(".messagePopup")

    axios.get(`http://172.21.126.12:4500/messages/${mid}`, {
        headers: {
            'authorization': `Bearer ${token}`
        }
    })
        .then(res => {
            messagePopup.style.display = "flex"

            messagePopup.innerHTML = `
        <div class="messageTopContainer">
        <div class="messageData">
          <p id="popupMessageName">${res.data.message.name}</p>
          <p id="popupMessageTime" class="timeSent">${new Date(res.data.message.createdAt).toLocaleString()}</p>
        </div>
        <i id="messageCloseBtn" class="fa-solid fa-xmark"></i>
      </div>
      <p id="popupMessageEmail" class="senderEmail">
        <span>From:</span> ${res.data.message.email}
      </p>
      <p id="popupMessageSubject" class="messageSubject">
        <span>Subject:</span> ${res.data.message.subject}
      </p>
      <p id="popupMessageContent" class="messageContent">
        ${res.data.message.message}
      </p>
      <textarea id="replyTextArea" rows="4" cols="50" placeholder="Reply Here"></textarea>
      <a href="#" id="replyBtn" class="btn" onclick="replyMessage('${res.data.message._id}')">Reply</a>
        `

            document.querySelector("#messageCloseBtn").addEventListener('click', () => {
                messagePopup.style.display = "none"
            })

        })
        .catch(err => {
            console.log(err)
        })
}



function replyMessage(mid) {
    const reply = document.querySelector("#replyTextArea").value
    if (!reply) {
        console.log("Empty reply")
        return
    }
    axios.post(`http://172.21.126.12:4500/messages/deleteMessage/${mid}`, { reply: reply }, {
        headers: {
            'authorization': `Bearer ${token}`
        }
    }).then(res => {
        console.log(res.data)
        document.querySelector(".messagePopup").style.display="none"
        //say something
    }).catch(err => {
        console.log(err)
    })
}

function renderDeleteDialog(mid){
    if(document.querySelector(".messagePopup").style.display==="flex") return

    const popup=document.querySelector(".popupDialog")
    const confirmBtn=document.querySelector("#confirmBtn")
    const cancelBtn=document.querySelector("#cancelBtn")
    const dialog=document.querySelector(".dialog")
    popup.style.display="flex"
    dialog.innerText="Are you sure you want to delete this message?"
    confirmBtn.addEventListener('click',()=>{
      deleteMessage(mid)
      popup.style.display="none"
    })
    cancelBtn.addEventListener('click',()=>{
      popup.style.display="none"
    })
  }

function deleteMessage(mid) {
    axios.delete(`http://172.21.126.12:4500/messages/deleteMessage/${mid}`, {
        headers: {
            'authorization': `Bearer ${token}`
        }
    }).then(res => {
        console.log(res.data)
        renderMessages()
    }).catch(err => {
        console.log(err)
    })
}

renderMessages()