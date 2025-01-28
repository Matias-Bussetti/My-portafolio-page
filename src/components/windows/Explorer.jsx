import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const Explorer = () => {
  return (
    <BrowserRouter>
    <Link to="/">home</Link>
    <Link to="/a">a</Link>
      <Routes>
        <Route path="/" element={<p>/</p>} /> {/* 👈 Renders at /app/ */}
        <Route path="/a" element={<p>/a</p>} /> {/* 👈 Renders at /app/ */}
      </Routes>
    </BrowserRouter>
  );
};

export default Explorer;
