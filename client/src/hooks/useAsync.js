import { useEffect, useState } from "react";
import { Api } from "../utils/Api";

const useAsync = (endpoint, type = "GET", body = {}, authNeeded = false) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const callApi = async () => {
      const response = await Api(endpoint, type, body, authNeeded);
      if (response?.error) {
        setIsLoading(false);
        setError(response);
      } else {
        setIsLoading(false);
        setData(response);
      }
    };
    callApi();
  }, [endpoint, type, body, authNeeded]);

  return { isLoading, data, error };
};

export default useAsync;
