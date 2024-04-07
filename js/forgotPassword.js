const formContainer = document.querySelector(".formContainer")
const errMessage = document.querySelector(".errMessage")

function loadEmailForm() {

    const emailForm = document.createElement('div')
    emailForm.classList.add('form')

    emailForm.innerHTML = `
        <label for="emailInput">Email</label>
        <div class="inputContainer">
            <input type="email" name="email" id="emailInput" placeholder="Email Address" required>
            <p id="emailValidationErr"></p>
        </div>

        <button type="button" id="sendEmailBtn" class="btn">Send Code</button>
        `

    formContainer.appendChild(emailForm)

    const emailValidationErr = document.getElementById("emailValidationErr")
    const emailInput = document.getElementById("emailInput")

    const sendEmailBtn = document.querySelector("#sendEmailBtn")

    emailInput.addEventListener('keypress', (e) => {
        emailValidationErr.textContent = validateEmail(emailInput.value)
    })

    emailInput.addEventListener('keyup', (e) => {
        emailValidationErr.textContent = validateEmail(emailInput.value)
    })

    sendEmailBtn.addEventListener('click', () => {
        if (validateEmail(emailInput.value)) {
            errMessage.style.display = "block"
            errMessage.innerHTML = "<p>Please fill the form as instructed.</p>"
        } else {
            errMessage.style.display = "none"
            axios.post('http://127.0.0.1:4500/users/sendPasswdReset', { email: emailInput.value })
                .then(res => {
                    console.log(res.data)
                    formContainer.removeChild(emailForm)
                    loadResetCodeForm(emailInput.value)
                }).catch(err => {
                    console.log(err)
                    errMessage.style.display = "block"
                    errMessage.innerHTML = `<p>${err.message}</p>`
                })
        }
    })

}

function loadResetCodeForm(email) {

    const resetCodeForm = document.createElement('div')
    resetCodeForm.classList.add('form')

    resetCodeForm.innerHTML = `
    <label for="codeInput">Password Reset Code</label>
    <div class="inputContainer">
        <input type="password" name="code" id="codeInput" placeholder="Reset Code" required>
        <p id="codeValidationErr"></p>
    </div>
    <button type="button" id="continueBtn" class="btn">Continue</button>
    `
    formContainer.appendChild(resetCodeForm)

    const codeInput = document.querySelector("#codeInput")
    const codeValidationErr = document.querySelector("#codeValidationErr")
    const continueBtn = document.querySelector("#continueBtn")

    codeInput.addEventListener('keypress', (e) => {
        codeValidationErr.textContent = validateCode(codeInput.value)
    })

    codeInput.addEventListener('keyup', (e) => {
        codeValidationErr.textContent = validateCode(codeInput.value)
    })

    continueBtn.addEventListener("click", () => {
        if (validateCode(codeInput.value)) {
            errMessage.style.display = "block"
            errMessage.innerHTML = "<p>Please fill the form as instructed.</p>"
        } else {
            errMessage.style.display = "none"
            axios.post(`http://127.0.0.1:4500/keys/passwd-reset-check/${codeInput.value}`, { email: email })
                .then(res => {
                    console.log(res.data)
                    formContainer.removeChild(resetCodeForm)
                    loadPasswdResetForm(codeInput.value)
                })
                .catch(err => {
                    console.log(err)
                    errMessage.style.display = "block"
                    errMessage.innerHTML = `<p>${err.message}.</p>`
                })
        }
    })

}

function loadPasswdResetForm(code) {

    const passwdResetForm=document.createElement('div')
    passwdResetForm.classList.add('form')

    passwdResetForm.innerHTML=`
    
    <label for="passwdInput">Password</label>
    <div class="inputContainer">
        <input type="password" name="password" id="passwdInput" required>
        <p id="passwdValidationErr"></p>
    </div>

    <label for="passwdInput">Verify Password</label>
    <div class="inputContainer">
        <input type="password" name="verifyPassword" id="verifyPasswdInput" required>
        <p id="verifyPasswdValidationErr"></p>
    </div>

    <button type="button" id="resetPasswordBtn" class="btn">Reset Password</button>
    
    `

    formContainer.appendChild(passwdResetForm)

    const passwdValidationErr = document.getElementById("passwdValidationErr")
    const passwdInput = document.getElementById("passwdInput")
    const verifyPasswdValidationErr = document.getElementById("verifyPasswdValidationErr")
    const verifyPasswdInput = document.getElementById("verifyPasswdInput")

    const resetPasswordBtn = document.getElementById("resetPasswordBtn")

    passwdInput.addEventListener('keypress', (e) => {
        passwdValidationErr.textContent = validatePasswd(passwdInput.value)
    })

    passwdInput.addEventListener('keyup', (e) => {
        passwdValidationErr.textContent = validatePasswd(passwdInput.value)
    })

    verifyPasswdInput.addEventListener('keyup', (e) => {
        verifyPasswdValidationErr.textContent = verifyPasswords(passwdInput.value, verifyPasswdInput.value)
    })


    resetPasswordBtn.addEventListener('click', () => {
        if (validatePasswd(passwdInput.value) || verifyPasswords(passwdInput.value, verifyPasswdInput.value)) {
            errMessage.style.display = "block"
            errMessage.innerHTML = "<p>Please fill the form as instructed.</p>"
        } else {
            errMessage.style.display = "none"
            axios.post(`http://127.0.0.1:4500/users/resetPassword/${code}`, { newPassword: passwdInput.value, verifyPassword: verifyPasswdInput.value })
                .then(res => {
                    console.log(res.data)
                    window.location.href = "./login.html"
                }).catch(err => {
                    console.log(err)
                    errMessage.style.display = "block"
                    errMessage.innerHTML = `<p>${err.message}</p>`
                })
        }
    })
}


loadEmailForm()


