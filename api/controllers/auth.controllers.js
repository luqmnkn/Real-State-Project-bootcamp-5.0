import bcrypt from 'bcrypt';


export const register = async (req, res) => {
 const { username , email , password} = req.body


const hashPassword = await bcrypt.hash(password, 10);

console.log(hashPassword);


}

export const login = (req, res) => {
  res.send('This is the login endpoint');
}

export const logout = (req, res) => {
  res.send('This is the logout endpoint');
}
