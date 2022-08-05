import { doc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { db } from "../firebase";

const SingleCartProduct = ({
  product,
  handleQuantityIncrease,
  handleQuantityDecrease,
  handleRemove,
}) => {
  return (
    <>
      <div className="col-span-5  shadow-md">
        <div className="grid bg-white grid-cols-5 rounded-md">
          <div className="col-span-1">
            <div className="col-span-1 grid place-items-center">
              <img
                src={product.image}
                className="rounded-md w-full"
                alt={product.title}
              />
            </div>
          </div>
          <div className=" col-span-1 grid place-items-center">
            <div className="font-medium text-lg">{product.title}</div>
          </div>
          <div className=" col-span-1 grid place-items-center">
            <div className="border-black flex items-center justify-center rounded border">
              <div
                className="px-2 hover:bg-gray-300 rounded bg-gray-200 cursor-pointer"
                onClick={() => {
                  handleQuantityDecrease(product);
                }}
              >
                -
              </div>
              <div className="px-2 ">{product.qty}</div>
              <div
                className="px-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
                onClick={() => {
                  handleQuantityIncrease(product);
                }}
              >
                +
              </div>
            </div>
          </div>
          <div className="font-medium text-lg col-span-1 grid place-items-center">
            <div>$ {product.totalPrice}</div>
          </div>
          <div className=" col-span-1 grid place-items-center ">
            <div
              className="hover:bg-red-800 bg-red-700 cursor-pointer  px-3 py-1 text-white rounded font-medium"
              onClick={() => {
                handleRemove(product);
              }}
            >
              Remove
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleCartProduct;
