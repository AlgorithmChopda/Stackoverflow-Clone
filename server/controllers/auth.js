import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import users from '../models/auth.js'
 
export const signup = async (req, res) => {
    const {name, email, password, dob} = req.body;

    try{
        const existinguser = await users.findOne( {email} )
        if(existinguser)  // if email already exists show error // if defaultly checks for not-null-condition
            return res.status(404).json({message: "User already exists"});
        
        const hashedpassword = await bcrypt.hash(password, 12)  // encrypt the password
        const newUser = await users.create( {name, email, password: hashedpassword, dob: dob} )    // create a new user with the credentials
        console.log(newUser)
        const token = jwt.sign( {email: newUser.email, id: newUser._id}, process.env.JWT_SECRET, {expiresIn: "1h" })
      
        return res.status(200).json( {result: newUser, token})
    }
    catch(error){
        return res.status(500).json("Something went wrong...");
    }

}

export const login = async (req, res) => {
    const {email, password} = req.body;

    try{
        const existinguser = await users.findOne( {email} )

        if(!existinguser)    // if email already exists show error // if existinguser is empty then
            return res.status(404).json({message: "User don't Exists.."});
        
        const isPasswordCrt = await bcrypt.compare(password, existinguser.password)
        if(!isPasswordCrt)
            return res.status(400).json( {message: "Invalid Credentials"} )
        const token = jwt.sign( {email: existinguser.email, id: existinguser._id}, process.env.JWT_SECRET, {expiresIn: "1h" }) 
        return res.status(200).json( {result: existinguser, token})
    }
    catch(error){
        return res.status(500).json("Something went wrong...");       
    }
}