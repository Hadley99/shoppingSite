import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { auth } from "../firebase";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const handleUserCredetials = () => {
    setLoginEmail("sunday@gmail.com");
    setLoginPassword("1234567890");
  };
  const login = async () => {
    try {
      setLoading(true);
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
    } catch (error) {
      setErrorMessage(error.code);
    }
    setLoading(false);
    navigate("/");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        login();
      }}
    >
      <div className="flex h-101  justify-center items-center ">
        <div className=" flex shadow-xl bg-white  flex-col rounded  w-96  px-10 pb-6 pt-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold ">Login</h1>
            <div
              onClick={handleUserCredetials}
              className="cursor-pointer text-2xl hover:text-gray-600"
            >
              <svg width="1em" height="1em" viewBox="0 0 24 24">
                <path
                  fill="currentcolor"
                  d="M17 9H7V7h10m0 6H7v-2h10m-3 6H7v-2h7M12 3a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1m7 0h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z"
                ></path>
              </svg>
            </div>
          </div>
          <input
            required
            value={loginEmail}
            onChange={(e) => {
              setLoginEmail(e.target.value);
            }}
            type="text"
            className="border border-primary rounded focus-within:outline-primary  pl-3 mb-8 pr-6 py-2"
            placeholder="Email"
          />
          <input
            required
            value={loginPassword}
            onChange={(e) => {
              setLoginPassword(e.target.value);
            }}
            type="password"
            className="border border-primary rounded focus-within:outline-primary pl-3  mb-8 pr-6 py-2"
            placeholder="Password"
          />
          <button
            disabled={loading}
            type="submit"
            className={
              loading
                ? " bg-slate-300 rounded cursor-not-allowed text-white mb-8 font-bold py-2"
                : " bg-primary rounded text-white mb-8 font-bold py-2"
            }
          >
            Login
          </button>

          <p className="text-sm text-center">
            Don't have an account?
            <Link
              to="/signup"
              className="font-bold pl-2 hover:underline text-primary"
            >
              Sign up
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

export default Login;
