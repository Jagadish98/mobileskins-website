import axios from "axios";

import { registerUser_url } from "./constants";

export const registerUser = (userDetails) =>
  axios.post(registerUser_url + "/register", userDetails);

export const loginUser = (email, password) =>
  axios.post(registerUser_url + "/login", { email, password });

export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = (token) => localStorage.getItem("token");

export const saveLoggedInUser = (username) =>
  sessionStorage.setItem("authenticatedUser", username);

export const isUserLoggedIn = () => {
  const username = sessionStorage.getItem("authenticatedUser");

  if (username === null) {
    return false;
  } else {
    return true;
  }
};

export const getLoggedInUser = () => {
  const username = sessionStorage.getItem("authenticatedUser");
  return username;
};
