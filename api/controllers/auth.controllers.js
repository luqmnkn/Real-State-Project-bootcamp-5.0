import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';

export const register = async (req, res) => {
 const { username , email , password} = req.body

try {
  
  const hashPassword = await bcrypt.hash(password, 10);
  
  
  const newUser = await prisma.user.create({
  data : {
      username,
      email,
      password : hashPassword
  }
  
  
  })
  
  console.log(newUser)
  res.send(201).json({message : "User registered successfully"});
} catch (error) {
  console.error(error);
  res.status(500).json({message : "Internal server error"});
}

}
export const login = async (req, res) => {

const { email , password } = req.body;
//if user exists in database
const user = await prisma.user.findUnique({
  where : {
    username
  }
})

if(!user){
  return res.status(401).json({message : "invalid credentials"});
}



//check if password is correct

const isPasswordValid = await bcrypt.compare(password, user.password);

if(!isPasswordValid){
  return res.status(401).json({message : "invalid credentials"});
}

  res.send('This is the login endpoint');
}

export const logout = (req, res) => {
  res.send('This is the logout endpoint');
}
