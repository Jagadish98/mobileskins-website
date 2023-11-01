import { useContext } from "react";
import "./ProductList.css";
import { ProductsContext } from "../../context/products_context";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import Product from "../Product/Product";

const ProductList = () => {
  const data = useContext(ProductsContext);
  const {
    products_loading: loading,
    products_error: error,
    products,
  } = data.state;

  if (loading) return <Loading />;

  if (error) return <Error />;

  return (
    <div className="container">
      <div className="row mt-5 ">
        {products.map((product, index) => (
          <Product product={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
