import multer from 'multer';
import mongoose from 'mongoose';
import ProductDetails from '../models/products.js';

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "public/");
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

const isImage = (req, file, callback) => {
    if(file.mimetype.startsWith('image')) {
        callback(null, true);
    } else {
        callback(new Error('Only Image is Allowed...'))
    }
}

const upload = multer({ 
    storage: storage,
    fileFilter: isImage,
});

export const uploadImage = upload.single('photo');

export const createProduct = async(req, res) => {

    const product = req.body;

    const newProduct = new ProductDetails({
        sku: product.sku,
        name: product.name,
        qty: product.qty,
        desc: product.desc,
        productImage: req.file.originalname
    })

    try{
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}

export const getProducts = async (req, res) => {
    try {
        const Product = await ProductDetails.find();
        res.status(200).json(Product);
    } catch (error){
        res.status(404).json({ message: error.message });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;

    const product = req.body;

    const updatedProduct = {
        sku: product.sku,
        name: product.name,
        qty: product.qty,
        desc: product.desc,
        productImage: req.file.originalname
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No product with id: ${id}`);

    await ProductDetails.findByIdAndUpdate(id, updatedProduct, { new: true })

    res.json(updatedProduct);
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with that id');

    await ProductDetails.findByIdAndRemove(id);

    res.json({ message: 'Post delete successfully'});
}

export const getProductBySearch = async (req, res) => {
    const { searchQuery } = req.query

    try {
        const search = new RegExp(searchQuery, 'i');

        const Products = await ProductDetails.find({ name: search });
        res.json({ data: Products });
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}