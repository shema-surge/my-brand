const navItems = document.querySelectorAll('.nav-item')
const menu = document.querySelector(".menu")

const header = document.querySelector('header')
const mobileHeader = document.querySelector('.mobileHeader')

const closeBtn = document.querySelector('.backBtn')

const navigation = document.querySelector(".navigation")

let token

navItems.forEach(navItem => {
    navItem.addEventListener('mouseenter', () => {
        navItem.children[0].style.width = '100%';
    })
    navItem.addEventListener('mouseleave', () => {
        navItem.children[0].style.width = '10px';
    })
    navItem.addEventListener('click', () => {
        mobileHeader.style.display = "none"
    })
})

window.addEventListener('resize', () => {
    if (window.innerWidth >= 700) {
        mobileHeader.style.display = "none"
        header.style.display = "flex"
    }
})


menu.addEventListener('click', () => {
    mobileHeader.style.display = "flex"
    header.style.display = "none"
})

closeBtn.addEventListener('click', () => {
    mobileHeader.style.display = "none"
    header.style.display = "flex"
})

try{
    if (!document.cookie) throw new Error('Missing cookies, please login again')
    token = document.cookie.split('=')[1]
    if (!token) throw new Error('Invalid token')
}catch(err){
    console.log(err)
    if(window.location.href!=="/") window.location.href="./login.html"
}

function loadProfile(){

    axios.get('http://127.0.0.1:4500/users/current',{
    headers:{
        'authorization':`Bearer ${token}`
    }})
    .then(res=>{

        if(res.status!==200) throw new Error(res.data.message)

        const wideScreenProfile = document.createElement('div')
        wideScreenProfile.classList.add('profileContainer')
        wideScreenProfile.innerHTML=`
        <div>
            <img class="profileImg" src="${res.data.user.profileImg}" alt="" />
            <p>${res.data.user.name}</p>
        </div>
        <i class="fa-solid fa-chevron-down"></i>
        `

        const mobileScreenProfile = document.createElement('div')
        mobileScreenProfile.classList.add('profileContainer')
        mobileScreenProfile.innerHTML=`
        <div>
            <img class="profileImg" src="${res.data.user.profileImg}" alt="" />
            <p>${res.data.user.name}</p>
        </div>
        <i class="fa-solid fa-chevron-down"></i>
        `

        const profileOptions = document.createElement('div')
        profileOptions.classList.add("profileOptions")
        profileOptions.innerHTML=`
        <a href="./dashboard.html">Dashboard</a>
        <a href="./blog.html">Log out</a>
        `

        const mobileProfileOptions = document.createElement('div')
        mobileProfileOptions.classList.add("mobileProfileOptions")
        mobileProfileOptions.innerHTML=`
        <a href="./dashboard.html">Dashboard</a>
        <a href="./blog.html">Log out</a>
        `


        wideScreenProfile.addEventListener('click', () => {
            if (profileOptions.style.display === "flex") {
                profileOptions.style.display = "none"
                return
            }
            profileOptions.style.display = "flex"
        })

        mobileScreenProfile.addEventListener('click', () => {
            if (mobileProfileOptions.style.display === "flex") {
                mobileProfileOptions.style.display = "none"
                return
            }
            mobileProfileOptions.style.display = "flex"
        })

        document.addEventListener('click', (event) => {
            if (!wideScreenProfile.contains(event.target)) {
                profileOptions.style.display = "none"
            }
        })

        window.addEventListener('resize', () => {
            if (window.innerWidth < 700) {
                profileOptions.style.display="none"
            }
        })

        header.appendChild(wideScreenProfile)
        header.appendChild(profileOptions)

        mobileHeader.appendChild(mobileScreenProfile)
        mobileHeader.appendChild(mobileProfileOptions)
    })
    .catch(err=>{
        console.log(err)

        const loginBtn=document.createElement('a')
        loginBtn.classList.add('btn')
        loginBtn.setAttribute("id","loginBtn")
        loginBtn.setAttribute("href","./login.html")
        loginBtn.innerText='Login'

        const mobileLoginBtn=document.createElement('a')
        mobileLoginBtn.classList.add('btn')
        mobileLoginBtn.setAttribute("id","mobileLoginBtn")
        mobileLoginBtn.setAttribute("href","./login.html")
        mobileLoginBtn.innerText='Login'

        header.appendChild(loginBtn)
        mobileHeader.appendChild(mobileLoginBtn)

        window.addEventListener('resize', () => {
            if (window.innerWidth < 700) {
                loginBtn.style.display="none"
            }else{
                loginBtn.style.display="block"
            }
        })
    })
}

loadProfile()



