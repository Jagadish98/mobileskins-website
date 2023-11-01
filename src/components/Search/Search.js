import { useContext } from "react";
import { ProductsContext } from "../../context/products_context";
import Product from "../Product/Product";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import { Link } from "react-router-dom";

const Search = () => {
  const { state } = useContext(ProductsContext);
  const {
    searchData,
    products_loading: loading,
    products_error: error,
  } = state;

  if (searchData.length === 0) {
    console.log("entered here");
    return (
      <div className="container mt-5 d-flex ">
        <div className="row mt-5 w-100 ">
          <div className="col-lg-12 d-flex flex-column justify-content-center align-items-center">
            <button type="button" className="btn btn-lg btn-warning ">
              <Link
                to="/"
                className="link-underline link-underline-opacity-0 fw-semibold "
              >
                Back to home
              </Link>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) return <Loading />;

  if (error) return <Error />;

  return (
    <div className="container">
      <div className="row mt-5">
        {searchData.map((product, index) => (
          <Product product={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Search;
