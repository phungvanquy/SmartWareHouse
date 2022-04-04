import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Author } from "./pages/Author";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route
          path="/:wareHoseIndex/products"
          element={<Products></Products>}
        ></Route>
        <Route path="/Author" element={<Author></Author>} />
      </Routes>
    </Router>
  );
}

export default App;
