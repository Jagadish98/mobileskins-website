import Banner from "../components/HomeBanner/Banner";
import Navbar from "../components/Navbar/Navbar";
import ProductList from "../components/ProductList/ProductList";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <ProductList />
    </div>
  );
};

export default HomePage;
