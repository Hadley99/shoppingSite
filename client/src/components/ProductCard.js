import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProductCard = ({ product, addToCart }) => {
  const user = useSelector((state) => state.user.value);
  const cart = useSelector((state) => state.cart.localCart);
  return (
    <div
      title={product.title}
      className="bg-white w-100 shadow-[0px_12px_8px_#00000035] flex flex-col  rounded-md px-3  py-4 transition ease-in-out  sm:hover:scale-110 sm:hover:shadow-[0px_50px_15px_#00000035]"
    >
      <div className="my-auto pb-6">
        <img
          loading="lazy"
          src={product.image}
          alt={product.title}
          width="100%"
        />
      </div>
      <div>
        <h2
          title={product.title}
          className="font-semibold text-xl md:text-2xl pb-2"
        >
          {product.title}
        </h2>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <p className="md:text-lg font-medium text-gray-500 ">
            ${product.price}
          </p>
          {cart && cart.find((p) => p.id === product.id) ? (
            <Link
              to="/cart"
              className="bg-blue-700 text-white px-2 md:px-3 py-05 font-medium text-center  rounded-md hover:bg-blue-900"
            >
              Go to Cart
            </Link>
          ) : (
            <button
              onClick={() => {
                addToCart(product);
              }}
              className="bg-primary text-white px-2 md:px-3  py-05  font-medium  rounded-md hover:bg-green-900"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
