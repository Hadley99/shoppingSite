import { Link } from "react-router-dom";
import Nav from "./Nav";
const Header = () => {
  return (
    <div className="shadow-[0px_4px_34px_-16px_#287B26]  bg-white ">
      <div className="flex justify-between items-center container px-10">
        <Link
          to="/"
          className="text-center primary-font font-bold text-primary text-2xl  py-2"
        >
          Fresh !
        </Link>
        <div className="flex">
          <Nav />
        </div>
      </div>
    </div>
  );
};

export default Header;
