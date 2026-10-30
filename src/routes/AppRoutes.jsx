import { Suspense, lazy } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";
import { AdminSplash } from "../components/admin/ui";

import PrivateClients from "../pages/privateClients/PrivateClients";
import Business from "../pages/business/Business";
import Support from "../pages/support/Support";
import ComingSoon from "../components/common/ComingSoon";
import ApartmentInsurance from "../components/common/ApartmentInsurance";
import VerifyCertificate from "../pages/certificateVerification/VerifyCertificate";

// Admin code is split into its own chunks — public visitors never download it.
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const Login = lazy(() => import("../pages/admin/Login"));
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const Certificates = lazy(() => import("../pages/admin/Certificates"));
const Settings = lazy(() => import("../pages/admin/Settings"));

// Session checks only run inside /admin — public visitors never hit the auth API.
const AdminRoot = () => (
  <AuthProvider>
    <Suspense fallback={<AdminSplash />}>
      <Outlet />
    </Suspense>
  </AuthProvider>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🔐 ADMIN */}
      <Route path="/admin" element={<AdminRoot />}>
        <Route path="login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="settings" element={<Settings />} />
          {/* old URL */}
          <Route
            path="add-certificate"
            element={<Navigate to="/admin/certificates" replace />}
          />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Route>
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
