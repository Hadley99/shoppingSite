import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { setCategory as categoryReducer } from "../redux/actions/productActions";
import { setSort as sortReducer } from "../redux/actions/productActions";
import { filterProducts } from "../redux/actions/productActions";
import { setCart } from "../redux/actions/cartActions";
import { useEffect, useState } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const filtered = useSelector((state) => state.allProducts.filteredProducts);
  const category = useSelector((state) => state.allProducts.types.category);
  const sort = useSelector((state) => state.allProducts.types.sort);
  let navigate = useNavigate();

  const handleCategoryChange = (category) => {
    dispatch(categoryReducer(category));
    dispatch(filterProducts());
  };
  const handleSortChange = (sort) => {
    dispatch(sortReducer(sort));
    dispatch(filterProducts());
  };

  const addToCart = (product) => {
    // user &&
    //   setTempCart((items) => [
    //     ...items,
    //     { ...product, qty: 1, totalPrice: product?.price },
    //   ]);

    // if (user) {
    dispatch(
      setCart({
        ...product,
        qty: 1,
        totalPrice: product.price,
      })
    );
    // await setDoc(
    //   doc(db, "cartAndOrder", user.uid, "cart", product.id),
    //   productToCart
    // );
    // console.log(user.uid);
    // await setDoc(doc(db, "cart_of_" + user.uid, product.id), productToCart);
    // } else {
    //   navigate("/login");
    // }
  };
  useEffect(() => {
    handleCategoryChange();
    handleSortChange();
  }, []);
  return (
    <div className="container px-16 pt-16">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">All Products</h1>
        <div>
          <select
            className="rounded border focus-within:outline-none bg-white border-primary px-2 py-1 mr-3 font-medium"
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
          <select
            className="rounded border focus-within:outline-none bg-white border-primary px-2 py-1 font-medium"
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
      <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2  gap-16 my-11 ">
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
