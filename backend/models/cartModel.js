import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [
        {
            productId: { type: String, required: true },
            quantity: { type: Number, required: true }
        }
    ]
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
