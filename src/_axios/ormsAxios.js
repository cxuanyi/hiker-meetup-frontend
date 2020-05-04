import React from "react";
import axios from "axios";
import { UserContext } from "../_rootContext/UserContext";

const useORMSAxios = () => {
  const { userInContext } = React.useContext(UserContext);
  const baseUrl =
    "https://sd0y3a6t9b.execute-api.ap-southeast-1.amazonaws.com/production"; //web api
    // "http://hiker-meetup-backend-user-alb-1450887440.ap-southeast-1.elb.amazonaws.com:4000/" //user direct
    // "http://ec2-13-229-200-236.ap-southeast-1.compute.amazonaws.com"; // events direct

  const ormsAxios = axios.create({
    baseURL: baseUrl
  });

  ormsAxios.defaults.headers.common["Authorization"] = userInContext.accessToken
    ? "Bearer " + userInContext.accessToken
    : "";

  ormsAxios.interceptors.request.use(
    request => {
      return request;
    },
    error => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  ormsAxios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  const ormsAxiosPostRequest = async (url, body, header = {}) => {
    try {
      const responseData = await ormsAxios.post(url, body, header);

      return responseData.data;
    } catch (error) {
      console.log(error);
    }
  };

  const ormsAxiosGetRequest = async (url, params = {}) => {
    try {
      const responseData = await ormsAxios.get(url, {
        // headers: { "Access-Control-Allow-Origin": "*" }, // GET cannot include this in header
        params: params
      });
      return responseData.data;
    } catch (error) {
      console.log(error);
    }
  };

  const ormsAxiosGetFileRequest = async url => {
    try {
      const responseData = await ormsAxios.get(url, {
        responseType: "blob" //important
      });
      return responseData.data;
    } catch (error) {
      console.log(error);
    }
  };

  const ormsAxiosDeleteRequest = async (url, body) => {
    try {
      const responseData = await ormsAxios.delete(url, { data: { ...body } });

      return responseData.data;
    } catch (error) {
      console.log(error);
    }
  };

  const ormsAxiosPutRequest = async (url, body, header = {}) => {
    try {
      const responseData = await ormsAxios.put(url, body, header);

      return responseData.data;
    } catch (error) {
      console.log(error);
    }
  };

  const ormsGetUrl = (url, params = {}) => {
    let queryString = "";
    Object.keys(params).forEach((key, index) => {
      queryString +=
        index === 0 ? `?${key}=${params[key]}` : `&${key}=${params[key]}`;
    });
    return `${baseUrl}${url}${queryString}`;
  };

  /** Get Poster's User ID**/
  const ormsGetRequesterUser = () => {
    return userInContext.user && userInContext.user._user_id
      ? userInContext.user
      : null;
  };

  return {
    ormsAxiosPostRequest,
    ormsAxiosGetRequest,
    ormsAxiosGetFileRequest,
    ormsAxiosPutRequest,
    ormsAxiosDeleteRequest,
    ormsGetUrl,
    ormsGetRequesterUser
  };
};

export default useORMSAxios;
