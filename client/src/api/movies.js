import axios from "axios";
import { API_KEY, BASE_URL } from "../constant";

const movieApiCaller = axios.create({
  baseURL: BASE_URL,
});

export const getListData = async (mediaType, listType) => {
  let url = "";
  if (listType === "trending") {
    url = `${listType}/${mediaType}/day?api_key=${API_KEY}`;
  } else {
    url = `${mediaType}/${listType}?api_key=${API_KEY}`;
  }

  const data = await movieApiCaller.get(url).then((response) => response.data);
  return {
    data: data,
    type: `${mediaType}/${listType}`,
  };
};

export const getDetail = async (mediaType, id) => {
  const data = await movieApiCaller.get(`${mediaType}/${id}?api_key=${API_KEY}`).then((response) => response.data);
  return data;
};

export const getSimilar = async (mediaType, id) => {
  const data = await movieApiCaller
    .get(`${mediaType}/${id}/similar?api_key=${API_KEY}&language=vi-VN`)
    .then((response) => response.data);
  return { data, type: `${mediaType}/similar` };
};

export const getRecommended = async (mediaType, id) => {
  const data = await movieApiCaller
    .get(`${mediaType}/${id}/recommendations?api_key=${API_KEY}`)
    .then((response) => response.data);
  return data;
};

export const getSeasonsTv = async (id, season) => {
  const data = await movieApiCaller
    .get(`tv/${id}/season/${season}?api_key=${API_KEY}`)
    .then((response) => response.data);
  return data;
};
export const getSearch = async (query, page) => {
  const data = await movieApiCaller
    .get(`search/multi?api_key=${API_KEY}&query=${query}&page=${page}`)
    .then((response) => response.data);
  return data;
};

export const getPreviewVideo = async (mediaType, id) => {
  const data = await movieApiCaller
    .get(`${mediaType}/${id}/videos?api_key=${API_KEY}`)
    .then((response) => response.data);
  return data;
};
// https://api.themoviedb.org/3/discover/tv?api_key=89fd6fee1082a41f4d5d9fe3c1ac3052&with_genres=10751&page=1
export const getDiscover = async (mediaType, genreId, page) => {
  try {
    const res = await movieApiCaller.get(
      `/discover/${mediaType}?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`
    );
    return res.data;
  } catch (error) {
    return error.response;
  }
};
