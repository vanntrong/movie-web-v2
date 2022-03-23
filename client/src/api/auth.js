import axios from "axios";
import { BASE_URL_USER } from "../constant";

const authApiCaller = axios.create({
  baseURL: BASE_URL_USER,
  withCredentials: true,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
    // "Access-Control-Allow-Headers": "*",
    // "Access-Control-Allow-Origin": "*",
    Authorization: localStorage.getItem("accessToken"),
  },
});

export const registerUser = async (firstName, lastName, username, password) => {
  try {
    const res = await authApiCaller.post("/auth/register", JSON.stringify({ firstName, lastName, username, password }));
    return res;
  } catch (error) {
    return error.response;
  }
};

export const loginUser = async (username, password) => {
  try {
    const res = await authApiCaller.post("/auth/login", JSON.stringify({ username, password }));
    return res;
  } catch (error) {
    return error.response;
  }
};

export const logoutUser = async () => {
  try {
    authApiCaller.get("/auth/logout");
    // return res;
  } catch (error) {
    return error.response;
  }
};

export const getProfile = async () => {
  try {
    const res = await authApiCaller.get(`/auth/login/success`);
    return res;
  } catch (error) {
    return error.response;
  }
};

export const updateWatchLaterApi = async (data) => {
  try {
    const res = await authApiCaller.patch("/user/watch-later", JSON.stringify(data));
    return res;
  } catch (error) {
    return error.response;
  }
};

export const updateProfileApi = async (data) => {
  try {
    const res = await authApiCaller.patch("/user/update", JSON.stringify(data));
    return res.data;
  } catch (error) {
    return error.response;
  }
};

export const getAllComments = async (media_type, idMovie) => {
  try {
    const res = await authApiCaller.get(`/movie/comments?type=${media_type}&id=${idMovie}`);
    return res;
  } catch (error) {
    return error.response;
  }
};

export const createNewComment = async (data) => {
  try {
    const res = await authApiCaller.post("/movie/comments", JSON.stringify(data));
    return res;
  } catch (error) {
    return error.response;
  }
};

export const updateComment = async (data) => {
  try {
    const res = await authApiCaller.post("/movie/comments/update", JSON.stringify(data));
    return res;
  } catch (error) {
    return error.response;
  }
};
