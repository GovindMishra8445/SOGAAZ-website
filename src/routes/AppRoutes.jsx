import { Routes, Route } from "react-router-dom";

import PrivateClients from "../pages/privateClients/PrivateClients";
import Business from "../pages/business/Business";
import Support from "../pages/support/Support";
import PolicyActivation from "../pages/policy/PolicyActivation";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateClients />} />
      <Route path="/business" element={<Business />} />
      <Route path="/support" element={<Support />} />
      <Route path="/policy" element={<PolicyActivation />} />
    </Routes>
  );
};

export default AppRoutes;