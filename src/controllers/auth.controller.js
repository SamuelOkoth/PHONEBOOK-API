import { dbConfig } from "../config/config.js";
import jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt'
import sql from "mssql";
import dotenv from 'dotenv'
dotenv.config()

export const signup = async (req, res) => {
  try {
    const connection = await sql.connect(dbConfig);
    const { username, password, email } = req.body;
    const query1 = "SELECT * FROM users WHERE username = @username";
    const results = await connection
      .request()
      .input("username", sql.VarChar, username)
      .query(query1);
    if (results.recordset[0]) {
      return res.json({ message: "User already exists,login with your account" });
    }
    const hashedpassword = bcrypt.hashSync(password,10)
    const query2 =
      "INSERT INTO users (username, password, email) VALUES (@username, @password, @email)";
    await connection
      .request()
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, hashedpassword)
      .input("email", sql.VarChar, email)
      .query(query2);
    res.json({message: "Account created!"});
  } catch (error) {
    res.json(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const connection = await sql.connect(dbConfig);
    const {username, password} = req.body
    const query1 = "SELECT * FROM users WHERE username = @username"
    const results = await connection
      .request()
      .input("username", sql.VarChar, username)
      .query(query1);
    if (!results.recordset[0]) {
      return res.json({ message: "Account doesnt exist, create one" });
    }
    const hashedpassword = results.recordset[0].password
    const validpassword = bcrypt.compareSync(password,hashedpassword)
    if(!validpassword){
        return res.json({message: "Incorrect password"})
    }
    const payload = results.recordset.map(user=> {
        const {password, ...rest} = user
        return {...rest}
    })
    const {JWT_SECRET} = process.env
    const token = jwt.sign(payload[0], JWT_SECRET)
    res.json({message: "Logged in successfully", token})
  } catch (error) {
    res.json(error.message)
  }
};
