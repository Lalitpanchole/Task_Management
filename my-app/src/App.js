import Login from "./Compotent/Login";
import Sign from "./Compotent/Sign";
import Dashboard from "./Compotent/Dashboard";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Home page -> Sign page */}
        <Route path="/" element={<Sign />} />
        
        {/* Other routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;



