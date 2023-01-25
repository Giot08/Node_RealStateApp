import jwt from "jsonwebtoken";

const genJWT = (id) => jwt.sign({id}, process.env.JWT_SECRET,{
    expiresIn: "1d"
  });


const genID = () => Date.now() + Math.random().toString(32).substring(2);

export {
    genID,
    genJWT
}