import axios from "axios";
import { baseUrl } from "../../../shared/config";

export const createTags = async (tags_id?: number) => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.post(
      `${baseUrl}/api/tags/subscript/${tags_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.log(error.response);

    throw error;
  }
};
