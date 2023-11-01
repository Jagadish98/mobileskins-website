import { Link } from "react-router-dom";

const ThankYouPage = () => {
  return (
    <div className="container mt-5 d-flex ">
      <div className="row mt-5 w-100 ">
        <div className="col-lg-12 d-flex flex-column justify-content-center align-items-center">
          <h1>404</h1>
          <h3>Thanks, The form was submitted successfully.</h3>
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
};

export default ThankYouPage;
