const nameValidationErr=document.getElementById("nameValidationErr")
const nameInput=document.getElementById("nameInput")
const emailValidationErr=document.getElementById("emailValidationErr")
const emailInput=document.getElementById("emailInput")
const passwdValidationErr=document.getElementById("passwdValidationErr")
const passwdInput=document.getElementById("passwdInput")
const verifyPasswdValidationErr=document.getElementById("verifyPasswdValidationErr")
const verifyPasswdInput=document.getElementById("verifyPasswdInput")

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