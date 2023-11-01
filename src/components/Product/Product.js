import "./Product.css";
import { productImg_url as url } from "../../Utilities/constants";
import { Link } from "react-router-dom";
import { formatPrice } from "../../Utilities/helpers";

function Product({ product }) {
  return (
    <>
      <div className="col-lg-3 col-md-4 col-6 mt-lg-2">
        <div className="card mt-2">
          <Link to={`/productdetail/${product.sku}`}>
            <img
              src={url + product.sku}
              className="card-img-top img-fluid object-fit-contain"
              alt={product.picName}
            />
          </Link>
          <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">Rs. {formatPrice(product.price)}</p>
            <Link to={`/productdetail/${product.sku}`}>
              <button className="btn btn-outline-primary card-butn">
                View details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;

//  <Link to={`/productdetail/${product.sku}`}>
//    <button className="btn btn-outline-primary card-butn">View details</button>
//  </Link>;
