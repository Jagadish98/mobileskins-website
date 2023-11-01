import banner1 from "../../images/banner2.png";
import banner2 from "../../images/banner3.webp";
import banner3 from "../../images/banner4.webp";
import banner4 from "../../images/banner5.webp";
import "./Banner.css";

function Banner() {
  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div
          id="slides"
          className="carousel slide mt-2"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#slides"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#slides"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#slides"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
            <button
              type="button"
              data-bs-target="#slides"
              data-bs-slide-to="3"
              aria-label="Slide 4"
            ></button>
          </div>
          <div className="carousel-inner w-100 h-100 ">
            <div className="carousel-item active w-100 h-100">
              <img
                src={banner1}
                className="d-block w-100 h-100 object-fit-cover"
                alt="Image1"
              />
            </div>
            <div className="carousel-item w-100 h-100">
              <img
                src={banner2}
                className="d-block w-100 h-100 object-fit-cover"
                alt="Image2"
              />
            </div>
            <div className="carousel-item w-100 h-100">
              <img
                src={banner3}
                className="d-block w-100 h-100 object-fit-cover"
                alt="Image3"
              />
            </div>
            <div className="carousel-item w-100 h-100">
              <img
                src={banner4}
                className="d-block w-100 h-100 object-fit-cover"
                alt="Image4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
