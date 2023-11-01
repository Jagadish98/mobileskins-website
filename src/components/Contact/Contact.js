import { useState } from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="container holder">
      <h4 className="text-center mb-md-4 fs-2 ">Contact Us</h4>;
      <form
        className="row g-3"
        action="https://formspree.io/f/xrgwjavy"
        method="POST"
      >
        <p>
          Address: Flat no 703, Chandak SRA 1 Building (Riddhi siddhi), parvat
          nagar, s.v.road, dahisar east, Bangalore, Karnataka
        </p>
        <p>mobileskins@gmail.com</p>
        <div className="col-md-6">
          <label htmlFor="firstName" className="form-label fw-semibold ">
            First Name
          </label>
          <input
            type="text"
            name="userFirstName"
            id="firstName"
            className="form-control"
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="lastName" className="form-label fw-semibold">
            Last Name
          </label>
          <input
            type="text"
            name="userLastName"
            id="lastName"
            className="form-control"
          />
        </div>
        <div className="col-md-8">
          <label htmlFor="emailId" className="form-label fw-semibold">
            Email
          </label>
          <input
            type="email"
            name="useremail"
            id="emailId"
            className="form-control"
            required
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="number" className="form-label fw-semibold">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            id="number"
            className="form-control"
            required
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="comments" className="form-label fw-semibold">
            Message
          </label>
          <textarea
            name="message"
            id="comments"
            rows="3"
            className="form-control"
          ></textarea>
        </div>
        <div className="col-md-12">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
