import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import New from "./pages/new/New";
import Single from "./pages/single/Single";
import { userInputs } from "./fromSources";
import { useStore } from "./store";
import { Navigate } from "react-router-dom";
import { getAllUser } from "./api/index";
import { useEffect, useCallback } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const setAllUser = useStore((state) => state.setAllUser);
  const fetchAllUser = useCallback(async () => {
    const res = await getAllUser();
    const resData = await res.data;
    setAllUser(resData.data);
  }, [setAllUser]);
  useEffect(() => {
    if (isLoggedIn) {
      fetchAllUser();
    }
  }, [isLoggedIn, fetchAllUser]);
  return (
    <>
      <div className="App">
        <Routes>
          (
          <Route path="/">
            <Route index element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
            <Route path="users">
              <Route index element={isLoggedIn ? <List /> : <Navigate to="/login" />} />
              <Route path=":userId" element={isLoggedIn ? <Single /> : <Navigate to="/login" />} />
              <Route
                path="new"
                element={isLoggedIn ? <New inputs={userInputs} title="Add New User" /> : <Navigate to="/login" />}
              />
            </Route>
            {/* <Route path="products">
            <Route index element={<List />} />
            <Route path=":productId" element={<Single />} />
            <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
          </Route> */}
          </Route>
          )
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
    </>
  );
}

export default App;
