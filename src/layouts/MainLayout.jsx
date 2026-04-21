import { useState } from "react";
import TopNavbar from "../components/layout/TopNavbar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Support from "../pages/support/Support";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [supportOpen, setSupportOpen] = useState(false);
  const [activeTopTab, setActiveTopTab] = useState("private");

  return (
    <>
      <div className="hidden lg:block sticky top-0 z-50">
        <TopNavbar
          onSupportClick={() => setSupportOpen(true)}
          activeTopTab={activeTopTab}
          setActiveTopTab={setActiveTopTab}
        />
      </div>

      <div className="sticky top-0 lg:top-[63px] z-40">
        <Navbar />
      </div>

      <Outlet />

      <Support isOpen={supportOpen} onClose={() => setSupportOpen(false)} />

      <Footer />
    </>
  );
};

export default MainLayout;