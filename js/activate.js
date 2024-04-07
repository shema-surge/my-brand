const codeInput=document.querySelector("#codeInput")
const codeValidationErr=document.querySelector("#codeValidationErr")
const activateBtn=document.querySelector("#activateBtn")
const errMessage=document.querySelector(".errMessage")
const resendCodeBtn=document.querySelector("#resendCodeBtn")


codeInput.addEventListener('keypress',(e)=>{
    codeValidationErr.textContent=validateCode(codeInput.value)
})

codeInput.addEventListener('keyup',(e)=>{
    codeValidationErr.textContent=validateCode(codeInput.value)
})

let token

try{
    if (!document.cookie) throw new Error('Missing cookies, please login again')
    token = document.cookie.split('=')[1]
    if (!token) throw new Error('Invalid token')
}catch(err){
    console.log(err)
    window.location.href="./login.html"
}

activateBtn.addEventListener('click',()=>{
    if(validateCode(codeInput.value)){
        errMessage.style.display="block"
        errMessage.innerHTML="<p>Please fill the form as instructed.</p>"
    }else{
        errMessage.style.display="none"
        axios.put('http://127.0.0.1:4500/users/activate',{code:codeInput.value},{
            headers:{
                'authorization':`Bearer ${token}`
            }
        })
        .then(res=>{
            console.log(res.data)
            window.location.href="./blog.html"
        }).catch(err=>{
            errMessage.style.display="block"
            errMessage.innerHTML=`<p>${err.message}</p>`
        })
    }
})


resendCodeBtn.addEventListener('click',()=>{
    axios.get("http://127.0.0.1:4500/users/resendActivation",{
        headers:{
            'authorization':`Bearer ${token}`
        }
    }).then(res=>{
        console.log(res.data)
    }).catch(err=>{
        console.log(err)
    })
})

