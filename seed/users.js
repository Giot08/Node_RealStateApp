import bcrypt from 'bcrypt'

const users = [
    {
        name: "Miguel",
        email: "m@mail.com",
        emailAuthenticate: 1,
        password: bcrypt.hashSync('password', 10)

    }
]

export default users