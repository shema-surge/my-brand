const nameValidationErr=document.getElementById("nameValidationErr")
const nameInput=document.getElementById("nameInput")
const emailValidationErr=document.getElementById("emailValidationErr")
const emailInput=document.getElementById("emailInput")
const messageValidationErr=document.getElementById("messageValidationErr")
const messageInput=document.getElementById("messageInput")
const subjectValidationErr=document.getElementById("subjectValidationErr")
const subjectInput=document.getElementById("subjectInput")
const form=document.querySelector(".form")
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

messageInput.addEventListener('keypress',(e)=>{
    messageValidationErr.textContent=validateMessage(messageInput.value)
})

messageInput.addEventListener('keyup',(e)=>{
    messageValidationErr.textContent=validateMessage(messageInput.value)
})

subjectInput.addEventListener('keypress',(e)=>{
    subjectValidationErr.textContent=validateSubject(subjectInput.value)
})

subjectInput.addEventListener('keyup',(e)=>{
    subjectValidationErr.textContent=validateSubject(subjectInput.value)
})

form.addEventListener("submit",(event)=>{
    event.preventDefault()
    if(validateEmail(emailInput.value) || validateName(nameInput.value) || validateMessage(messageInput.value) || validateSubject(subjectInput.value)){
        errMessage.style.display="block"
        errMessage.innerHTML="<p>Please fill the form as instructed.</p>"
    }else{
        errMessage.style.display="none"
        axios.post('http://127.0.0.1:4500/messages/newMessage',
        {
            name:nameInput.value,
            email:emailInput.value,
            subject:subjectInput.value,
            message:messageInput.value
        }
        ,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>{
          console.log(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
})
