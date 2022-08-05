import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SingleCartProduct from "./SingleCartProduct";

import { useNavigate } from "react-router-dom";
import {
  incrementQty,
  decrementQty,
  removeFromCart,
} from "../redux/actions/cartActions";
import StripeContainer from "./StripeContainer";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [openModal, setOpenModal] = useState(false);
  const userIdRef = user?.uid;
  // const cartRef = collection(db, "cartAndOrder", userIdRef, "cart");
  const cart = useSelector((state) => state.cart.localCart);

  //deleting cart on remove

  const handleRemove = async (product) => {
    dispatch(removeFromCart(product.id));
    //  await deleteDoc(doc(db, "cartAndOrder", userIdRef, "cart", product.id));
  };

  //Calucating total price of cart

  const TotalCartPrice = cart
    ?.map((product) => product.totalPrice)
    ?.reduce((acc, crr) => {
      let sum = acc + crr;
      return Math.round(sum * 100) / 100;
    }, 0);

  //Quantity Decreasing
  const handleQuantityDecrease = async (product) => {
    if (product.qty > 1) {
      dispatch(decrementQty(product.id));

      // await updateDoc(userDoc, newFields);
    }
  };

  //Quantity increasing
  const handleQuantityIncrease = async (product) => {
    if (product.qty < 10) {
      dispatch(incrementQty(product.id));
    }
  };
  const handleBuy = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {}, [userIdRef]);
  return (
    <>
      {openModal ? (
        <StripeContainer price={TotalCartPrice} closeModal={setOpenModal} />
      ) : (
        <div className="container md:px-16 px-4 pt-16">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Cart</h1>
          </div>
          {cart?.length > 0 ? (
            <div className="grid grid-cols-5 text-xl font-medium text-center">
              <div></div>
              <div>Name</div>
              <div>Quantity</div>
              <div>Price</div>
              <div></div>
            </div>
          ) : (
            ""
          )}
          {/* <hr className="my-3 border-black " /> */}
          <div className="grid grid-cols-5 gap-8  mb-11">
            {cart &&
              cart.map((product) => (
                <SingleCartProduct
                  key={product.id}
                  product={product}
                  handleQuantityIncrease={handleQuantityIncrease}
                  handleQuantityDecrease={handleQuantityDecrease}
                  handleRemove={handleRemove}
                />
              ))}
          </div>

          {cart?.length > 0 ? (
            <div className="grid grid-cols-5 mb-11 text-center">
              <div className="col-span-3 "></div>

              <div className="font-medium text-xl">
                Total: ${TotalCartPrice}
              </div>
              <div>
                <button
                  className="bg-primary  text-white px-3  py-05 font-medium rounded-md hover:bg-green-900"
                  onClick={handleBuy}
                >
                  Check out
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center font-medium text-xl ">
              Your cart is empty.
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Cart;
