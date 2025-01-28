import { ApplicationError } from "../../error-handler/applicationError.js";
import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import mongoose from "mongoose";
import { productSchema } from "./product.Schema.js";
import { reviewSchema } from "./review.Schema.js";
import { categorySchema } from "./category.schema.js";


const ProductModel=mongoose.model("Product",productSchema)
const ReviewModel=mongoose.model("Review",reviewSchema)
const CategoryModel=mongoose.model("Category",categorySchema)
class ProductRepository{
    // class ProductRepository{

        constructor(){
            this.collection = "products";
        }
     
        async add(productData){
            try{
                // 1. Adding Product
                productData.categories=productData.category.split(',');
                console.log(productData);
                const newProduct = new ProductModel(productData);
                const savedProduct = await newProduct.save();
    
                // 2. Update categories.
                // for all the categories in array(using $in) we are pushing id of savedProducts
                await CategoryModel.updateMany(
                    {_id: {$in: productData.categories}},
                    {$push: {products: new ObjectId(savedProduct._id)}}
                )
            }catch(err){
                console.log(err);
                throw new ApplicationError("Something went wrong with database", 500);    
            }
        }
    
        async getAll(){
            try{
                const db = getDB();
                const collection = db.collection(this.collection);
                const products = await collection.find().toArray();
                console.log(products);
                return products;
            } catch(err){
                console.log(err);
                throw new ApplicationError("Something went wrong with database", 500);
            }
        }
    
        async get(id){
            try{
                const db = getDB();
                const collection = db.collection(this.collection);
                return await collection.findOne({_id: new ObjectId(id)});
            }catch(err){
                console.log(err);
                throw new ApplicationError("Something went wrong with database", 500);
            }
        }

        // Product should have min price specified and category
    async filter(minPrice, categories){
        try{
            const db = getDB();
            const collection = db.collection(this.collection); 
            let filterExpression={};
            if(minPrice){
                filterExpression.price = {$gte: parseFloat(minPrice)}
            }
            categories = JSON.parse(categories.replace(/'/g,'"'));
            console.log(categories)
            if(categories){
                filterExpression={$or:[{category:{$in: categories}}, filterExpression]}
                // filterExpression.category=category
            }
            return collection.find(filterExpression).project({name:1,price:1,_id:0,ratings:{$slice:-1}}).toArray();

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);    
        }
    }
    
        async rate(userID, productID, rating){
            try{
                // 1)Check if product exists
                const ProducttoUpdate=ProductModel.findById(productID);
                if(!ProducttoUpdate){
                    throw new Error("Product not found")
                }
                // 2)Check for existing review
                const userReview = await ReviewModel.findOne({product: new ObjectId(productID), user: new ObjectId(userID)});
        if(userReview){
            userReview.rating = rating;
            await userReview.save();
        }else{
            const newReview = new ReviewModel({
                product: new ObjectId(productID),
                user: new ObjectId(userID),
                rating: rating
            });
            newReview.save();
        }
            }catch(err){
                console.log(err);
                throw new ApplicationError("Something went wrong with database", 500);
            }
        }
        async averageProductPricePerCategory(){
            try{
                const db=getDB();
                return await db.collection(this.collection)
                    .aggregate([
                        {
                            // Stage 1: Get averge price per category
                            $group:{
                                _id:"$category",
                                averagePrice:{$avg:"$price"}
                            }
                        }
                    ]).toArray();
            }catch(err){
                console.log(err);
                throw new ApplicationError("Something went wrong with database", 500);    
            }
        }
    }

    
    export default ProductRepository;
//     constructor(){
//         this.collection = "products";
//     }
 
//     async add(newProduct){
//         try{
//             // 1 . Get the db.
//             const db = getDB();
//             const collection = db.collection(this.collection);
//             await collection.insertOne(newProduct);
//             return newProduct;
//         } catch(err){
//             console.log(err);
//             throw new ApplicationError("Something went wrong with database", 500);
//         }
//     }

//     async getAll(){
//         try{
//             // const db = getDB();
//             // const collection = db.collection(this.collection);
//             const db=await getDB();
//             console.log(`Connected to database: ${db.databaseName}`);
//             const collection=db.collection(this.collection)
//             console.log(collection)
//             const products = await collection.find().toArray();
//             console.log(products);
//             return products;
//         } catch(err){
//             console.log(err);
//             throw new ApplicationError("Something went wrong with database", 500);
//         }
//     }

//     async get(id){
//         try{
//             const db = getDB();
//             const collection = db.collection(this.collection);
//             const objectId = ObjectId.createFromTime(Number(id));
//             return await collection.findOne({_id: objectId(id)});
//         }catch(err){
//             console.log(err);
//             throw new ApplicationError("Something went wrong with database", 500);
//         }
//     }

//     async filter(minPrice, maxPrice, category){
//         try{
//             const db = getDB();
//             const collection = db.collection(this.collection);
//             let filterExpression={};
//             if(minPrice){
//                 filterExpression.price = {$gte: parseFloat(minPrice)}
//             }
//             if(maxPrice){
//                 filterExpression.price = {...filterExpression.price, $lte: parseFloat(maxPrice)}
//             }
//             if(category){
//                 filterExpression.category=category;
//             }
//             return await collection.find(filterExpression).toArray();
            
//         }catch(err){
//             console.log(err);
//             throw new ApplicationError("Something went wrong with database", 500);
//         }
//     }

//    async rate(userID, productID, rating){
//         try{
//             const db = getDB();
//             const collection = db.collection(this.collection);
//             const objectId = ObjectId.createFromTime(Number(id));
//          await   collection.updateOne({
//                 _id: objectId(productID)
//             },{
//                 $push: {ratings: {userID: objectId(userID), rating}}
//             })

//         }catch(err){
//             console.log(err);
//             throw new ApplicationError("Something went wrong with database", 500);
//         }
//         }


// }

// export default ProductRepository;
    


