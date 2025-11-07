import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Sign() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSign = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // ✅ fixed spelling
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      alert(data.message || data.error);

      // reset inputs
      setName("");
      setEmail("");
      setPassword("");

      if (data.message === "Signup successful!") {
        navigate("/login"); // signup ke baad login page par redirect
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Card */}
      <div className="w-[400px] p-8 shadow-lg bg-white rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Sign
        </h2>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSign}>
          <input
            type="text"
            placeholder="Name"
            className="w-full h-12 px-4 bg-gray-200 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            Sign
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={goToLogin}
            className="text-blue-800 border-b-2 border-blue-800 font-semibold hover:text-blue-600"
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
}

