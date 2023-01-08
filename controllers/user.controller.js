const formLogin = (req,res) => {
    res.render('auth/login', {
        pagina: 'Login'
    })
}
const formRegister = (req,res) => {
    res.render('auth/register', {
        pagina: 'Register'
    })
}

const formForgotPassword = (req,res) => {
    res.render('auth/forgot_password', {
        pagina: 'Forgot password'
    })
}

export {
    formLogin,
    formRegister,
    formForgotPassword
}