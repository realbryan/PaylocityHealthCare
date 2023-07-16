import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login.component";
import Benefits from "./components/benefits.component";

function App() {
  return (
    <Routes>
      <Route path="benefits" element={<Benefits />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
