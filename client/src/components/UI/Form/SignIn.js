import React from "react";
import { getProfile, loginUser } from "../../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useDispatch } from "react-redux";
import { userActions } from "../../../redux/slice/UserSlice";
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { toast } from "react-toastify";
import { BASE_URL_USER } from "../../../constant";

import "./index.css";
import { createPositionPopup } from "../../../constant";

const SignInForm = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitHandler = async (data) => {
    const { username, password } = data;
    const res = await loginUser(username, password);
    const resData = await res.data;
    if (resData.success) {
      toast.success(resData.message, {
        theme: "dark",
        icon: "🦄",
      });
      dispatch(userActions.setUser(resData.user));
      localStorage.setItem("accessToken", resData.accessToken);
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    } else {
      toast.error(resData.message, {
        theme: "dark",
      });
    }
  };
  return (
    <>
      <div className="md:w-[400px] px-[15px] py-[20px] sm:w-[500px] sm:px-[40px] sm:py-[60px] xl:px-[50px] xl:py-[80px] form-wrapper">
        <form onSubmit={handleSubmit(submitHandler)} className="form">
          <div className="text-field">
            <label htmlFor="userName">Username</label>
            <input
              autoComplete="off"
              type="text"
              id="userName"
              placeholder="Enter your username"
              {...register("username", {
                required: "Username must be not empty",
                minLength: { value: 5, message: "Username must be at least 5 characters" },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="username"
              render={({ message }) => <p className="error">{message}</p>}
            />
          </div>
          <div className="text-field">
            <label htmlFor="password">Password</label>
            <input
              autoComplete="off"
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password must be not empty",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => <p className="error">{message}</p>}
            />
          </div>
          {props.children}
        </form>
        <Link to="/signup">
          <p className="text-center pt-[20px] text-gray">Don't have an account ?</p>
        </Link>
      </div>
    </>
  );
};

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchDataUser = async () => {
    const res = await getProfile();
    const resData = await res.data;
    if (resData.success) {
      dispatch(userActions.setUser(resData.user));
      localStorage.setItem("accessToken", resData.accessToken);
      navigate(-1);
    }
  };
  const googleButtonClick = () => {
    const position = createPositionPopup(500, 600);
    const newWindow = window.open(
      `${BASE_URL_USER}/auth/google`,
      "_blank",
      `width=${position.w},height=${position.h},top=${position.top},left=${position.left}`
    );
    if (newWindow) {
      const timer = setInterval(() => {
        if (newWindow.closed) {
          clearInterval(timer);
          fetchDataUser();
        }
      }, 500);
    }
  };
  const facebookButtonClick = () => {
    // toast.info("Sorry this feature is not available yet", {
    //   theme: "dark",
    // });
    const position = createPositionPopup(500, 600);
    const newWindow = window.open(
      `${BASE_URL_USER}/auth/facebook`,
      "_blank",
      `width=${position.w},height=${position.h},top=${position.top},left=${position.left}`
    );
    if (newWindow) {
      const timer = setInterval(() => {
        if (newWindow.closed) {
          clearInterval(timer);
          fetchDataUser();
        }
      }, 500);
    }
  };
  return (
    <div className="text-gray lg:w-[800px]">
      <div>
        <h2 className="text-white lg:text-[50px] sm:text-[20px] text-center text-bold">Sign In to Your Account</h2>
        <p className="text-center text-[#999] mb-[20px]">More than 100.000 movies are waiting for you</p>
      </div>
      <div className="flex items-center justify-between flex-col md:flex-row">
        <SignInForm>
          <button className="block bg-[rgba(0,0,0,0.6)] w-full px-[15px] py-[12px] rounded-[32px] button-submit">
            Sign In
          </button>
        </SignInForm>
        <h1 className="text-[30px]">/</h1>
        <div className="lg:w-[300px] md:w-[200px] sm:w-[150px] ">
          <GoogleLoginButton onClick={googleButtonClick}>Continue with Google</GoogleLoginButton>
          <FacebookLoginButton onClick={facebookButtonClick}>Continue with Facebook</FacebookLoginButton>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
