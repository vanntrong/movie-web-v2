import React, { useRef } from "react";
import { registerUser } from "../../../api/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../../redux/slice/UserSlice";
import { getProfile } from "../../../api/auth";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL_USER, createPositionPopup } from "../../../constant";

import "./index.css";

const SignUpForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();

  const password = useRef({});
  password.current = watch("password", "");

  const submitHandler = async (data) => {
    const { firstName, lastName, username, password } = data;
    const res = await registerUser(firstName, lastName, username, password);
    const resData = await res.data;
    if (resData.success) {
      toast.success(resData.message, {
        theme: "dark",
        icon: "🦄",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      toast.error(resData.message, {
        theme: "dark",
      });
    }
  };
  return (
    <div className="lg:w-[400px] md:w-[400px] px-[15px] py-[20px] sm:w-[500px] sm:px-[40px] sm:py-[60px] xl:px-[50px] xl:py-[80px] form-wrapper">
      <form onSubmit={handleSubmit(submitHandler)} className="form">
        <div className="text-field">
          <label htmlFor="firstName">First Name</label>
          <input
            autoComplete="off"
            type="text"
            id="firstName"
            placeholder="Enter your first name"
            {...register("firstName", { required: "First name must be not empty" })}
          />
          <ErrorMessage errors={errors} name="firstName" render={({ message }) => <p className="error">{message}</p>} />
        </div>
        <div className="text-field">
          <label htmlFor="lastName">Last Name</label>
          <input
            autoComplete="off"
            type="text"
            id="lastName"
            placeholder="Enter your last name"
            {...register("lastName", { required: "Last name must be not empty" })}
          />
          <ErrorMessage errors={errors} name="lastName" render={({ message }) => <p className="error">{message}</p>} />
        </div>
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
          <ErrorMessage errors={errors} name="username" render={({ message }) => <p className="error">{message}</p>} />
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
          <ErrorMessage errors={errors} name="password" render={({ message }) => <p className="error">{message}</p>} />
        </div>
        <div className="text-field">
          <label htmlFor="passwordConfirm">Confirm password</label>
          <input
            autoComplete="off"
            type="password"
            id="passwordConfirm"
            placeholder="Confirm your password"
            {...register("passwordConfirm", {
              validate: (value) => value === password.current || "The passwords do not match",
            })}
          />
          <ErrorMessage
            errors={errors}
            name="passwordConfirm"
            render={({ message }) => <p className="error">{message}</p>}
          />
        </div>
        {props.children}
      </form>
      <Link to="/login">
        <p className="text-center pt-[20px] text-gray">Already have an account ?</p>
      </Link>
    </div>
  );
};

const SignUp = (props) => {
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
    // toast.info("Sorry this feature is not available yet", {
    //   theme: "dark",
    // });
  };
  const facebookButtonClick = () => {
    // window.open("http://localhost:8000/api/auth/facebook", "_self");
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
        <h2 className="text-white lg:text-[50px] sm:text-[20px] text-center text-bold">Sign Up to Your Account</h2>
        <p className="text-center text-[#999] mb-[20px]">More than 100.000 movies are waiting for you</p>
      </div>
      <div className="flex items-center justify-between flex-col md:flex-row">
        <SignUpForm>
          <button className="block bg-[rgba(0,0,0,0.6)] w-full px-[15px] py-[12px] rounded-[32px] button-submit">
            Sign Up
          </button>
        </SignUpForm>
        <h1 className="text-[30px]">/</h1>
        <div className="lg:w-[300px] md:w-[200px]">
          <GoogleLoginButton onClick={googleButtonClick}>Continue with Google</GoogleLoginButton>
          <FacebookLoginButton onClick={facebookButtonClick}>Continue with Facebook</FacebookLoginButton>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
