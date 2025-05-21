import React, { useState } from "react";
import "../styles/Cart.css";
import PrimaryButton from "../components/btn/PrimaryButton";

const Cart = () => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: "Espresso", price: 35, quantity: 2 },
        { id: 2, name: "Cappuccino", price: 42, quantity: 1 },
    ]);

    const handleIncrease = (id) => {
        setCartItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
        );
    };

    const handleDecrese = (id) => {
        setCartItems((prevItems) =>
        prevItems.map((item) =>
            item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
        )
        );
    };

    const handleClearCart = () => {
        setCartItems([]);
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return (
        <div className="cart-page">
        <h2>Din kaffekorg</h2>

        {cartItems.length === 0 ? (
            <p>Varukorgen är tom.</p>
        ) : (
            <div className="cart-items">
            {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                    <span>{item.name}</span>
                    <span>{item.price * item.quantity} kr</span>
                </div>
                <div className="cart-item-controls">
                    <button onClick={() => handleDecrese(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrease(item.id)}>+</button>
                </div>
                </div>
            ))}
            {cartItems.length > 0 && (
            <button className="clear-cart-btn" onClick={handleClearCart}>
                Töm varukorg
            </button>
            )}
            </div>
            
        )}

        <div className="cart-total">
            <h3>Totalt: {total} kr</h3>
        </div>
        <PrimaryButton onClick={() => console.log("Går till betalning")}>
            Gå till betalning
        </PrimaryButton>
        </div>
    );
};

export default Cart;
