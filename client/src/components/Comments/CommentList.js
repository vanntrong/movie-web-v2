import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { $userIsLoggedIn, $userSelector } from "../../redux/selector";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import { createNewComment, getAllComments } from "../../api/auth";
import { toast } from "react-toastify";

const CommentList = ({ media_type, idMovie }) => {
  const [comments, setComments] = useState([]);
  const inputRef = useRef();
  const userIsLogged = useSelector($userIsLoggedIn);
  const currentUser = useSelector($userSelector);

  useEffect(() => {
    const getComments = async () => {
      const res = await getAllComments(media_type, idMovie);
      const resData = await res.data;
      if (resData.success) {
        if (resData.data.length === 0) {
          return;
        } else {
          setComments(resData.data);
        }
      }
    };
    getComments();
    return () => {
      setComments([]);
    };
  }, [media_type, idMovie]);

  const submitHandler = async (event) => {
    event.preventDefault();
    const userComment = inputRef.current.value;
    if (userComment.trim() === "") {
      toast.error("Comment cannot be empty");
      return;
    } else {
      const author = {
        userId: currentUser._id,
        name: currentUser.firstName + " " + currentUser.lastName,
        avatar: currentUser.avatar,
      };
      const content = userComment;
      // setComments((preState) => [{ author, content }, ...preState]);
      const data = {
        media_type: media_type,
        idMovie: idMovie,
        // comments: [{ author, content }, ...comments],
        comment: { author, content },
      };
      const res = await createNewComment(data);
      const resData = await res.data;
      if (resData.success) {
        setComments(resData.data);
      }
      if (!resData.success) {
        toast.error("Something went wrong", {
          theme: "dark",
        });
      }
      inputRef.current.value = "";
    }
  };

  return (
    <div className="mt-[20px] text-white">
      <h2 className="md:text-[20px] font-medium text-[14px]">Comments</h2>
      <div className="mt-[10px] flex items-center border-[1px] border-gray px-[8px] py-[4px] rounded-[32px]">
        <img
          src={
            currentUser.avatar
              ? currentUser.avatar
              : "https://wordpress.iqonic.design/product/wp/streamit/wp-content/themes/streamit-theme/assets/images/redux/user.png"
          }
          alt="user avatar"
          className="w-[40px] h-[40px] rounded-full object-cover"
        />
        {userIsLogged ? (
          <form className="w-full flex items-center pr-[12px]" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Write your comment here..."
              className="w-full px-[12px] py-[8px] rounded-[32px] outline-0 bg-transparent md:text-[16px] text-[14px] text-gray"
              ref={inputRef}
            />
            <button>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        ) : (
          <p className="px-[12px] py-[8px] md:text-[16px] text-[14px] text-gray">
            You need to{" "}
            <Link to="/login" className="text-red">
              Login
            </Link>{" "}
            to comment
          </p>
        )}
      </div>
      <div className="mt-[10px] text-gray">
        {comments && comments.length === 0 && <p className="text-center">No one has commented</p>}
        {comments &&
          comments.length > 0 &&
          comments.map((comment) => {
            return (
              <Comment
                userImage={comment.author.avatar}
                userName={comment.author.name}
                time={comment.createdAt}
                comment={comment.content}
                likeCount={comment.likeCount}
                dislikeCount={comment.dislikeCount}
                key={comment._id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default CommentList;
