import { Link } from "react-router-dom";
import Nav from "./Nav";
const Header = () => {
  return (
    <div className="shadow-[0px_4px_34px_-16px_#287B26]  bg-white  pb-2 md:pb-0">
      <div className="block md:flex justify-between items-center container md:px-10  px-6 space-y-4 md:space-y-0">
        <Link
          to="/"
          className="text-center font-bold text-primary text-2xl py-2 md:w-auto w-full"
        >
          <p className=" primary-font">Fresh !</p>
        </Link>
        <div>
          <Nav />
        </div>
      </div>
    </div>
  );
};

export default Header;
