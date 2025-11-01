import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import CareerPath from "./pages/CareerPath";
import SimplifiedUltimateRoadmap from "./pages/UltimateRoadmap";
import Flowchart from "./pages/Flowchart";
import { AppProvider } from "./context/AppContext";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/career-path" element={<CareerPath />} />
            <Route path="/simplified-ultimate-roadmap" element={<SimplifiedUltimateRoadmap />} />
            <Route path="/flowchart" element={<Flowchart />} />
          </Routes>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}
