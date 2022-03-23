import React from "react";
import SideBar from "../../components/Sidebar/SideBar";
import NavBar from "../../components/Navbar/NavBar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FileBase64 from "react-file-base64";
import { defaultUserImg } from "../../constant";
import { toast } from "react-toastify";

import "./new.css";
import { addNewUserApi } from "../../api";
import { useStore } from "../../store";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const addNewUser = useStore((state) => state.addNewUser);
  const { register, handleSubmit, setValue } = useForm();
  const submitHandler = async (data) => {
    const user = {
      ...data,
      avatar: file.trim().length > 0 ? file : defaultUserImg,
    };
    const res = await addNewUserApi(user);
    const resData = await res.data;
    console.log(resData);
    if (resData.success) {
      toast.success("User added successfully", {
        icon: "🦄",
      });
      addNewUser(resData.user);
      setValue("firstName", "");
      setValue("lastName", "");
      setValue("username", "");
      setValue("password", "");
      setFile("");
    } else {
      toast.error(resData.message, {
        icon: "🦄",
      });
    }
  };
  return (
    <div className="new w-full flex">
      <SideBar />
      <div className="newContainer">
        <NavBar />
        <div className="top">
          <h1>Add New User</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={file ? file : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                {/* <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }} /> */}
                <FileBase64
                  accept="image/*"
                  multiple={false}
                  type="file"
                  value={file}
                  onDone={({ base64 }) => setFile(base64)}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} {...register(input.typeUser)} />
                </div>
              ))}
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
