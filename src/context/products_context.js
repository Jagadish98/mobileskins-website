import { createContext, useEffect, useReducer } from "react";
import { products_url as url } from "../Utilities/constants";

import {
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCTS_BEGIN,
  GET_SINGLE_PRODUCTS_SUCCESS,
  GET_SINGLE_PRODUCTS_ERROR,
  SET_SEARCHDATA,
} from "../components/actions";

import reducer from "../reducers/products_reducer";
import axios from "axios";

const initialState = {
  products_loading: false,
  products_error: false,
  products: [],
  trending_products: [],
  singleProduct_loading: false,
  singleProduct_error: false,
  singleProduct: {},
  searchData: [],
};

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //func() to fetch all the products
  const fetchProducts = async (url) => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const response = await axios.get(url);
      const products = response.data;
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };

  //func() to fetch a single product
  const fetchSingleProduct = async (singleProduct_url) => {
    dispatch({ type: GET_SINGLE_PRODUCTS_BEGIN });
    try {
      const response = await axios.get(singleProduct_url);
      const product = response.data;
      dispatch({ type: GET_SINGLE_PRODUCTS_SUCCESS, payload: product });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCTS_ERROR });
    }
  };

  const setSearchData = (data) => {
    dispatch({
      type: SET_SEARCHDATA,
      payload: data,
    });
  };

  useEffect(() => {
    fetchProducts(url);
  }, []);

  return (
    <ProductsContext.Provider
      value={{ state, fetchSingleProduct, setSearchData }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

// export const useProductsContext = () => {
//   return useContext(ProductsContext);
// };
