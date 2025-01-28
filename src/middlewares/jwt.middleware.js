import jwt from "jsonwebtoken";
const jwtAuth=(req,res,next)=>{
    // 1)Read the token
    // req.headers["authorization"]: This retrieves the value of the Authorization header sent with the request.
    const token=req.headers["authorization"]
    // 2)if no token return error
    if(!token){
        res.status(401).send("Unauthorized")
    }
    // 3)check if token is valid
    try{
        const payload=jwt.verify(token,"AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz");
        req.userID=payload.userID;
        console.log(payload)
    }
    // 4)if error,return error
    catch(err){
        res.status(401).send("Unauthorized token")
    }
    next();
}
export default jwtAuth