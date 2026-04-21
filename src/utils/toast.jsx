
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = () => (
  <ToastContainer
    position="top-right"
    autoClose={3500}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    pauseOnFocusLoss={false}
    draggable
    pauseOnHover
    theme="light"
    toastStyle={{
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "13.5px",
      borderRadius: "12px",
      boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
      border: "1px solid rgba(0,0,0,0.05)",
    }}
    style={{ top: "20px", right: "20px" }}
  />
);

export default ToastProvider;
