import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { loginUserAdmin } from "../../api";
import { useStore } from "../../store";

const Login = () => {
  const loginUser = useStore((state) => state.loginUser);
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const submitHandler = async (event) => {
    event.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const res = await loginUserAdmin(username, password);
    const resData = await res.data;
    if (resData.success) {
      loginUser(resData.user);
      localStorage.setItem("accessToken", resData.accessToken);
      navigate("/");
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
          <div className="flex justify-center"></div>
          <h3 className="text-2xl font-bold text-center">Login to your account</h3>
          <form onSubmit={submitHandler}>
            <div className="mt-4">
              <div>
                <label className="block" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none outline-none focus:ring-1 focus:ring-blue-600 border-[1px] border-solid border-gray-500"
                  ref={usernameRef}
                />
                <span className="text-xs tracking-wide text-red-600">Username field is required </span>
              </div>
              <div className="mt-4">
                <label className="block">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 border-[1px] border-solid border-gray-500"
                  ref={passwordRef}
                />
              </div>
              <div className="flex items-baseline justify-between">
                <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 block w-full">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
