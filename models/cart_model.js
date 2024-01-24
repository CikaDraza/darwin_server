import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company_account' },
    items: [{
        productImage: String,
        title: String,
        brand: String,
        articleCode: String,
        price: Number
    }]
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
