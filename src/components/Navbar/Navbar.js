import React, { useContext, useEffect, useState } from "react";
import logo from "../../images/brand-logo.png";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserPlus, FaUserMinus } from "react-icons/fa";
import { CartContext } from "../../context/cart_context";
import Login from "../User/Login";
import { isUserLoggedIn } from "../../Utilities/AuthService";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import axios from "axios";
import { products_url as url } from "../../Utilities/constants";
import { ProductsContext } from "../../context/products_context";

function Navbar() {
  const { isLoggedIn, total_items, logout } = useContext(CartContext);
  const { state, setSearchData } = useContext(ProductsContext);

  const [show, setShow] = useState(false);

  const isAlreadyLoggedIn = isUserLoggedIn();

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLogout = () => {
    logout();
  };

  const hanndleOnSearch = (string, results) => {
    navigate("/search");
    setSearchData(results);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light border-bottom shadow-md fixed-top">
        <div className="container">
          <Link to="" className="navbar-brand d-inline-flex p-0 me-0 me-md-3">
            <img src={logo} alt="MobileSkins" />
          </Link>

          <div className="search-container">
            <ReactSearchAutocomplete
              className="search-box"
              items={state.products}
              fuseOptions={{ keys: ["title"] }}
              resultStringKeyName="title"
              onSearch={hanndleOnSearch}
              placeholder="Search"
              styling={{
                height: "34px",
                width: "180px !important",
                borderRight: 0,
                padding: "0.1rem 0.7rem",
                fontSize: "0.9rem",
                outline: "none",
                color: "rgb(152, 152, 152)",
                border: "1px solid rgb(38, 199, 116)",
              }}
            />
          </div>
          <button
            type="button"
            className="navbar-toggler border-0"
            data-bs-toggle="collapse"
            data-bs-target="#content"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="content">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/trending" className="nav-link">
                  Trending Skin Collection
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  Contact
                </Link>
              </li>
            </ul>
            <div className="ms-auto d-flex flex-row gap-4 mb-md-0 ms-auto">
              <Link
                to="/cart"
                className="link-underline link-underline-opacity-0 d-flex align-items-center gap-1"
              >
                Cart
                <span className="cart-container">
                  <FaShoppingCart />
                  <span className="cart-value">{total_items}</span>
                </span>
              </Link>

              {!isLoggedIn && !isAlreadyLoggedIn && (
                <button
                  type="button"
                  className="btn border-0 login-butn d-flex align-items-center gap-1"
                  onClick={handleShow}
                >
                  Login <FaUserPlus />
                </button>
              )}

              {(isLoggedIn || isAlreadyLoggedIn) && (
                <button
                  type="button"
                  className="btn border-0 login-butn d-flex align-items-center gap-1"
                  onClick={handleLogout}
                >
                  Logout <FaUserMinus />
                </button>
              )}

              {/* Modal */}
              <Login show={show} handleClose={handleClose} setShow={setShow} />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
