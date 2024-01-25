import mongoose from 'mongoose';

const cartItmesSchema = new mongoose.Schema(
    {
        productId: String,
        productImage: String,
        title: String,
        brand: String,
        articleCode: String,
        price: Number
    },
    {
        timestamps: true
    }
);

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company_account' },
    items: [cartItmesSchema]
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
