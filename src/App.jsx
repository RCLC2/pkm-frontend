import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import About from './pages/About';
import { useState } from 'react';
import Production from "./pages/production/Production";
import Login from "./pages/auth/Login";


const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (state) => {
    setIsScrolled(state);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Production handleScroll={handleScroll} isScrolled={isScrolled}/>} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
};

export default App;