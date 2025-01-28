

import UserModel from './user.model.js';
import jwt from "jsonwebtoken";
import UserRepository from './user.repository.js';
import bcrypt from 'bcrypt';

export default class UserController {

  constructor(){
    this.userRepository = new UserRepository();
  }
  async signUp(req, res,next) {
    const {
      name,
      email,
      password,
      type,
    } = req.body;
    try{
// const hashedPassword = await bcrypt.hash(password, 12)
const hashedPassword=await bcrypt.hash(password,12)

    const user = new UserModel(
      name,
      email,
      hashedPassword,
      type
    );
    await this.userRepository.signUp(user);
    res.status(201).send(user);
  }
  catch(err){
    next(err);
  }
}

  async signIn(req, res, next) {
    try{
      // 1. Find user by email.
      const user1 = await this.userRepository.findByEmail(req.body.email);
      console.log(user1)
      if(!user1){
        return res
        .status(400)
        .send('Incorrect Credentials');
      } else {
        // 2. Compare password password with hashed password.
        // const result = await bcrypt.compare(req.body.password, user.password);
        const result=await bcrypt.compare(req.body.password,user1.password)
        console.log(req.body.password);
        console.log(user1.password)
        console.log(result)
        // The result should return true but  due to error it id returning false so if(!result) but actual is if(result) 
        if(result){
          // 3. Create token with user information.
          const token = jwt.sign(
            {
              userID: user1._id,
              email: user1.email,
              
            },
            process.env.JWT_SECRET,
            {
              expiresIn: '3h',
            }
          );
      // 4. Send token.
      return res.status(200).send(token);
        } else {
          return res
        .status(400)
        .send('Incorrect content');
        }
      }
  } catch(err){
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }

  async resetPassword(req,res,next){
   
    const {newPassword}=req.body
    const userID=req.userID;
    const hashedPassword=await bcrypt.hash(newPassword,12)
    try{
      await this.userRepository.resetPassword(userID,hashedPassword);
      res.status(200).send("Password reset approved")
  }catch(err){
    console.log(err);
    return res.status(200).send("Something went wrong");
  }
}
}


// export default class UserController {
//     constructor(){
//       this.userRepository = new UserRepository();
//     }
//     async signUp(req, res) {
//       const {
//         name,
//         email,
//         password,
//         type,
//       } = req.body;
//       const user = new UserModel(
//         name,
//         email,
//         password,
//         type
//       );
//       await this.userRepository.signUp(user);
//       res.status(201).send(user);
//     }

//  async signIn(req, res) {
//     try{
//       const result = await this.userRepository.signIn(
//         req.body.email,
//         req.body.password
//       );
//       if (!result) {
//         return res
//           .status(400)
//           .send('Incorrect Credentials');
//       } else {
//         // 1. Create token.
//         const token = jwt.sign(
//           {
//             userID: result.id,
//             email: result.email,
//           },
//           '1AB9DB9D55ABA',
//           {
//             expiresIn: '1h',
//           }
//         );
  
//         // 2. Send token.
//         return res.status(200).send(token);
//       }
//     } catch(err){
//         console.log(err);
//         return res.status(200).send("Something went wrong");
//       }
//     }
//   }
  

//     const result = UserModel.signIn(
//       req.body.email,
//       req.body.password
//     );
//     console.log(result)
//     if (!result) {
//       return res
//         .status(400)
//         .send('Incorrect Credentials');
//     } else {
//        const token=jwt.sign({userID:result.id,email:result.email},"1AB9DB9D55ABA",{expiresIn:"2h"})
//        return res.send(token).status(200);
       
//     }
//   }
// }
