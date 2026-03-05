import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Domains from "./components/Domains";
import Quote from "./components/Quote";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Recrutement from "./components/Recrutement";
import { Toaster } from "./components/ui/sonner";
import "./App.css";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Domains />
      <Quote />
      <Contact />
      <Footer />
    </>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recrutement" element={<Recrutement />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
