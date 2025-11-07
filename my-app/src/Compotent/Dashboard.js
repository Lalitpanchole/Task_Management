import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ✅ Update Name
const handleUpdate = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/update", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newName, email: newEmail }), // ✅ send both in one object
  });

  const data = await res.json();
  alert(data.message);
  setUser(data.user);
  setEditMode(false);
};


  // ✅ Delete Account
  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:5000/delete", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-[400px] text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Dashboard</h2>

        {user ? (
          <>
            {editMode ? (
              <>
                <input
                  type="text"
                  className="w-full border p-2 mb-4"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Enter new name"
                />
                  <input
                  type="text"
                  className="w-full border p-2 mb-4"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter new name"
                />
                <button
                  className="w-full h-12 bg-green-600 text-white rounded-lg mb-3"
                  onClick={handleUpdate}
                >
                  Save Changes
                </button>
                <button
                  className="w-full h-12 bg-gray-500 text-white rounded-lg"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p className="text-lg text-gray-600 mb-2">
                  <strong>Name:</strong> {user.name}
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  <strong>Email:</strong> {user.email}
                </p>

                <button
                  className="w-full h-12 bg-blue-600 text-white rounded-lg mb-3"
                  onClick={() => {
                    setEditMode(true);
                    setNewName(user.name);
                    setNewEmail(user.email);
                  }}
                >
                  Edit Profile
                </button>

                <button
                  className="w-full h-12 bg-red-600 text-white rounded-lg mb-3"
                  onClick={handleDelete}
                >
                  Delete Account
                </button>

                <button
                  className="w-full h-12 bg-black text-white rounded-lg"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
}
