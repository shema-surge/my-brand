const emailValidationErr=document.getElementById("emailValidationErr")
const emailInput=document.getElementById("emailInput")
const passwdInput=document.getElementById("passwdInput")
const passwdValidationErr=document.getElementById("passwdValidationErr")
const loginBtn=document.querySelector("#loginBtn")
const errMessage=document.querySelector(".errMessage")

emailInput.addEventListener('keypress',(e)=>{
    emailValidationErr.textContent=validateEmail(emailInput.value)
})

emailInput.addEventListener('keyup',(e)=>{
    emailValidationErr.textContent=validateEmail(emailInput.value)
})

passwdInput.addEventListener("keyup",()=>{
    passwdValidationErr.textContent=validateEmptyPasswd(passwdInput.value)
})

passwdInput.addEventListener("mouseleave",()=>{
    passwdValidationErr.textContent=validateEmptyPasswd(passwdInput.value)
})

loginBtn.addEventListener("click",async()=>{
    console.log("Hello")
    if(validateEmail(emailInput.value) || !passwdInput.value){
        errMessage.style.display="block"
        errMessage.innerHTML="<p>Please fill the form as instructed.</p>"
    }else{
        errMessage.style.display="none"
        axios.post("http://127.0.0.1:4500/login",{email:emailInput.value,password:passwdInput.value})
        .then(res=>{
            console.log(res.data)
            document.cookie=`token=${res.data.token}`
            if(res.data.user.status==="inactive"){
                window.location.href='./activate.html'
                return
            }
            window.location.href="/dashboard.html"
        }).catch(err=>{
            console.log(err)
            errMessage.style.display="block"
            errMessage.innerHTML=`<p>${err.message}</p>`
        })


    }
})


