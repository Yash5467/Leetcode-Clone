import axios from "axios";

class AuthService {
  signup = async ({ email, password, fullName, userName }) => {
    if (!email || !password || !fullName || !userName) return;
    try {
      const { data: data } = await axios.post(
        import.meta.env.VITE_SERVER_ENDPOINT + "/user/signup",
        {
          email: email,
          password: password,
          fullName: fullName,
          userName: userName,
        }
      );

      return this.login({ email, password });
    } catch (error) {
      throw error;
    }
  };

  login = async ({ email, password }) => {
    if (!email || !password) return;

    try {
      const { data: data } = await axios.post(
        import.meta.env.VITE_SERVER_ENDPOINT + "/user/login",
        {
          email,
          password,
        }
      );

      return data;
    } catch (error) {
      throw error;
    }
  };
  logout = async () => {
    try {
      const { data: data } = await axios.post(
        import.meta.env.VITE_SERVER_ENDPOINT + "/user/logout"
      );
    } catch (error) {}
  };
  forgetPassword = async ({
    email,
    oldPassword,
    newPassowrd,
    conformPassword,
  }) => {
    if (!email || !oldPassword || !newPassowrd || !conformPassword) return;

    try {
      const { data: data } = await axios.post(
        import.meta.env.VITE_SERVER_ENDPOINT + "/user/reset-password",
        {
          email: email,
          oldPassword: oldPassword,
          newPassowrd: newPassowrd,
          conformPassword: conformPassword,
        }
      );

      return data;
    } catch (error) {
      throw error;
    }
  };
  vefifyLogin = async () => {
    try {
      const { data: data } = await axios.get(
        import.meta.env.VITE_SERVER_ENDPOINT + "/user/verify-login"
      );
      return data;
    } catch (error) {
      throw error;
    }
  };
  getUser = async () => {
    try {
      const { data: data } = await axios.get(
        import.meta.env.VITE_SERVER_ENDPOINT + "/user/get-user"
      );
      return data;
    } catch (error) {
      throw error;
    }
  };
}


export const authService=new AuthService();
