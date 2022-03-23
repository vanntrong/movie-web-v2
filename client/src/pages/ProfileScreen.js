import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header/Header";
import Wrapper from "../components/Wrapper/Wrapper";
import { $userSelector } from "../redux/selector";
import Footer from "../components/Footer/Footer";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import FileBase64 from "react-file-base64";
import moment from "moment";
import { updateProfileApi } from "../api/auth";
import { toast } from "react-toastify";

import "../components/UI/Form/index.css";
import { userActions } from "../redux/slice/UserSlice";
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {
  const [fileBase64, setFileBase64] = useState("");
  const [isShowForm, setIsShowForm] = useState(false);

  const currentUser = useSelector($userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classTable = `text-gray border-[1px] border-gray text-center block mt-[30px] w-full`;
  const classTr = `w-full flex justify-between`;
  const classTd = `border-[1px] border-gray p-3 w-[50%]`;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
    },
  });
  const submitHandler = async (data) => {
    const { firstName, lastName, password } = data;
    const userData = {
      firstName,
      lastName,
      password: password ? password : currentUser.password,
      avatar: fileBase64,
    };
    const res = await updateProfileApi(userData);
    if (res.success) {
      toast.success("Profile updated successfully", {
        theme: "dark",
      });
      dispatch(userActions.setUser(res.data));
      navigate(-1);
    } else {
      toast.error(res.data.message);
    }
  };

  return (
    <>
      <Header />
      <Wrapper className="h-screen flex items-center justify-center bg-dark-02">
        <div className="w-full lg:flex lg:items-center lg:justify-between lg:gap-x-[30px] max-w-[1000px]">
          <div className="bg-dark-02 px-[30px] py-[25px] flex items-center justify-center flex-col m-0 lg:basis-2/5">
            <div className="rounded-full w-[100%] h-[100%] max-w-[200px] max-h-[200px]">
              <img
                src={fileBase64.trim().length > 0 ? fileBase64 : currentUser.avatar}
                alt="user avatar"
                className="w-[200px] h-[200px] max-w-[200px] max-h-[200px] object-cover rounded-full"
              />
            </div>
            <button
              className="my-2 text-center block w-full text-red"
              onClick={() => setIsShowForm((preState) => !preState)}
            >
              <i className="fa-solid fa-user-pen mr-2"></i>
              Edit
            </button>
            <p className="text-white text-center text-[20px]">{`${currentUser.firstName} ${currentUser.lastName}`}</p>
          </div>
          <div className="w-full lg:basis-3/5">
            {!isShowForm && (
              <table className={classTable}>
                <tbody className="block w-full">
                  <tr key="subscription" className={classTr}>
                    <td className={classTd}>Subscription Plan</td>
                    <td className={classTd}>Free</td>
                  </tr>
                  <tr key="status" className={classTr}>
                    <td className={classTd}>Status</td>
                    <td className={classTd}>Active</td>
                  </tr>
                  <tr key="Start Date" className={classTr}>
                    <td className={classTd}>Start Date</td>
                    <td className={classTd}>{moment(currentUser.createdAt).format("DD/MM/YYYY")}</td>
                  </tr>
                  <tr key="Expiration Date" className={classTr}>
                    <td className={classTd}>Expiration Date</td>
                    <td className={classTd}>Unlimited</td>
                  </tr>
                </tbody>
              </table>
            )}
            {isShowForm && (
              <form className="form" onSubmit={handleSubmit(submitHandler)}>
                <div>
                  <div className="text-field">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      autoComplete="off"
                      type="text"
                      id="firstName"
                      placeholder="Enter your first name"
                      {...register("firstName")}
                    />
                  </div>
                  <div className="text-field">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      autoComplete="off"
                      type="text"
                      id="lastName"
                      placeholder="Enter your last name"
                      {...register("lastName")}
                    />
                  </div>
                </div>
                {currentUser.provider === "local" && (
                  <div className="text-field">
                    <label htmlFor="password">Password</label>
                    <input
                      autoComplete="off"
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      {...register("password", {
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
                )}
                <div className="text-field">
                  <FileBase64
                    accept="image/*"
                    multiple={false}
                    type="file"
                    value={fileBase64}
                    onDone={({ base64 }) => setFileBase64(base64)}
                  />
                  <label htmlFor="password">Avatar</label>
                </div>
                <button
                  className="block bg-[rgba(0,0,0,0.6)] w-full px-[15px] py-[12px] rounded-[32px] button-submit text-white"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      </Wrapper>
      <Footer />
    </>
  );
};

export default ProfileScreen;
