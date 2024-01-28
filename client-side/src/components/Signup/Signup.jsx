import React, { useState } from "react";
import { authService } from "../../services/Auth.service";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.signup({
        email: email,
        password: password,
        fullName: fullName,
        userName: fullName,
      });
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const [loading, setLoading] = useState(false);

  const handleClick = () => {};
  return (
    <div className=" w-full mx-auto ">
      <div className="max-w-sm mx-auto mt-14">
        <form className="space-y-6 px-6 pb-4 " onSubmit={handleRegister}>
          <h3 className="text-xl font-medium text-white">
            Register to BiteCode
          </h3>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium block mb-2 text-gray-300"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
              className="
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    "
              placeholder="name@provider.com"
            />
          </div>
          <div>
            <label
              htmlFor="displayName"
              className="text-sm font-medium block mb-2 text-gray-300"
            >
              Display Name
            </label>
            <input
              onChange={(e) => setFullName(e.target.value)}
              type="displayName"
              name="displayName"
              id="displayName"
              className="
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    "
              placeholder="User"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium block mb-2 text-gray-300"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              className="
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    "
              placeholder="*******"
            />
          </div>

          <button
            type="submit"
            className="w-full text-white focus:ring-blue-300 font-medium rounded-lg
            text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s
        "
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <div className="text-sm font-medium text-gray-300">
            Already have an account?{" "}
            <a
              href="#"
              className="text-blue-700 hover:underline"
              onClick={handleClick}
            >
              Log In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
