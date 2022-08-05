import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { setCategory as categoryReducer } from "../redux/actions/productActions";
import { setSort as sortReducer } from "../redux/actions/productActions";
import { filterProducts } from "../redux/actions/productActions";
import { setCart } from "../redux/actions/cartActions";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const filtered = useSelector((state) => state.allProducts.filteredProducts);

  const handleCategoryChange = (category) => {
    dispatch(categoryReducer(category));
    dispatch(filterProducts());
  };
  const handleSortChange = (sort) => {
    dispatch(sortReducer(sort));
    dispatch(filterProducts());
  };

  const addToCart = (product) => {
    dispatch(
      setCart({
        ...product,
        qty: 1,
        totalPrice: product.price,
      })
    );
  };
  useEffect(() => {
    handleCategoryChange();
    handleSortChange();
  }, []);
  return (
    <div className="container px-5 pt-8 sm:px-16 sm:pt-16">
      <div className="flex justify-between items-center flex-col  sm:flex-row">
        <h1 className="text-3xl sm:mb-0 mb-2 font-bold">All Products</h1>
        <div className="text-lg flex flex-col md:flex-row w-full md:w-auto  space-y-4 md:space-y-0">
          <div className="flex md:block justify-between w-full md:w-auto">
            <span className="mr-2 font-medium">Sort By:</span>
            <select
              className="rounded border focus-within:outline-none bg-white border-primary  sm:px-2 sm:py-1 sm:mr-4 font-medium"
              onChange={(e) => {
                const sort = e.target.value;
                handleSortChange(sort);
              }}
            >
              <option value="">None</option>
              <option value="ascending">Ascending</option>
              <option value="decending">Decending</option>
              <option value="lowToHigh">Low to high</option>
              <option value="highToLow">High to Low</option>
            </select>
          </div>
          <div className="md:block flex justify-between w-full md:w-auto">
            <span className="mr-2 font-medium">Filter:</span>
            <select
              className="rounded border focus-within:outline-none bg-white border-primary sm:px-2 sm:py-1  font-medium"
              onChange={(e) => {
                const category = e.target.value;
                handleCategoryChange(category);
              }}
            >
              <option value="">All Products</option>
              <option value="fruit">Fruits</option>
              <option value="vegetable">Vegetables</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-4  sm:grid-cols-2 grid-cols-2 gap-4 md:gap-10 mb-11 mt-8 ">
        {filtered &&
          filtered.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              addToCart={addToCart}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
