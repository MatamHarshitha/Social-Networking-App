// The purpose of this file is:Manage routes/paths to ProductController.
// Specify all paths to call controllers


// 1)the route is:client->server->router->controller->model->controller->client


import { upload } from "../../middlewares/fileupload.middleware.js";
import ProductController from "./product.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";
// import { upload } from "../../middlewares/fileupload.middleware.js";
// 1)Import express
import express from "express"
// const productcontroller= new ProductController
// // 2)Initialize express router

const productRouter=express.Router();

// // 3)All the paths to controller method

// ProductRoutes.get("/",
//   (req, res)=>{
//     productcontroller.getAllProducts(req, res)
//  })
// ProductRoutes.post("/",(req, res)=>{
//     productcontroller.addProduct(req, res)
//  })
// ProductRoutes.get("/:id",(req, res)=>{
//     productcontroller.getOneProduct(req, res)
//  })
// ProductRoutes.get("/filter",productcontroller.filterProducts)
// ProductRoutes.post('/rate',productcontroller.rateProduct);
// export default ProductRoutes

const productController = new ProductController();

// All the paths to controller methods.
// localhost/api/products

// localhost:4100/api/products/filter?minPrice=10&maxPrice=20&category=Category1
productRouter.post(
  '/rate',jwtAuth,
  (req, res, next)=>{
    productController.rateProduct(req, res, next)
 }
);
productRouter.get(
  '/filter',
  (req, res)=>{
    productController.filterProducts(req, res)
 }
);
productRouter.get(
  '/',
  (req, res)=>{
    productController.getAllProducts(req, res)
 }
);
productRouter.post(
  '/',
  upload.single('imageUrl'),
  (req, res)=>{
    productController.addProduct(req, res)
 }
);
productRouter.get("/averagePrice", (req, res, next)=>{
  productController.averagePrice(req, res)
});
productRouter.get(
  '/:id',
  (req, res)=>{
    productController.getOneProduct(req, res)
 }
);

export default productRouter;
