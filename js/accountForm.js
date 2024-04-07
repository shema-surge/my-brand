const nameValidationErr=document.getElementById("nameValidationErr")
const nameInput=document.getElementById("nameInput")
const profileForm=document.querySelector("#profileForm")
const profileErrMessage=document.querySelector("#profileErrMessage")

const currentPasswdValidationErr=document.querySelector("#currentPasswdValidationErr")
const newPasswdValidationErr=document.querySelector("#newPasswdValidationErr")
const confirmNewPasswdValidationErr=document.querySelector("#confirmNewPasswdValidationErr")
const currentPasswdInput=document.querySelector("#currentPasswdInput")
const newPasswdInput=document.querySelector("#newPasswdInput")
const confirmNewPasswdInput=document.querySelector("#confirmNewPasswdInput")
const passwdForm=document.querySelector("#passwdForm")
const passwdErrMessage=document.querySelector("#passwdErrMessage")

const userProfileImg=document.querySelector("#userProfileImg")
const profileImageInput=document.querySelector("#profileImageInput")

nameInput.addEventListener('keypress',(e)=>{
    nameValidationErr.textContent=validateName(nameInput.value)
})

nameInput.addEventListener('keyup',(e)=>{
    nameValidationErr.textContent=validateName(nameInput.value)
})

currentPasswdInput.addEventListener("keyup",()=>{
    currentPasswdValidationErr.textContent=validateEmptyPasswd(currentPasswdInput.value)
})

currentPasswdInput.addEventListener("mouseleave",()=>{
    currentPasswdValidationErr.textContent=validateEmptyPasswd(currentPasswdInput.value)
})

newPasswdInput.addEventListener('keypress',(e)=>{
    newPasswdValidationErr.textContent=validatePasswd(newPasswdInput.value)
})

newPasswdInput.addEventListener('keyup',(e)=>{
    newPasswdValidationErr.textContent=validatePasswd(newPasswdInput.value)
})

confirmNewPasswdInput.addEventListener('keypress',(e)=>{
    confirmNewPasswdValidationErr.textContent=verifyPasswords(newPasswdInput.value,confirmNewPasswdInput.value)
})

confirmNewPasswdInput.addEventListener('keyup',(e)=>{
    confirmNewPasswdValidationErr.textContent=verifyPasswords(newPasswdInput.value,confirmNewPasswdInput.value)
})

function loadUser(){
    axios.get('http://127.0.0.1:4500/users/current',{
        headers:{
            'authorization':`Bearer ${token}`
        }
    }).then(res=>{
        nameInput.value=res.data.user.name
        userProfileImg.src=res.data.user.profileImg
        userProfileImg.alt=res.data.user.name
    }).catch(err=>{
        console.log(err)
    })

}


profileForm.addEventListener("submit",(event)=>{
    event.preventDefault()
    if(validateName(nameInput.value)){
        profileErrMessage.style.display="block"
        profileErrMessage.innerHTML="<p>Please fill the form as instructed.</p>"
    }else{
        profileErrMessage.style.display="none"
        const data=new FormData(profileForm)
        axios.post('http://127.0.0.1:4500/users/edit',data,{
            headers:{
                'Content-Type':'multipart/form-data',
                'authorization':`Bearer ${token}`
            }
        }).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }
})

passwdForm.addEventListener("submit",(event)=>{
    event.preventDefault()
    if(validatePasswd(newPasswdInput.value) || validateEmptyPasswd(confirmNewPasswdInput.value) ||verifyPasswords(newPasswdInput.value,confirmNewPasswdInput.value)){
        passwdErrMessage.style.display="block"
        passwdErrMessage.innerHTML="<p>Please fill the form as instructed.</p>"
    }else{
        passwdErrMessage.style.display="none"
    }
})

loadUser()

