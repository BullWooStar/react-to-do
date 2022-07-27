const useApi = () => {
  const sendRequest = async (requestConfig) => {
    const response = await fetch(requestConfig.url, {
      method: requestConfig.method ? requestConfig.method : null,
      headers: requestConfig.headers ? requestConfig.headers : {},
      body: requestConfig.body ? requestConfig.body : null,
    });
    if (!response.ok) {
      throw new Error("Request failed!");
    }
  };
  return { sendRequest };
};

export default useApi;
