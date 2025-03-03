import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice"; // Import addItem from Redux slice
import "./ProductList.css";
import CartItem from "./CartItem";

const ProductList = () => {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          id: 1,
          name: "Snake Plant",
          image:
            "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15",
        },
        {
          id: 2,
          name: "Spider Plant",
          image:
            "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12",
        },
      ],
    },
  ];

  // Handle Adding to Cart
  const handleAddToCart = (product) => {
    dispatch(addItem(product)); // Dispatch action to Redux store
    setAddedToCart((prevState) => ({
      ...prevState,
      [product.id]: true,
    }));
  };

  // Handle Cart Click
  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  // Handle Continue Shopping
  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  console.log("Cart Items from Redux:", useSelector((state) => state.cart.items));

  return (
    <div>
      {/* Navbar */}
      <div className="navbar" style={{ backgroundColor: "#4CAF50", color: "#fff" }}>
        <h3>Paradise Nursery</h3>
        <a href="#" onClick={handleCartClick} style={{ color: "white" }}>
          🛒 Cart
        </a>
      </div>

      {/* Render Product List or Cart */}
      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, catIndex) => (
            <div key={catIndex}>
              <h2>{category.category}</h2>
              <div className="category-grid">
                {category.plants.map((plant) => (
                  <div key={plant.id} className="product-card">
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p>{plant.cost}</p>
                    <button onClick={() => handleAddToCart(plant)}>
                      {addedToCart[plant.id] ? "Added ✅" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
};

export default ProductList;
