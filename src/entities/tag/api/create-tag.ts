import axios from "axios";
import { baseUrl } from "../../../shared/config";

export const createTags = async (name: string, description: string) => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.post(
      `${baseUrl}/api/tags`,
      {
        name,
        description,
        subscriptable: true,
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
