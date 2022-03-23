import React, { useEffect } from "react";

const LoginSuccess = () => {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1000);
  }, []);
  return <h1 className="text-[24px] font-bold">LoginSuccess</h1>;
};

export default LoginSuccess;
