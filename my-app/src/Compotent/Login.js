import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      alert(data.message || data.error);

      // clear inputs
      setEmail("");
      setPassword("");

      // ✅ Token save + redirect
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  const goToSignup = () => {
    navigate("/sign");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[400px] p-8 shadow-lg bg-white rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Login
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full h-12 px-4 bg-gray-200 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full h-12 px-4 bg-gray-200 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full h-12 bg-blue-900 text-white font-bold rounded-lg hover:bg-blue-800 transition"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={goToSignup}
            className="text-blue-800 border-b-2 border-blue-800 font-semibold hover:text-blue-600"
          >
            Don&apos;t have an account? Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

