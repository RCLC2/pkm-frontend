import { api } from "../axiosInterceptApi";

export const issueYorkieToken = async (noteId) => {  
  const userApi = api("user");  
  const response = await userApi.post("/yorkie/token", { noteId });  
  return response.data.data; 
};  
  
export const createYorkieAuthTokenInjector = (noteId) => {  
  return async (reason) => {  
    try {   
      if (reason) {  
        console.log(`Yorkie 토큰 갱신 필요: ${reason}`);  
      }  
        
      const tokenData = await issueYorkieToken(noteId);  
      return tokenData.token;  
    } catch (error) {  
      console.error("Yorkie 토큰 발급 실패:", error);  
      throw error;  
    }  
  };  
};