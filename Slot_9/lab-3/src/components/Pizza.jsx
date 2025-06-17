import AppNavbar from "./Navbar";
import Carousel from "./Carousel";
import Menu from "./Menu";
import Booking from "./Booking";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Pizza() {
  return (
    <div className="bg-dark text-white">
      <AppNavbar />
      <Carousel />
      <Menu />
      <Booking />
    </div>
  );
}

export default Pizza;
