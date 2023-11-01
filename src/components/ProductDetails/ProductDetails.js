import "./ProductDetails.css";
import { brands } from "../../Utilities/brands";
import { useState, useEffect, useContext } from "react";
import { ProductsContext } from "../../context/products_context";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import { singleProduct_url } from "../../Utilities/constants";
import { formatPrice } from "../../Utilities/helpers";
import { productImg_url as url } from "../../Utilities/constants";
import { CartContext } from "../../context/cart_context";

function ProductDetails() {
  const data = useContext(ProductsContext);
  const {
    singleProduct_loading: loading,
    singleProduct_error: error,
    singleProduct,
  } = data.state;

  const { fetchSingleProduct } = data;

  const { addToCart } = useContext(CartContext);

  const { product_sku } = useParams();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    mobileBrand: "",
    mobileModel: "",
    bodyWrap: "Only Back(No Sides)",
    product: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const [isSubmit, setIsSubmit] = useState(false);

  //fill the formValues state
  const handleInputChange = (event) => {
    //create a new object with all properties of formValues & modify them as and when user user types in.
    const values = { ...formValues, [event.target.name]: event.target.value };
    setFormValues(values);
  };

  const ValidateForm = (formValues) => {
    const errors = {};

    //Making sure user selects proper Mobile brand
    if (
      !formValues.mobileBrand ||
      formValues.mobileBrand === "Select Phone brand"
    ) {
      errors.mobileBrand = "Phone Brand is required.";
    }

    //Making sure user selects proper Mobile model
    if (!formValues.mobileModel || formValues.mobileModel.includes("Select")) {
      errors.mobileModel = "Phone Model is required.";
    }

    return errors;
  };

  const handleOnSubmit = (event, singleProduct) => {
    event.preventDefault();
    setFormValues({ ...formValues, product: singleProduct });
    setFormErrors(ValidateForm(formValues));
    setIsSubmit(true);
  };

  //This is to check for formErrors and ask user to enter valid data
  useEffect(() => {
    //Check for form errors only if user submitted form.
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      //If form data is valid, create a new cart item and add it to cart.

      const cartProduct = {
        title: formValues.product.title,
        price: formValues.product.price,
        sku: formValues.product.sku,
        mobileBrand: formValues.mobileBrand,
        mobileModel: formValues.mobileModel,
        bodyWrap: formValues.bodyWrap,
        quantity: 1,
        uniqueValue:
          formValues.product.sku +
          formValues.mobileBrand +
          formValues.mobileModel +
          formValues.bodyWrap,
      };
      addToCart(cartProduct);
    }
  }, [formErrors]);

  //This is to fetch single product from DB & should be triggerred as and when product_sku changes
  useEffect(() => {
    fetchSingleProduct(`${singleProduct_url}${product_sku}`);
  }, [product_sku]);

  //If product is not found with product_sku, show error and redirect back to homepage after 3secs.
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [error]);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <div className="container mt-5">
        <div className="row w-100">
          {/* left side div, Image container */}
          <div className="col-md-5 mx-auto">
            <img
              src={url + singleProduct.sku}
              className="img-fluid object-fit-contain product-img "
              alt={singleProduct.picName}
            />
          </div>
          {/* right side div */}
          <div className="col-md-7 mt-5">
            <h5 className=" title">{singleProduct.title}</h5>
            <h4 className="price">Rs. {formatPrice(singleProduct.price)}</h4>
            <p className="shipping">
              Tax included. Shipping calculated at checkout.
            </p>

            <form onSubmit={handleOnSubmit}>
              <p className="mb-0 pb-0 mt-5">Phone Brand *</p>
              <select
                className="form-select w-50"
                defaultValue={"Select Phone brand"}
                onChange={handleInputChange}
                name="mobileBrand"
              >
                <option value="Select Phone brand">Select Phone brand</option>
                {brands.map((brand, index) => {
                  return (
                    <option key={index} value={brand.name}>
                      {brand.name}
                    </option>
                  );
                })}
              </select>
              <p style={{ color: "red" }}>{formErrors.mobileBrand}</p>

              {formValues.mobileBrand &&
                formValues.mobileBrand !== "Select Phone brand" && (
                  <div>
                    <p className="mb-0 pb-0 mt-4">
                      {formValues.mobileBrand} Models *
                    </p>
                    <select
                      className="form-select w-50 mb"
                      defaultValue={`Select ${formValues.mobileBrand} Model`}
                      onChange={handleInputChange}
                      name="mobileModel"
                    >
                      <option
                        value={`Select + ${formValues.mobileBrand} Model`}
                      >
                        Select {formValues.mobileBrand} Model
                      </option>
                      {brands.map((brand, index) => {
                        return (
                          <option key={index} value={brand.name}>
                            {brand.name}
                          </option>
                        );
                      })}
                    </select>
                    <p style={{ color: "red" }}>{formErrors.mobileModel}</p>

                    <select
                      className="form-select w-50 mt-4 "
                      defaultValue={"Only Back(No Sides)"}
                      onChange={handleInputChange}
                      name="bodyWrap"
                    >
                      <option value="Full Body Wrap (Cover Sides & Edges)">
                        Full Body Wrap (Cover Sides & Edges)
                      </option>
                      <option value="Only Back(No Sides)">
                        Only Back(No Sides)
                      </option>
                    </select>
                  </div>
                )}
              <div className="row">
                <div className="col-lg-6 col-11">
                  <div className="d-flex flex-column mt-3 ">
                    <button
                      type="submit"
                      className="btn btn-lg text-capitalize btn-outline-primary mt-3"
                      onClick={(event) => handleOnSubmit(event, singleProduct)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
