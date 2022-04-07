import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();
  const registerUser = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      navigate("/");
    } catch (error) {
      setErrorMessage(error.code);
    }
  };

  return (
    <form>
      <div className="flex h-101  justify-center items-center ">
        <div className=" flex shadow-xl bg-white  flex-col rounded  w-96  px-10 pb-6 pt-8">
          <h1 className="text-2xl font-bold mb-6">Sign Up</h1>

          <input
            required
            type="text"
            className="border border-primary rounded focus-within:outline-primary mb-8 pl-3 pr-6 py-2"
            placeholder="Email"
            onChange={(e) => {
              setRegisterEmail(e.target.value);
            }}
          />

          <input
            required
            type="password"
            className="border border-primary rounded focus-within:outline-primary pl-3  mb-8 pr-6 py-2"
            placeholder="Password"
            onChange={(e) => {
              setRegisterPassword(e.target.value);
            }}
          />
          <button
            type="button"
            onClick={registerUser}
            className=" bg-primary px-auto inline-block rounded text-white mb-8 font-bold py-2"
          >
            Sign Up
          </button>
          <p className="text-sm text-center">
            Already have an account?
            <Link
              to="/login"
              className="font-bold pl-2 hover:underline text-primary"
            >
              Login
            </Link>
          </p>
          {errorMessage && (
            <div className=" bg-red-200 mt-3 rounded border-red-400 border text-center">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default Signup;
