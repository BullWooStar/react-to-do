const useApi = () => {
  const sendRequest = async (requestConfig: {
    url: string;
    method: string;
    headers?: {};
    body?: string;
  }) => {
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? requestConfig.body : null,
      });
      if (!response.ok) {
        throw new Error("Request failed!");
      }
    } catch {
      throw new Error("ERROR!");
    }
  };
  return { sendRequest };
};

export default useApi;
