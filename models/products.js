import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    sku: String,
    name: String,
    qty: String,
    desc: String,
    productImage: { type: String, required: true },
});

const ProductDetails = mongoose.model('Products', productSchema);

export default ProductDetails;