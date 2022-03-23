import React from "react";
import moment from "moment";
import { toast } from "react-toastify";

const Comment = ({ userImage, userName, time, comment, likeCount, dislikeCount }) => {
  const likeButtonClickHandler = () => {
    toast.info("Sorry we will add this feature soon", {
      theme: "dark",
    });
  };
  return (
    <div className="flex mb-[12px]">
      <div className="mr-[10px]">
        <img
          src={
            userImage
              ? userImage
              : "https://wordpress.iqonic.design/product/wp/streamit/wp-content/themes/streamit-theme/assets/images/redux/user.png"
          }
          alt="user avatar"
          className="w-[40px] h-[40px] rounded-full object-cover"
        />
      </div>
      <div>
        <div className="flex items-center">
          <h3 className="text-[18px] font-bold mr-[5px] text-white">{userName}</h3>
          <span className="text-[13px]">{moment(time).fromNow()}</span>
        </div>
        <p className="text-[16px] max-w-[600px]">{comment}</p>
        <div>
          <button className="mr-[10px]" onClick={likeButtonClickHandler}>
            <i className="fa-solid fa-thumbs-up mr-[5px]"></i>
            <span>{likeCount}</span>
          </button>
          <button onClick={likeButtonClickHandler}>
            <i className="fa-solid fa-thumbs-down mr-[5px]"></i>
            <span>{dislikeCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
