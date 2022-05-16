import express from "express";
import { createProduct, uploadImage, getProducts, updateProduct, deleteProduct } from "../controllers/products.js";

const router = express.Router();

router.post('/', uploadImage, createProduct);
router.get('/', getProducts);
router.patch('/:id',uploadImage, updateProduct);
router.delete('/:id', deleteProduct)

export default router;