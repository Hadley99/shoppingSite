import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { loggedOut } from "../redux/actions/userActions";
import { auth } from "../firebase";
import { useSelector } from "react-redux";
const Nav = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const cartQty = useSelector((state) => state.cart.localCart);

  const logOut = async () => {
    await signOut(auth);
    dispatch(loggedOut());
  };
  return (
    <>
      <div className="grid  gird-rows-4 grid-flow-col text-sm font-medium text-primary  ">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "bg-primary text-white px-2  rounded " : "px-2"
          }
        >
          HOME
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? "bg-primary text-white px-2   rounded" : " px-2"
          }
        >
          CART <span className="  rounded p-05 py-0  ">({cartQty.length})</span>
        </NavLink>
        {user && (
          <NavLink
            to="/yourorders"
            className={({ isActive }) =>
              isActive ? "bg-primary text-white px-2  rounded" : " px-2"
            }
          >
            YOUR ORDERS
          </NavLink>
        )}
        {user ? (
          <button className="px-2 font-medium" onClick={logOut}>
            LOGOUT
          </button>
        ) : (
          <div>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? "bg-primary text-white px-2  rounded " : "px-2"
              }
            >
              SIGNUP
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "bg-primary text-white px-2  rounded " : "px-2"
              }
            >
              LOGIN
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
};

export default Nav;
