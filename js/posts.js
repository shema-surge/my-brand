const moreOptionsBtn=document.querySelectorAll(".moreOptionsBtn")
const options=document.querySelectorAll(".options")

moreOptionsBtn.forEach(btn=>{
    btn.addEventListener('click',()=>{
        let optionMenu=btn.nextElementSibling
        if(optionMenu.style.display==="flex"){
            optionMenu.style.display="none"
            return
        }
        optionMenu.style.display="flex"
    })
})