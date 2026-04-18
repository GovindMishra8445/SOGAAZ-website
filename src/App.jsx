import { useState } from "react";
import TopNavbar from "./components/layout/TopNavbar";
import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { LanguageProvider } from "./context/LanguageContext";
import Footer from "./components/layout/Footer";
import Support from "./pages/support/Support";
import Login from "./pages/auth/login";

function App() {
  const [supportOpen, setSupportOpen] = useState(false);
  const [activeTopTab, setActiveTopTab] = useState("private");
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <LanguageProvider>
      {/* TOP NAVBAR */}
      <div className="hidden lg:block sticky top-0 z-50">
        <TopNavbar
          onSupportClick={() => {
            setSupportOpen(true);
            setActiveTopTab("support");
          }}
          onLoginClick={() => setLoginOpen(true)} // ✅ ADD THIS
          activeTopTab={activeTopTab}
          setActiveTopTab={setActiveTopTab}
        />
      </div>

      {/* NAVBAR */}
      <div className="sticky top-0 lg:top-[63px] z-40">
        <Navbar />
      </div>

      {/* ROUTES */}
      <AppRoutes />

      {/* SUPPORT DRAWER */}
      <Login isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
      <Support isOpen={supportOpen} onClose={() => setSupportOpen(false)} />

      <Footer />
    </LanguageProvider>
  );
}

export default App;
