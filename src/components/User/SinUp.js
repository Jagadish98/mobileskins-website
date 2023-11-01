import { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { registerUser } from "../../Utilities/AuthService";
import { CartContext } from "../../context/cart_context";

const SignUp = ({ signUpShow, handleSignUpClose, handleLoginClose }) => {
  const { setUser } = useContext(CartContext);

  const initalValues = { username: "", email: "", password: "" };

  const [formValues, setFormValues] = useState(initalValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [singupError, setSignupError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "Username is required.";
    }

    if (!values.email) {
      errors.email = "Email is required.";
    }

    if (!values.password) {
      errors.password = "Password is required.";
    }
    console.log(errors);
    return errors;
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const reset = () => {
    setFormValues(initalValues);
    setSignupError("");
  };

  const handleClose = () => {
    reset();
    handleSignUpClose();
    setSignupError("");
    handleLoginClose();
  };

  const saveUser = (userDetails) => {
    userDetails.name = userDetails.username;

    registerUser(userDetails)
      .then((response) => {
        setUser();
        reset();
        handleSignUpClose();
      })
      .catch((error) => setSignupError(error?.response?.data?.message));
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      saveUser(formValues);
    }
  }, [formErrors]);

  return (
    <>
      <Modal
        show={signUpShow}
        onHide={handleClose}
        className="row mx-auto"
        centered
      >
        <div className="col-12 mx-auto">
          <Modal.Header closeButton className="text-center w-100">
            <Modal.Title className="mx-auto w-100">
              Join Mobileskins
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-10 mx-auto">
                {singupError && (
                  <p className="text-center fs-5">{singupError}</p>
                )}
                <form>
                  <div className="form-group mb-2">
                    <label htmlFor="name" className="form-label fw-semibold">
                      Username :
                    </label>
                    <input
                      type="text"
                      className="form-control mb-0"
                      id="name"
                      name="username"
                      placeholder="Choose a Username"
                      onChange={handleChange}
                    />
                    <p style={{ color: "red", marginTop: "0" }}>
                      {formErrors.username}
                    </p>
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="mail" className="form-label fw-semibold">
                      Email :
                    </label>
                    <input
                      type="email"
                      className="form-control mb-0"
                      id="mail"
                      name="email"
                      placeholder="Enter you email"
                      onChange={handleChange}
                    />
                    <p style={{ color: "red", marginTop: "0" }}>
                      {formErrors.email}
                    </p>
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
                      onChange={handleChange}
                    />
                    <p style={{ color: "red", marginTop: "0" }}>
                      {formErrors.password}
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="d-flex flex-column justify-content-center">
            <p className="fs-6 text-center ">
              By joining I agree to the terms and conditions of Mobileskins
            </p>
            <button
              type="submit"
              className="btn btn-primary btn-lg w-50"
              onClick={handleSignUpSubmit}
            >
              Register
            </button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default SignUp;
