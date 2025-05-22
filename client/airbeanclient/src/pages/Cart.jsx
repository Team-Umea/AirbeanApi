import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  applyDiscount,
} from "../store/cartSlice";
import { createOrder } from "../store/orderSlice";
import "../styles/Cart.css";
import PrimaryButton from "../components/btn/PrimaryButton";
import ModalComponent from "../components/utils/Modal";
import { useNavigate } from "react-router-dom";
import AcceptModal from "../components/utils/AcceptModal";
import { ArrowRight } from "lucide-react";
import SecondaryButton from "../components/btn/SecondaryButton";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const discount = useSelector((state) => state.cart.discount);
  const userId = useSelector((state) => state.auth.userID);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [discountCode, setDiscountCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const total = cartItems.reduce(
    (sum, item) => sum + item.cost * item.quantity,
    0
  );
  const discountedTotal = total - total * discount.amount;

  useEffect(() => {
    const savedDiscount = localStorage.getItem("discount");
    if (savedDiscount) {
      try {
        const parsed = JSON.parse(savedDiscount);
        if (parsed.code && parsed.amount) {
          dispatch(applyDiscount(parsed));
        }
      } catch (err) {
        console.error("Fel vid inläsning av rabatt från localStorage:", err);
      }
    }
  }, [dispatch]);

  const handleApplyDiscount = () => {
    const code = discountCode.trim().toLowerCase();

    if (code === "kaffe10") {
      const discountData = { code: "kaffe10", amount: 0.1 };
      dispatch(applyDiscount(discountData));
      localStorage.setItem("discount", JSON.stringify(discountData));
      setErrorMessage("");
    } else {
      dispatch(applyDiscount({ code: null, amount: 0 }));
      localStorage.removeItem("discount");
      setErrorMessage("Ogiltig rabattkod");
    }
  };

  const handleOrder = () => {
    if (!isAuthenticated) {
      ModalComponent.open(
        ({ close }) => (
          <div>
            <p className="my-6">
              Du måste vara inloggad för att slutföra din beställning.
            </p>
            <div className="flex justify-end space-x-2">
              <div className="flex-1 flex justify-end gap-x-4 mt-4">
                <SecondaryButton onClick={close}>Avbryt</SecondaryButton>
                <PrimaryButton
                  onClick={() => {
                    close();
                    sessionStorage.setItem("origin", "/cart");
                    navigate("/login");
                  }}
                >
                  Logga in
                </PrimaryButton>
              </div>
            </div>
          </div>
        ),
        "Konto krävs"
      );
      return;
    }

    AcceptModal.open(
      "Är du säker på att du vill genomföra din order?",
      "Bekräfta beställning",
      () => {
        const orderData = {
          total_amount: discountedTotal,
          order_status: "pending",
          profile_id: userId,
          order_items: cartItems.map((item) => ({
            product_id: item.id,
            quantity: item.quantity,
            unit_price: Number(item.cost),
          })),
        };

        dispatch(createOrder(orderData))
          .unwrap()
          .then((result) => {
            console.log("Beställning skapad:", result);
            dispatch(clearCart());

            dispatch(applyDiscount({ code: null, amount: 0 }));
            localStorage.removeItem("discount");
            setDiscountCode("");

            navigate("/profil");
          })
          .catch((err) => {
            console.error("Fel vid beställning:", err);
          });
      }
    );
  };

  const noCartItems = cartItems.length === 0;

  return (
    <div className="cart-page">
      <h2 className="title-coofee mt-4 text-3xl font-bold text-amber-700">
        Din kaffekorg
      </h2>

      {noCartItems ? (
        <p className="mt-8 text-lg">
          Inga bönor i sikte. Det ser ut som att du glömt klicka hem ditt kaffe.
          En tom kaffekorg gör ingen pigg!
        </p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-info">
                <span>{item.product_name}</span>
                <span>{item.cost * item.quantity} kr</span>
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
          <button
            className="clear-cart-btn"
            onClick={() => dispatch(clearCart())}
          >
            Töm varukorg
          </button>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="discount-code-section">
          <input
            type="text"
            placeholder="Ange rabattkod"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="discount-input"
          />
          <button onClick={handleApplyDiscount} className="apply-discount-btn">
            Använd
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {discount.amount > 0 && (
            <p className="success-message">
              Rabattkod "{discount.code}" tillämpad! Du får{" "}
              {discount.amount * 100}% rabatt.
            </p>
          )}
        </div>
      )}

      <div className="cart-total">
        {discount.amount > 0 ? (
          <>
            <h3 className="text-gray-500 line-through">
              Ordinarie pris: {total.toFixed(2)} kr
            </h3>
            <h2 className="text-green-600 font-bold mt-1">
              Rabatterat pris: {discountedTotal.toFixed(2)} kr
            </h2>
          </>
        ) : !noCartItems ? (
          <h3>Totalt: {total.toFixed(2)} kr</h3>
        ) : (
          <PrimaryButton
            className="w-fit mt-12"
            onClick={() => navigate("/meny")}
          >
            <span className="font-medium">Se meny</span>
            <ArrowRight />
          </PrimaryButton>
        )}
      </div>

      {cartItems.length > 0 && (
        <PrimaryButton onClick={handleOrder}>Gå till betalning</PrimaryButton>
      )}
    </div>
  );
};

export default Cart;
