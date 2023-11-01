import { createContext, useEffect, useReducer } from "react";
import { CartReducer as reducer } from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  TOTAL_ITEMS,
  TOTAL_AMOUNT,
  SET_USER,
  CLEAR_USER,
  SET_CART_DATA,
} from "../components/actions";

export const CartContext = createContext();

const initialState = {
  cart: [],
  total_items: 0,
  total_amount: 0,
  shipping_fee: 80,
  isLoggedIn: false,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("localCart", JSON.stringify(state.cart));
    dispatch({ type: TOTAL_ITEMS, payload: state.cart });
    dispatch({ type: TOTAL_AMOUNT, payload: state.cart });
  }, [state.cart]);

  const addToCart = (product) => {
    dispatch({ type: ADD_TO_CART, payload: product });
  };

  const incrementQuantity = (sku, mobileBrand, mobileModel, bodyWrap) => {
    dispatch({
      type: INCREMENT_QUANTITY,
      payload: { sku, mobileBrand, mobileModel, bodyWrap },
    });
  };

  const decrementQuantity = (sku, mobileBrand, mobileModel, bodyWrap) => {
    dispatch({
      type: DECREMENT_QUANTITY,
      payload: { sku, mobileBrand, mobileModel, bodyWrap },
    });
  };

  const removeFromCart = (sku, mobileBrand, mobileModel, bodyWrap) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: { sku, mobileBrand, mobileModel, bodyWrap },
    });
  };

  const setUser = () => {
    console.log("Hi, from context");
    dispatch({ type: SET_USER });
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    dispatch({ type: CLEAR_USER });
  };

  const setCartFromLocalStorage = () => {
    const localCartData = localStorage.getItem("localCart");
    if (!localCartData?.length === 0) {
      dispatch({ type: SET_CART_DATA, payload: JSON.parse(localCartData) });
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        incrementQuantity,
        decrementQuantity,
        removeFromCart,
        setUser,
        logout,
        setCartFromLocalStorage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
