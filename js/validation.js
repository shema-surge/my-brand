const validateName=(fullname)=>{
    const nameRegex=/^[a-zA-Z-' ]{2,}$/
    if(!fullname) return 'Name field cannot be empty!'
    if(!fullname.match(nameRegex)) return 'Please enter a valid fullname'
}

const validateEmail=(email)=>{
    const emailRegex=/^[a-z][a-z0-9]+@[a-z0-9]+\.[a-z]{2,}$/
    if(!email) return 'Email field cannot be empty!'
    if(!email.match(emailRegex)) return 'Please enter a valid email'
}

const validatePasswd=(passwd)=>{
    const passwdRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,12}$/
    if(!passwd) return 'Password field cannot be empty!'
    if(!passwd.match(passwdRegex)) return 'Please enter a valid password'
}

const verifyPasswords=(passwd,verifyPasswd)=>{
    if(passwd!==verifyPasswd) return 'Passwords do not match'
}