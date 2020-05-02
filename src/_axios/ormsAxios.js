import React from "react";
import axios from "axios";
import { UserContext } from "../_rootContext/UserContext";

const useORMSAxios = () => {
  const { userInContext } = React.useContext(UserContext);
  const baseUrl =
    // "https://sd0y3a6t9b.execute-api.ap-southeast-1.amazonaws.com/production";
    "http://ec2-13-229-200-236.ap-southeast-1.compute.amazonaws.com";

  const ormsAxios = axios.create({
    baseURL: baseUrl
  });

  ormsAxios.defaults.headers.common["Authorization"] = userInContext.accessToken
    ? "bearer " + userInContext.accessToken
    : "";
  
  ormsAxios.defaults.headers.common["content-type"] = "application/json";
  ormsAxios.defaults.headers.common["accept"] = "application/json";
  ormsAxios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

  // ormsAxios.defaults.headers.common["_user_id"] =
  //   userInContext.user && userInContext.user._user_id
  //     ? userInContext.user._user_id
  //     : "";

  ormsAxios.interceptors.request.use(
    request => {
      console.log(request);
      return request;
    },
    error => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  ormsAxios.interceptors.response.use(
    response => {
      // console.log(response);
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
    console.log("url", url);
    try {
      const responseData = await ormsAxios.get(url, {
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
