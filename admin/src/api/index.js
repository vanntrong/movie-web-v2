import axios from "axios";
const authApiController = axios.create({
  baseURL: "https://api.freemovienow.online",
  withCredentials: true,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
    // "Access-Control-Allow-Headers": "*",
    authorization: localStorage.getItem("accessToken"),
  },
});

export const loginUserAdmin = async (username, password) => {
  try {
    const res = await authApiController.post("/auth/login/admin", JSON.stringify({ username, password }));
    return res;
  } catch (error) {
    return error.response;
  }
};

export const getAllUser = async () => {
  try {
    const res = await authApiController.get("/user/all");
    return res;
  } catch (error) {
    return error.response;
  }
};

export const addNewUserApi = async (user) => {
  try {
    const res = await authApiController.post("/auth/register/admin", JSON.stringify(user));
    return res;
  } catch (error) {
    return error.response;
  }
};

export const deleteUserApi = async (id) => {
  try {
    const res = await authApiController.delete(`/user/${id}/delete`);
    return res;
  } catch (error) {
    return error.response;
  }
};
