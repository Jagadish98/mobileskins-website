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

export const CartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { sku, mobileBrand, mobileModel, bodyWrap } = action.payload;
      let searchValue = sku + mobileBrand + mobileModel + bodyWrap;
      console.log("cart : ", state.cart);
      let tempItem = state.cart?.find((cartItem) => {
        return searchValue === cartItem.uniqueValue;
      });

      if (tempItem) {
        //if product exists, find it in cart and increment its quantity by 1.
        let updatedCart = state.cart?.map((cartItem) => {
          if (searchValue === cartItem.uniqueValue) {
            let newQuantity = cartItem.quantity + 1;
            return { ...cartItem, quantity: newQuantity };
          } else {
            //if product is not found, just return the current cartItem
            return cartItem;
          }
        });

        return { ...state, cart: updatedCart };
      } else {
        //it is a new item, not added to cart before
        const newItem = { ...action.payload };
        return { ...state, cart: [...state.cart, newItem] };
      }
    }

    case INCREMENT_QUANTITY: {
      const { sku, mobileBrand, mobileModel, bodyWrap } = action.payload;
      let searchValue = sku + mobileBrand + mobileModel + bodyWrap;
      let updatedCart = state.cart?.map((cartItem) => {
        if (searchValue === cartItem.uniqueValue) {
          let newQuantity = cartItem.quantity + 1;
          return { ...cartItem, quantity: newQuantity };
        } else {
          return cartItem;
        }
      });
      return { ...state, cart: updatedCart };
    }

    case DECREMENT_QUANTITY: {
      const { sku, mobileBrand, mobileModel, bodyWrap } = action.payload;
      let searchValue = sku + mobileBrand + mobileModel + bodyWrap;
      let updatedCart = state.cart?.map((cartItem) => {
        if (searchValue === cartItem.uniqueValue) {
          let newQuantity = cartItem.quantity - 1;
          if (newQuantity === 0) newQuantity = 1;
          return { ...cartItem, quantity: newQuantity };
        } else {
          return cartItem;
        }
      });
      return { ...state, cart: updatedCart };
    }

    case REMOVE_CART_ITEM: {
      const { sku, mobileBrand, mobileModel, bodyWrap } = action.payload;
      let searchValue = sku + mobileBrand + mobileModel + bodyWrap;
      let updatedCart = state.cart?.filter(
        (cartItem) => searchValue !== cartItem.uniqueValue
      );

      return { ...state, cart: updatedCart };
    }

    case TOTAL_ITEMS: {
      let total_items = action.payload?.reduce((initialValue, cartItem) => {
        initialValue = initialValue + cartItem.quantity;
        return initialValue;
      }, 0);
      if (total_items === undefined) {
        total_items = 0;
      }
      return { ...state, total_items };
    }

    case TOTAL_AMOUNT: {
      let total_amount = action.payload?.reduce((initialValue, cartItem) => {
        initialValue = initialValue + cartItem.price * cartItem.quantity;
        return initialValue;
      }, 0);
      if (total_amount === undefined) {
        total_amount = 0;
      }
      return { ...state, total_amount };
    }

    case SET_USER: {
      console.log("setting isLogged to true");
      return { ...state, isLoggedIn: true };
    }

    case CLEAR_USER:
      return { ...state, isLoggedIn: false };

    case SET_CART_DATA:
      return { ...state, cart: action.payload };

    default:
      throw new Error(`No action item found for ${action.type}`);
  }
};
