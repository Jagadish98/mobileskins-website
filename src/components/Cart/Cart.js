import { useContext } from "react";
import { CartContext } from "../../context/cart_context";
import { productImg_url as url } from "../../Utilities/constants";
import "./Cart.css";
import { FaTrashCan, FaChevronUp, FaChevronDown } from "react-icons/fa6";
import { formatPrice } from "../../Utilities/helpers";
import { useState } from "react";

export const Cart = () => {
  const {
    cart,
    total_items,
    total_amount,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
  } = useContext(CartContext);

  const [isOrdered, setIsOrdered] = useState(false);

  const order_total = total_items !== 0 ? total_amount + 80 : total_amount;

  const handleCheckout = (e) => {
    if (order_total > 0) {
      setIsOrdered(!isOrdered);
    }
  };
  return (
    <div className="container-fluid">
      <div className="row mt-5">
        <div className="col-md-10 col-11 mx-auto">
          <div className="row mt-5 gx-3 mb-5">
            {/* left side div */}
            <h2>Cart ({total_items} items)</h2>
            {cart?.map((product) => {
              const {
                sku,
                mobileBrand,
                mobileModel,
                bodyWrap,
                quantity,
                title,
                price,
              } = product;
              if (quantity === 0) return;
              return (
                <div
                  key={sku + mobileBrand + mobileModel + bodyWrap}
                  className="col-lg-8 col-md-12 col-11 mb-lg-0 mb-5"
                >
                  <div className="card shadow">
                    {/* card image div */}
                    <div className="row">
                      <div className="col-md-2 col-11 mx-auto d-flex justify-content-center align-items-center ">
                        <img
                          src={url + sku}
                          alt={sku}
                          className="img-fluid product_pic"
                        />
                      </div>
                      {/* card product details */}
                      <div className="col-md-10 col-11 mx-auto px-4 mt-2">
                        <div className="row">
                          {/* product title, price, model, brand */}
                          <div className="col-8 card-title">
                            <h1 className="mb-4 product_title fs-5">{title}</h1>
                            <p className="mb-2">Brand : {mobileBrand}</p>
                            <p className="mb-2">Model : {mobileModel}</p>
                            <p className="mb-2">BodyWrap : {bodyWrap}</p>
                          </div>
                          {/* quantity arrow marks */}
                          <div className="col-4 d-flex flex-column justify-content-end my-auto">
                            <p className="mx-auto mb-auto fw-light">Qty</p>
                            <button
                              type="button"
                              className="quantity_btn mx-auto"
                              onClick={() =>
                                incrementQuantity(
                                  sku,
                                  mobileBrand,
                                  mobileModel,
                                  bodyWrap
                                )
                              }
                            >
                              <FaChevronUp />
                            </button>

                            <span className="text-center">{quantity}</span>

                            <button
                              type="button"
                              className="quantity_btn mx-auto"
                              onClick={() =>
                                decrementQuantity(
                                  sku,
                                  mobileBrand,
                                  mobileModel,
                                  bodyWrap
                                )
                              }
                            >
                              <FaChevronDown />
                            </button>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-11 d-flex justify-content-between">
                            <button
                              type="button"
                              onClick={() =>
                                removeFromCart(
                                  sku,
                                  mobileBrand,
                                  mobileModel,
                                  bodyWrap
                                )
                              }
                              className="btn btn-light btn-sm bg-transparent border-0 "
                            >
                              <FaTrashCan className="me-md-2 me-0" /> Remove
                              Item
                            </button>
                            <p className="fw-semibold">
                              Rs. {formatPrice(price * quantity)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* right side div */}
            <div className="col-lg-4 col-md-12 col-11 mx-auto mb-5 right_div">
              <h2 className="fs-2 mb-lg-4 mb-2 text-center">Total Amount</h2>
              <div className="d-flex justify-content-around align-items-center ">
                <p className="fs-5 fw-semibold">Subtotal :</p>
                <p>
                  Rs{" "}
                  <span className="fw-semibold">
                    {formatPrice(total_amount)}
                  </span>
                </p>
              </div>
              <div className="d-flex justify-content-around align-items-center ">
                <p className="fs-6">Shipping fee :</p>
                <p>
                  Rs{" "}
                  <span>
                    {total_items !== 0 ? formatPrice(80) : formatPrice(0)}
                  </span>
                </p>
              </div>
              <hr />
              <div className="d-flex justify-content-around align-items-center ">
                <p className="fs-4 fw-semibold">Order Total :</p>
                <p className="fw-semibold fs-4">{formatPrice(order_total)}</p>
              </div>
              {!isOrdered && (
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-lg btn-warning text-uppercase mb-2 fw-semibold"
                    onClick={handleCheckout}
                  >
                    checkout
                  </button>
                </div>
              )}
              {isOrdered && (
                <div className="d-flex justify-content-center fw-semibold text-capitalize">
                  Your order is received.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
