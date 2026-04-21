import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

import PrivateClients from "../pages/privateClients/PrivateClients";
import Business from "../pages/business/Business";
import Support from "../pages/support/Support";
import ComingSoon from "../components/common/ComingSoon";
import ApartmentInsurance from "../components/common/ApartmentInsurance";
import VerifyCertificate from "../pages/certificateVerification/VerifyCertificate";

import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import AddCertificate from "../pages/admin/AddCertificate";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🔐 ADMIN LOGIN */}
      <Route path="/admin/login" element={<Login />} />

      {/* 🔐 ADMIN PANEL */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="add-certificate" element={<AddCertificate />} />{" "}
        {/* ✅ FIX */}
      </Route>

      {/* 🌐 PUBLIC WEBSITE */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<PrivateClients />} />
        <Route path="business" element={<Business />} />
        <Route path="support" element={<Support />} />
        <Route path="policy" element={<ComingSoon />} />
        <Route path="apartment-insurance" element={<ApartmentInsurance />} />
        <Route path="verify-certificate" element={<VerifyCertificate />} />
        <Route path="verify/:docId" element={<VerifyCertificate />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
