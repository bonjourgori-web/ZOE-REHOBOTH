import React, { useState, createContext } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import VerseduJour from "./components/VerseduJour";
import Catalogue from "./components/Catalogue";
import Auteurs from "./components/Auteurs";
import Agenda from "./components/Agenda";
import VideoSection from "./components/VideoSection";
import Distribution from "./components/Distribution";
import Footer from "./components/Footer";
import "./App.css";

export const LanguageContext = createContext({ lang: "fr", setLang: () => {} });

function App() {
  const [lang, setLang] = useState("fr");

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <div className="zr-app">
        <Header />
        <main>
          <Hero />
          <VerseduJour />
          <Catalogue />
          <Auteurs />
          <Agenda />
          <VideoSection />
          <Distribution />
        </main>
        <Footer />
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
