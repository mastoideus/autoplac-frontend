import customFetch from "..";

const fetchAllCars = async ({ pageParam = 1 }) => {
  try {
    const response = await customFetch.get("/api/cars", {
      params: { page: pageParam },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchAllCars;
