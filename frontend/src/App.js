import React, { useCallback } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ToolsSections } from "./components/ToolsSections";
import { HowItWorks } from "./components/HowItWorks";
import { AIPlayground } from "./components/AIPlayground";
import { Pricing } from "./components/Pricing";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { WaitlistCTA } from "./components/WaitlistCTA";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";

const Home = () => {
  const scrollToPlayground = useCallback((toolId) => {
    const el = document.getElementById("playground");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    // Allow playground to receive the tool selection via a custom event
    window.dispatchEvent(new CustomEvent("select-tool", { detail: toolId }));
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ToolsSections onTryTool={scrollToPlayground} />
        <HowItWorks />
        <AIPlayground />
        <Pricing />
        <Testimonials />
        <FAQ />
        <WaitlistCTA />
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" />
      </LanguageProvider>
    </div>
  );
}

export default App;
