import React from "react";
import Home from "./pages/home/home";
import Test from "./pages/test/test";
import Contribute from "./pages/contribute/contribute";
import Contact from "./pages/contact/contact";
import Signin from "./pages/signin/signin";
import Signup from "./pages/signin/signup";
import Navbar from "./components/navbar/nav";
import backgroundImg from "/cf-stress.jpg";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./pages/signin/PrivateRoute";

function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "100% 100%",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contribute" element={<Contribute />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/test" element={<Test />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
