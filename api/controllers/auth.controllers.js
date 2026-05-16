import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';
import jwt from 'jsonwebtoken';
export const register = async (req, res) => {



try {
   const { username , email , password} = req.body
  
  
    
    const hashPassword = await bcrypt.hash(password, 10);
    
    
    const newUser = await prisma.user.create({
    data : {
        username,
        email,
        password : hashPassword
    }
    
    
    })
    console.log("Register endpoint hit");
    console.log(newUser)
    res.send(201).json({message : "User registered successfully"});
  } catch (error) {
    
    console.error(error);
  res.status(500).json({message : "Internal server error"});
  }
  
  
}




export const login = async (req, res) => {
try {
  
  const { email , password  } = req.body;
  //if user exists in database
  const user = await prisma.user.findUnique({
    where : {
      email
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
  
  
  //generate token and send response
const token = jwt.sign({ userId : user.id }, process.env.JWT_SECRET, { expiresIn : '7d' });

  const age = 60 * 60 * 1000 * 24 * 7; // 1 week in milliseconds
  res.cookie('token', token, {
    httpOnly : true,
  maxAge : age
  })

    res.status(200).json('user logged in successfully');
} catch (error) {
  res.status(500).json({message : error.message});
}


}













export const logout = (req, res) => {

//logout 

res
.clearCookie('token')
.status(200)
.json({message : "User logged out successfully"});

}
