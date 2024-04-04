const nameValidationErr=document.getElementById("nameValidationErr")
const nameInput=document.getElementById("nameInput")
const emailValidationErr=document.getElementById("emailValidationErr")
const emailInput=document.getElementById("emailInput")
const passwdValidationErr=document.getElementById("passwdValidationErr")
const passwdInput=document.getElementById("passwdInput")
const verifyPasswdValidationErr=document.getElementById("verifyPasswdValidationErr")
const verifyPasswdInput=document.getElementById("verifyPasswdInput")
const signupBtn=document.querySelector("#signupBtn")
const errMessage=document.querySelector(".errMessage")

nameInput.addEventListener('keypress',(e)=>{
    nameValidationErr.textContent=validateName(nameInput.value)
})

nameInput.addEventListener('keyup',(e)=>{
    nameValidationErr.textContent=validateName(nameInput.value)
})

emailInput.addEventListener('keypress',(e)=>{
    emailValidationErr.textContent=validateEmail(emailInput.value)
})

emailInput.addEventListener('keyup',(e)=>{
    emailValidationErr.textContent=validateEmail(emailInput.value)
})

passwdInput.addEventListener('keypress',(e)=>{
    passwdValidationErr.textContent=validatePasswd(passwdInput.value)
})

passwdInput.addEventListener('keyup',(e)=>{
    passwdValidationErr.textContent=validatePasswd(passwdInput.value)
})

verifyPasswdInput.addEventListener('keyup',(e)=>{
    verifyPasswdValidationErr.textContent=verifyPasswords(passwdInput.value,verifyPasswdInput.value)
})

signupBtn.addEventListener("click",async()=>{

    if(validateName(nameInput.value) || validateEmail(emailInput.value) || validatePasswd(passwdInput.value) || verifyPasswords(passwdInput.value,verifyPasswdInput.value)){
        errMessage.style.display="block"
        errMessage.innerHTML="<p>Please fill the form as instructed.</p>"
    }else{
        errMessage.style.display="none"
        const response=await fetch('http://172.21.126.12:4500/signup',{
            method:'post',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({name:nameInput.value,email:emailInput.value,password:passwdInput.value,verifyPassword:verifyPasswdInput.value})
        })
        const data=response.json()
        if(!data){
            errMessage.style.display="block"
            errMessage.innerHTML=`<p>Couldn't reach the server, Try again.</p>`
        }
        if(response.status!==200){
            errMessage.style.display="block"
            errMessage.innerHTML=`<p>${data.message}.</p>`   
        }else{
            window.location.href="/login.html"
        }
    }
})