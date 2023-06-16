import jwt  from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()

export const verifyToken = async (req, res, next) =>{
    try {
        const {token} = req.headers["token"]
        if(!token){
          return  res.json({message: "Please login"})
        }
        const {JWT_SECRET} = process.env
        jwt.verify(token,JWT_SECRET)
    } catch (error) {
        res.json(error.message)
    }
    
    next()
}