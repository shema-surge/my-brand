function renderUsers(){
    const usersContainer=document.querySelector(".users")

    axios.get('http://172.21.126.12:4500/users/',{
        headers:{
            'authorization':`Bearer ${token}`
        }
    }).then(res=>{
        console.log(res.data.users)
        res.data.users.forEach(user => {
            const userDiv=document.createElement('div')
            userDiv.classList.add('user')
            userDiv.innerHTML=`
                <div class="userData">
                  <img src="${user.profileImg}" alt="">
                  <div class="userInfo">
                    <div class="nameContainer">
                      <p>Name:</p>
                      <p>
                        ${user.name}
                      </p>
                    </div>
                    <div class="userEmail">
                      <p>From:</p>
                      <p>
                        ${user.email}
                      </p>
                    </div>
                    <div class="userJoined">
                      <p>Joined:</p>
                      <p>
                        ${new Date(user.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div class="userRole">
                      <p>Role:</p>
                      <select name="role">
                          <option value="admin" ${user.role==='admin'?'selected':''}>admin</option>
                          <option value="user" ${user.role==='user'?'selected':''}>user</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="actionButtons">
                  <a class="changeRoleBtn" href="#">Change Role</a>
                  <a class="deleteBtn" href="#">Delete</a>
                </div>
            `
            usersContainer.appendChild(userDiv)
        })

    }).catch(err=>{
        console.log(err)
    })

}

renderUsers()