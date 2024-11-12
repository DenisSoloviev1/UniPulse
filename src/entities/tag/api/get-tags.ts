import axios from "axios";
import { baseUrl } from "../../../shared/config";

export const getTags = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${baseUrl}/api/tags`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data; 
  } catch (error: any) {
    console.log(error.response);

    throw error;
  }
};
