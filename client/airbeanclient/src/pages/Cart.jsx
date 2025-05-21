import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    increaseQuantity,
    decreaseQuantity,
    clearCart,
} from "../store/cartSlice";
import "../styles/Cart.css";
import PrimaryButton from "../components/btn/PrimaryButton";

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="cart-page">
        <h2 className="title-coofee">Din kaffekorg</h2>

        {cartItems.length === 0 ? (
            <p>Inga bönor i sikte, Det ser ut som att du glömt klicka hem ditt kaffe. En tom kaffekorg gör ingen pigg!</p>
        ) : (
            <div className="cart-items">
            {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                    <span>{item.name}</span>
                    <span>{item.price * item.quantity} kr</span>
                </div>
                <div className="cart-item-controls">
                    <button onClick={() => dispatch(decreaseQuantity(item.id))}>
                    -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(increaseQuantity(item.id))}>
                    +
                    </button>
                </div>
                </div>
            ))}
            <button className="clear-cart-btn" onClick={() => dispatch(clearCart())}>
                Töm varukorg
            </button>
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