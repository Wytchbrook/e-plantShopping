import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalCost = useSelector((state) => 
    state.cart.items.reduce((total, item) => total + parseFloat(item.cost.substring(1)) * item.quantity, 0)
  );
  const dispatch = useDispatch();

  // Checkout placeholder function
  const handleCheckoutShopping = () => {
    alert("Functionality to be added for future reference");
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Price: {item.cost}</p>
                <div className="cart-actions">
                  <button onClick={() => dispatch(removeItem(item.id))}>Remove</button>
                  
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))
                    }
                  />
                </div>
              </div>
            </div>
          ))}
          <h3 className="total-cost">Total Cost: ${totalCost.toFixed(2)}</h3>
        </div>
      )}

      <button onClick={onContinueShopping} className="continue-shopping">
        Continue Shopping
      </button>

      <button onClick={handleCheckoutShopping} className="checkout-btn">
        Checkout
      </button>
    </div>
  );
};

export default CartItem;
