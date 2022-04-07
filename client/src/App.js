import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { loggedIn } from "./redux/actions/userActions";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { setProducts } from "./redux/actions/productActions";
import StripeContainer from "./components/StripeContainer";
import YourOrders from "./components/YourOrders";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const productsCollectionRef = collection(db, "products");
  const userIdRef = user && user.uid;

  // const cartRef = collection(db, "cartAndOrder", userIdRef, "cart");

  useEffect(() => {
    //setting user state, storing user id and email
    onAuthStateChanged(auth, (currentuser) => {
      if (currentuser) {
        dispatch(
          loggedIn({
            uid: currentuser?.uid,
            email: currentuser?.email,
          })
        );
      }
    });
    //fetching data from database
    const getAllProductsFromDb = async () => {
      const data = await getDocs(productsCollectionRef);
      dispatch(
        setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
    };
    //fetching user cart from db
    const getUserCartFromDb = async () => {
      // const q = query(collection(db, "cartAndOrder", userIdRef, "cart"));
      // // const q = query(collectionGroup(db, "cartAndOrder", userIdRef, "cart"));
      // const unsubscribe = onSnapshot(q, (querySnapshot) => {
      //   const cartFromDb = [];
      //   querySnapshot.forEach((doc) => {
      //     cartFromDb.push({ ...doc.data(), id: doc.id });
      //   });
      //   dispatch(setCart(cartFromDb));
      //   dispatch(setCartQty(querySnapshot.docs.length));
      // });
      /////////////////
      // const res = onSnapshot(collectionGroup(db, "cart"), (querrySnapshot) => {
      //   const cartFromDb = [];
      //   console.log(querrySnapshot);
      //   querrySnapshot.docs.map((doc) => {
      //     cartFromDb.push({ ...doc.data(), id: doc.id });
      //     console.log(cartFromDb);
      //   });
      // });
    };
    getUserCartFromDb();
    getAllProductsFromDb();
  }, [userIdRef]);
  return (
    <Router>
      <div className="App ">
        <Header />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/yourorders" element={<YourOrders />} />
          <Route exact path="/stripepayment" element={<StripeContainer />} />

          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
