import axios from "axios";

class ProgessService {
  constructor() {}

  getProgress = async () => {
    try {
      const userProgress = await axios.get(
        import.meta.env.VITE_SERVER_ENDPOINT + "/progress/get",{withCredentials:true}
      );
      return userProgress;
    } catch (error) {
      throw error;
    }
  };
}


export const progressService=new ProgessService();
