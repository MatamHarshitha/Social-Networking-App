import { MongoClient} from "mongodb";

// MongoClient is the main class provided by the MongoDB driver that allows you to connect to a MongoDB instance.
// You use it to:
// Establish a connection to the database.
// Access a specific database.
// Perform database operations (CRUD).
// MongoClient is the primary class provided by the MongoDB Node.js Driver.
//  It serves as the interface to establish and manage connections to a MongoDB database instance.
// MongoClient is the main gateway for Node.js applications to communicate with MongoDB.



// const url="mongodb://localhost:27017/ecomdb";
const url=process.env.DB_URL
let client
export const connectToMongoDB=()=>{
    MongoClient.connect(url)
    .then(clientInstance=>{
        client=clientInstance
        console.log("Mongodb is Connected");
        createIndexes(client.db());
    }).catch(err=>{
        console.log(err)
    })
}

export const getDB=()=>{
    return client.db()
}

const createIndexes=async(db)=>{
    try{
await db.collection("products").createIndex({price:1})
await db.collection("products").createIndex({name:1,category:-1})
await db.collection("products").createIndex({desc:"text"})

    }catch(err){
        console.log(err)
    }
    console.log("Indexes are Created")
}