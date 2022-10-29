import axios from "axios";

const BASE_URL = "https://api.jikan.moe";

// Api calls

export const getAnimeListServiceByPopular = (
  pageNo = 1,
  limit = 10,
  search
) => {
  const modifiedUrl = search
    ? `${BASE_URL}/v4/anime?q=${search}&`
    : `${BASE_URL}/v4/anime?page=${pageNo}&limit=${limit}&`;
  const url = `${modifiedUrl}order_by="popularity"`;
  try {
    const resp = axios.get(encodeURI(url));
    return resp;
  } catch (err) {
    console.error(err);
  }
};
export const getAnimeListByMostWatched = (pageNo = 1, limit = 10, search) => {
  const modifiedUrl = search
    ? `${BASE_URL}/v4/anime?q=${search}&`
    : `${BASE_URL}/v4/anime?page=${pageNo}&limit=${limit}`;
  const url = `${modifiedUrl}&order_by="members"`;
  try {
    const resp = axios.get(encodeURI(url));
    return resp;
  } catch (err) {
    console.error(err);
  }
};

export const getAnimeListByTopAction = (pageNo = 1, limit = 10, search) => {
  const modifiedUrl = search
    ? `${BASE_URL}/v4/anime?q=${search}&`
    : `${BASE_URL}/v4/anime?page=${pageNo}&limit=${limit}&`;
  const url = `${modifiedUrl}order_by="rank"&genres=1&sort="asc"`;
  try {
    const resp = axios.get(encodeURI(url));
    return resp;
  } catch (err) {
    console.error(err);
  }
};

export const AllConcurrentGetApiList = [
  getAnimeListServiceByPopular(),
  getAnimeListByMostWatched(),
  getAnimeListByTopAction(),
];
