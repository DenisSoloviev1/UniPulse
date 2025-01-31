
import { apiRequest } from "../../../shared/config";
import { IChat } from "../model";

export const getChats = async (): Promise<IChat[]> => {
  const response = await apiRequest<IChat[]>("GET", "/api/chats/tg");

  if (!response.success) {
    throw new Error(response.error || "Ошибка получения чатов.");
  }
  return response.data;
};

export const editMainChat = async (
  id: number,
  chats: number[]
): Promise<boolean> => {
  try{
    const response = await apiRequest(
      "POST",
      `/api/chats/tg/${id}`,
      {
        chats
      }
    );
  
    if (!response.success) {
      throw new Error(response.error || "Ошибка при редактировании уведомления.");
    }
    return true
  }
  catch(e){
    console.error(e)
    return false
  }
};

export const deleteChat = async(id: number): Promise<boolean> => {
  try{
  const response = await apiRequest(
    "POST",
    `/api/chats/tg/${id}`,{
      chats:[]
    }
  );
  return response.success
  }
catch(e){
  console.error(e)
  return false
}
 
}