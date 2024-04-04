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
        const response=await fetch("http://172.21.126.12:4500/login",{
            method:"post",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({email:emailInput.value,password:passwdInput.value})
        })
        const data=await response.json()
        if(!data){
            errMessage.style.display="block"
            errMessage.innerHTML=`<p>Couldn't reach server</p>`
            return
        }

        if(response.status!==200){
            errMessage.style.display="block"
            errMessage.innerHTML=`<p>${data.message}</p>`
            return
        }

        document.cookie=`token=${data.token}`
        window.location.href="/dashboard.html"
    }
})


