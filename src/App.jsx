import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Swap from "./pages/Swap";
import Dashboard from "./pages/Dashboard";
import Liquidity from "./pages/Liquidity";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/swap" element={<Swap />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/liquidity" element={<Liquidity />} />
    </Routes>
  );
}
