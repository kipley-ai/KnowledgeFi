"use client";

import { useState, useEffect } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
// import { useAuthorizer } from "@authorizerdev/authorizer-react";

export const useAxios = () => {
  // const { user } = useAuthorizer();
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(true);


  const fetchData = async (params: AxiosRequestConfig) => {
    try {
      const result = await axios.request(params);
      setResponse(result);
    } catch (err: unknown | any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const sendRequest = (axiosParams: AxiosRequestConfig) => {
    fetchData(axiosParams);
  };

  return { response, error, loading, sendRequest };
};
