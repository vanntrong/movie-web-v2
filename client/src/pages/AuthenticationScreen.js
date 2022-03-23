import React, { useEffect } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import SignIn from "../components/UI/Form/SignIn";
import SignUp from "../components/UI/Form/SignUp";
import Wrapper from "../components/Wrapper/Wrapper";

const AuthenticationScreen = (props) => {
  const { type } = props;

  useEffect(() => {
    document.title = `The Movie - ${type.charAt(0).toUpperCase() + type.slice(1)}`;
  }, [type]);
  return (
    <>
      <Header />
      <Wrapper
        className="h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url("https://wordpress.iqonic.design/product/wp/streamit/wp-content/uploads/2020/12/01-2.jpg")`,
        }}
      >
        {type === "signup" ? <SignUp /> : <SignIn />}
      </Wrapper>
      <Footer />
    </>
  );
};

export default AuthenticationScreen;
