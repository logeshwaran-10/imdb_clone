import axios from "axios";

const API_URL = "http://localhost:8000"; // Need to add

// Create an Axios instance with custom headers
const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",

    // You can add other headers here if needed
  },
});
export const getRequest = async ({ url }) => {
  return await instance.get(url).then((response) => response);
};

export const postRequest = async ({ url, data }) => {
  return await instance.post(`${url}`, data).then((response) => response);
};

export const putRequest = async ({ url, data }) => {
  return await instance.put(`/${url}`, data).then((response) => response);
};

export const deleteRequests = async ({ url, data }) => {
  if (data) {
    return await instance.delete(`/${url}`, data).then((response) => response);
  }
  return await instance.delete(`/${url}`).then((response) => response);
};

//We can add other HTTP method here
