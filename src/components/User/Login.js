import { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import SignUp from "./SinUp";
import { loginUser, saveLoggedInUser } from "../../Utilities/AuthService";
import { CartContext } from "../../context/cart_context";

const Login = ({ show, handleClose, setShow }) => {
  const [signUpShow, setSignUpShow] = useState(false);
  const { setUser } = useContext(CartContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleSignUpClose = () => {
    setSignUpShow(false);
    setShow(false);
  };
  const handleSignUpShow = () => {
    setSignUpShow(true);
    setShow(false);
  };

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const handleLoginClose = () => {
    reset();
    console.log("called");
    setLoginError("");
    console.log("loginError : ", loginError);
    handleClose();
  };

  async function handleLoginSubmit(e) {
    e.preventDefault();
    await loginUser(email, password)
      .then((response) => {
        //form basic auth string, i.e., base64 encoded string of email+pwd
        //const token = window.btoa(email + ":" + password);
        saveLoggedInUser(email);
        setUser();
        reset();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        setLoginError(error?.response?.data?.message);
      });
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleLoginClose}
        className="row mx-auto"
        centered
      >
        <div className="col-12 mx-auto">
          <Modal.Header closeButton className="text-center w-100">
            <Modal.Title className="mx-auto w-100">
              Login to Mobileskins
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-10 mx-auto">
                {loginError && (
                  <p className="text-center text-danger">{loginError}</p>
                )}
                <form>
                  <div className="form-group">
                    <label htmlFor="mail" className="form-label fw-semibold">
                      Email :
                    </label>
                    <input
                      type="email"
                      className="form form-control mb-4"
                      id="mail"
                      name="email"
                      placeholder="Enter you email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pwd" className="form-label fw-semibold ">
                      Password :
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="pwd"
                      name="password"
                      placeholder="Choose a Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </form>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="d-flex flex-column justify-content-center">
            <button
              type="submit"
              className="btn btn-primary btn-lg w-50"
              onClick={handleLoginSubmit}
            >
              Log In
            </button>
            <div className="mt-4">
              <div className="d-flex justify-content-center links">
                Don't have an account?
                <Link to="#" className="mx-2" onClick={handleSignUpShow}>
                  Sign Up
                </Link>
              </div>
              <div className="d-flex justify-content-center">
                <Link to="#">Forgot your password?</Link>
              </div>
            </div>
          </Modal.Footer>
        </div>
      </Modal>
      <SignUp
        signUpShow={signUpShow}
        handleSignUpClose={handleSignUpClose}
        handleLoginClose={handleLoginClose}
      />
    </>
  );
};

export default Login;
