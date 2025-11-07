
import Login from "./Compotent/Login";
import Sign from "./Compotent/Sign";
import Dashboard from "./Compotent/Dashboard";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
        <Routes>
        <Route path="/sign" element={<Sign />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
export default App;


<Route path="/dashboard" element={<Dashboard />} />
