import { useLocation } from "react-router";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import "./App.css";
import { AnimatePresence } from "motion/react";

function App() {
  const location = useLocation();

  return (
    <>
      <NavBar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
