import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';

import productRoutes from './routes/products.js'
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true})); //for send over req
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/public', express.static('public'));
app.use('/products', productRoutes);
app.get('/', (req, res) => {
    res.send('Hello to Admin API')
})

const PORT = process.env.PORT || 5000;

const mongoURI = 'mongodb+srv://user123:user123@cluster0.wdl94.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(mongoURI).then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error.message));