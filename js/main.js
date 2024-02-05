const navItems=document.querySelectorAll('.nav-item')
const menu=document.querySelector(".menu")
const header=document.querySelector('header')
const backBtn=document.querySelector('.backBtn')

navItems.forEach(navItem=>{
    navItem.addEventListener('mouseenter',()=>{
        navItem.children[0].style.width='100%';
    })
    navItem.addEventListener('mouseleave',()=>{
        navItem.children[0].style.width='10px';
    })
})

menu.addEventListener('click',()=>{
    header.style.left="0px"
    menu.style.display="none"
})

backBtn.addEventListener('click',()=>{
    header.style.left="-800px"
    menu.style.display="flex"
})