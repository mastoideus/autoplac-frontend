import customFetch from "..";

export const fetchBrandsStores = async () => {
  try {
    const response = await customFetch.get("/api/brands-stores");
    return response.data;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Something went wrong, could not fetch brands and stores"
    );
  }
};
