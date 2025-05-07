"use client";
// import PasswordInput from "@/components/PasswordInput";
// import { PortfolioType, usePortfolioStore } from "@/store/usePortfolioStore";
// import { useEffect } from "react";
// import { ApplyChangesButton } from "@/components/ApplyChangesButton";
import { ScrollProgressView } from "portfolioui";
import ResumeAIChatbot from "@/components/chatbot-component";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Achievements from "@/components/sections/Achievements";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/sections/Contact";

// interface HomePageProps {
//   portfolio: PortfolioType;
//   url: string;
// }

export default function page() {
  // const { updateState } = usePortfolioStore();

  // useEffect(() => {
  //   updateState(portfolio);
  // }, [updateState, portfolio, url]);

  return (
    <div className="min-h-screen overflow-hidden space-y-10 w-full">
      <div className="pb-5 relative">
        {/* <PasswordInput />
        <ApplyChangesButton /> */}
        <ScrollProgressView className="from-sky-400 to-sky-700 via-sky-500" />
        {/* <Dock /> */}
        <Navbar />
        <Hero />
        <Experience />
        <Skills />
        <Achievements />
        <Contact />
        <ResumeAIChatbot />
        <Footer />
      </div>
    </div>
  );
}
