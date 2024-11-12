import axios from "axios";
import { baseUrl } from "../../../shared/config";

export const addTags = async (name: string, description: string) => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.post(
      `${baseUrl}/api/tags`,
      {
        name,
        description,
      },
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
