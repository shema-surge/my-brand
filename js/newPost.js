const titleInput = document.querySelector("#titleInput")
const errMessage = document.querySelector(".errMessage")

document.querySelector("#publishBtn").addEventListener("click", async () => {
    try{
        if (!titleInput.value || !tinymce.get("mytextarea").getContent()) {
            throw new Error('Empty input fields, Please fill in all input fields as required!')
            return
        }
        if (!document.cookie) {
            throw new Error('Missing cookies, please login again')
            return
        }
    
        const token = document.cookie.split('=')[1]

        if (!token) {
            throw new Error('Invalid token')
            return
        }

        const response = await fetch("http://127.0.0.1:4500/posts/newPost", {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title: titleInput.value, content: tinymce.get("mytextarea").getContent() })
        })
        const data = await response.json()
    
        if (response.status !== 200) {
            throw new Error(data.message)
            return
        }
        window.location.href = "/blog.html"
    }catch(err){
        console.log(err)
        errMessage.style.display="block"
        errMessage.innerHTML=`<p>Error: ${err.message}</p>`
    }
})