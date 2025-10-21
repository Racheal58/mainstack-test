const getAPIEndpoint = async (endpoint_path) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/${endpoint_path}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  } finally {
    console.log(false);
  }
};
export { getAPIEndpoint };
