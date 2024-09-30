import {
  Routes,
  Route,
  BrowserRouter,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";

import { publicPages, privatePages } from "./pages/pages.js";
import AuthAdminRoutes from "./AuthAdminRoutes.jsx";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return;
};

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<publicPages.LandingPage />} />
        <Route path="aboutus" element={<publicPages.AboutUs />} />
        <Route path="adoption" element={<publicPages.Adoption />} />
        <Route path="sponsorship" element={<publicPages.Sponsorship />} />
        <Route path="contact" element={<publicPages.Contact />} />
        <Route path="donation" element={<publicPages.Donation />} />
        <Route path="volunteers" element={<publicPages.Volunteers />} />
        <Route path="admin" element={<AuthAdminRoutes />}>
          <Route index element={<Navigate to="/admin/login" />} />
          <Route path="/admin/login" element={<privatePages.Login />} />
          <Route path="/admin/control_panel" element={<privatePages.ControlPanel />} />
          <Route path="/admin/animals" element={<privatePages.Animals />} />
          <Route path="/admin/sponsorships" element={<privatePages.Sponsorships />} />
          <Route path="/admin/adoptions" element={<privatePages.Adoptions />} />
          <Route path="/admin/volunteers" element={<privatePages.Volunteers />} />
          <Route path="/admin/admin_page" element={<privatePages.Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
