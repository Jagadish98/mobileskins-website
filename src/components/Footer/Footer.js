import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPinterest,
  FaPaperPlane,
} from "react-icons/fa";
import "./Footer.css";

const handleFormSubmit = (e) => {
  e.preventDefault();
};

const Footer = () => {
  return (
    <footer className="pt-5 main-div">
      <div className="container">
        <div className="row">
          <hr />
          <div className="col-lg-4 mb-5 mb-lg-0">
            <div className="fw-bold text-uppercase mb-3">MobileSkins</div>
            <p>Premium Mobile skins available, Anime skins, Artwork skins</p>
            <ul className="list-inline">
              <li className="list-inline-item px-2">
                <Link to="">
                  <FaFacebook />
                </Link>
              </li>
              <li className="list-inline-item px-2">
                <Link to="">
                  <FaTwitter />
                </Link>
              </li>
              <li className="list-inline-item px-2">
                <Link to="">
                  <FaYoutube />
                </Link>
              </li>
              <li className="list-inline-item px-2">
                <Link to="">
                  <FaInstagram />
                </Link>
              </li>
              <li className="list-inline-item px-2">
                <Link to="">
                  <FaPinterest />
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
            <h6 className="text-uppercase mb-3">Important Links</h6>
            <ul className="navbar-nav fw-semibold ">
              <li className="nav-item">
                <Link to="/" className="nav-link active mb-0 pb-0">
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
          </div>
          <div className="col-lg-5">
            <h6 className="text-uppercase mb-3">Daily Offers & Discounts</h6>
            <p>
              Get notified on the best offers and new arrivals by subscribing to
              our newsletter.
            </p>
            <form action="#">
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control bg-transparent"
                  placeholder="Your Email Address"
                  name="subscriber_email"
                />
                <button
                  className="btn btn-outline-dark"
                  type="submit"
                  onClick={handleFormSubmit}
                >
                  <FaPaperPlane />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="pt-4 bg-info">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start ">
              <p className="fw-semibold ">
                &copy; 2023, MobileSkins. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
