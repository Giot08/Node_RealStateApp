import nodemailer from "nodemailer";

const emailRegister = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_host,
        port: process.env.EMAIL_post,
        auth: {
          user: process.env.EMAIL_user,
          pass: process.env.EMAIL_password
        }
      });
      const {name, email, token} = data
      await transport.sendMail({
        from: "FreeBazar.com",
        to: email,
        subject: "Auth your email in FreeBazar.com",
        text: "Auth your email in FreeBazar.com",
        html:`
        <p>Please ${name}, check out your token and authenticate your email</p>
        <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/register/validate/${token}"> Click here</a>
        <p>If you dont create this account, please ignore this mail.</p>
        `
      })
    //   console.log(data)
}

export {
    emailRegister
}