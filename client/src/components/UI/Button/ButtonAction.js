import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateWatchLaterApi } from "../../../api/auth";
import { $userIsLoggedIn, $userWatchLaterList } from "../../../redux/selector/index";
import { userActions } from "../../../redux/slice/UserSlice";
import { FacebookShareButton, TwitterShareButton, FacebookMessengerShareButton } from "react-share";
import { FacebookIcon, FacebookMessengerIcon, TwitterIcon } from "react-share";
import { FacebookShareCount } from "react-share";
import { toast } from "react-toastify";

const ButtonAction = (props) => {
  const isUserLoggedIn = useSelector($userIsLoggedIn);
  const dispatch = useDispatch();
  const [isShowSocialShare, setIsShowSocialShare] = React.useState(false);
  const currentWatchLaterList = useSelector($userWatchLaterList);

  const shareHandler = () => {
    setIsShowSocialShare(!isShowSocialShare);
  };

  const addMovieToWatchLater = async () => {
    if (!isUserLoggedIn) {
      toast.error("You must be logged in to add a movie to your watch later list", {
        theme: "dark",
      });
      return;
    } else {
      const newWatchLaterList = [props.data, ...currentWatchLaterList];
      dispatch(userActions.addWatchLater(props.data));
      const res = await updateWatchLaterApi(newWatchLaterList);
      if (!res.data.success) {
        return;
      } else {
        toast.success("Movie added to your watch later list", {
          theme: "dark",
        });
      }
    }
  };

  const removeMovieFromWatchLater = async () => {
    if (!isUserLoggedIn) {
      alert("You must be logged in to remove a movie from your watch later list");
      return;
    } else {
      const newWatchLaterList = currentWatchLaterList.filter(
        (item) => item.name !== props.data.name && item.id !== props.data.id
      );
      dispatch(userActions.removeWatchLater(props.data));
      const res = await updateWatchLaterApi(newWatchLaterList);
      if (!res.data.success) {
        return;
      } else {
        toast.success("Movie removed from your watch later list", {
          theme: "dark",
        });
      }
    }
  };
  const classIcon =
    "w-[35px] h-[35px] flex items-center justify-center rounded-full text-red mb-4 border-4 border-solid border-[#666] cursor-pointer bg-white hover:bg-red hover:text-white";

  return (
    <>
      <div className="movie-icon-activity">
        <div className="relative">
          <div className={classIcon} onClick={shareHandler}>
            <i className="fa-solid fa-share-nodes"></i>
          </div>
          {isShowSocialShare && (
            <div className="mr-2 absolute right-[100%] top-0 flex items-center gap-x-2 social-button">
              <FacebookShareButton url={props.link}>
                <FacebookIcon size={30} round={true} />
                <FacebookShareCount url={props.link}>
                  {(shareCount) => <span className="myShareCountWrapper">{shareCount}</span>}
                </FacebookShareCount>
              </FacebookShareButton>
              <FacebookMessengerShareButton url={props.link} appId="336038995032588">
                <FacebookMessengerIcon size={30} round={true} />
              </FacebookMessengerShareButton>
              <TwitterShareButton url={props.link}>
                <TwitterIcon size={30} round={true} />
              </TwitterShareButton>
            </div>
          )}
        </div>
        <div className={classIcon} onClick={() => toast.info("Sorry we will add this feature soon", { theme: "dark" })}>
          <i className="fa-solid fa-heart"></i>
        </div>
        {isUserLoggedIn &&
        currentWatchLaterList.find((item) => item.id === props.data.id && item.media_type === props.data.media_type) ? (
          <div className={classIcon} onClick={removeMovieFromWatchLater}>
            <i className="fa-solid fa-check"></i>
          </div>
        ) : (
          <div className={classIcon} onClick={addMovieToWatchLater}>
            <i className="fa-solid fa-plus"></i>
          </div>
        )}
      </div>
    </>
  );
};

export default ButtonAction;
