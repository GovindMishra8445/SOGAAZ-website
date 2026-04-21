import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { LanguageProvider } from "./context/LanguageContext";
import ToastProvider from "./utils/toast";

function App() {
  return (
    <LanguageProvider>
      <ToastProvider />
      <AppRoutes />
    </LanguageProvider>
  );
}

export default App;
