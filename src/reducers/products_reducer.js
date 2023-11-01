import {
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_SUCCESS,
  GET_SINGLE_PRODUCTS_BEGIN,
  GET_SINGLE_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCTS_SUCCESS,
  SET_SEARCHDATA,
} from "../components/actions";

export const ProductsReducer = (state, action) => {
  switch (action.type) {
    case GET_PRODUCTS_BEGIN:
      return { ...state, products_loading: true };

    case GET_PRODUCTS_SUCCESS: {
      const trending_products = action.payload.filter(
        (product) => product.trending === true
      );
      return {
        ...state,
        products_loading: false,
        products: action.payload,
        trending_products,
      };
    }
    case GET_PRODUCTS_ERROR:
      return { ...state, products_loading: false, products_error: true };

    case GET_SINGLE_PRODUCTS_BEGIN:
      return {
        ...state,
        singleProduct_loading: true,
        singleProduct_error: false,
      };

    case GET_SINGLE_PRODUCTS_SUCCESS:
      return {
        ...state,
        singleProduct_loading: false,
        singleProduct_error: false,
        singleProduct: action.payload,
      };

    case GET_SINGLE_PRODUCTS_ERROR:
      return {
        ...state,
        singleProduct_loading: false,
        singleProduct_error: true,
      };

    case SET_SEARCHDATA:
      return {
        ...state,
        searchData: action.payload,
      };

    default:
      throw new Error(`No action item found for ${action.type}`);
  }
};

export default ProductsReducer;
