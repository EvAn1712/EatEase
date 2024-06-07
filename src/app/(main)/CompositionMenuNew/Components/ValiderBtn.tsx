import React from 'react';
import { useCart } from '@/store/quick-cart/cart.context'; // Adjust the import path as necessary
import { CartItem as Item } from '@/types'; // Adjust the import path as necessary

const ValiderBtn: React.FC = () => {
    const { addItemToCart } = useCart();

    // Example item to add to the cart
    const item: Item = {
        size: 0,
        id: 1,
        name: 'Sample Item',
        price: 10,
        quantity: 1,
        stock: 100,
        image: '',
        description: ''
    };

    const handleAddToCart = () => {
        addItemToCart(item, item.quantity);
    };

    return (
        <button onClick={handleAddToCart}>Add to Cart</button>
    );
};

export default ValiderBtn;
