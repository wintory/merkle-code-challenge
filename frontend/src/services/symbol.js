import axiosInstance from "."

export const getSymbol = async () => {
  try {
    const response = await axiosInstance({
      url: "/symbols",
      method: "GET",
    })

    return response.data
  } catch (e) {
    console.error(e)
    return response.error
  }

}