import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import CareerPath from "./pages/CareerPath";
import Roadmap from "./pages/Roadmap";
import EnhancedRoadmap from "./pages/EnhancedRoadmap";
import SimplifiedUltimateRoadmap from "./pages/UltimateRoadmap";
import TestLinks from "./pages/TestLinks";
import Flowchart from "./pages/Flowchart";
import BookTest from "./pages/BookTest";
import AIChatBot from "./components/AIChatBot";
import { AppProvider } from "./context/AppContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function AppContent() {
  const { isDark } = useTheme();
  
  return (
    <div className={`min-h-screen w-full transition-all duration-500 professional-background theme-text-primary pt-20 ${isDark ? 'dark' : 'light'}`}>
      <Navbar />
        
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/career-path" element={<CareerPath />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/enhanced-roadmap" element={<EnhancedRoadmap />} />
        <Route path="/simplified-ultimate-roadmap" element={<SimplifiedUltimateRoadmap />} />
        <Route path="/test-links" element={<TestLinks />} />
        <Route path="/flowchart" element={<Flowchart />} />
        <Route path="/book-test" element={<BookTest />} />
      </Routes>
      <AIChatBot />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <AppContent />
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}