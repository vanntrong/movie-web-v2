import React from "react";

const Footer = () => {
  const classIcon = "w-[40px] h-[40px] flex items-center justify-center bg-[rgba(0,0,0,0.8)] rounded-full";
  return (
    <div className="bg-dark-02 text-white flex items-center justify-between sm:px-[100px] sm:py-[20px] mobile:px-[10px] mobile:py-[10px] text-[16px]">
      <div>
        <p className="mobile:text-[12px] sm:text-[14px] md:text-[16px]">Copyright Van Trong © 2022</p>
      </div>
      <div className="flex items-center sm:gap-x-4 mobile:gap-x-1">
        <span className="mobile:text-[12px] sm:text-[14px] md:text-[16px]">Contact me: </span>
        <div className={classIcon}>
          <a href="https://www.facebook.com/votrong143/">
            <i className="fa-brands fa-facebook"></i>
          </a>
        </div>
        <div className={classIcon}>
          <a href="mailto:vantrongbrv@gmail.com">
            <i className="fa-solid fa-envelope"></i>
          </a>
        </div>
        <div className={classIcon}>
          <a href="https://github.com/vanntrong">
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
