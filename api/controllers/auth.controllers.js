import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';

export const register = async (req, res) => {
 const { username , email , password} = req.body


const hashPassword = await bcrypt.hash(password, 10);


const newUser = await prisma.user.create({
data : {
    username,
    email,
    password : hashPassword
}


})

console.log(newUser)
res.send('This is the register endpoint');

}
export const login = (req, res) => {
  res.send('This is the login endpoint');
}

export const logout = (req, res) => {
  res.send('This is the logout endpoint');
}
