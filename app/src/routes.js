import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/landing_page/index';
import AboutUs from './pages/about_us/index';
import Adoption from './pages/adoption/index';
import Sponsorship from './pages/sponsorship/index';
import Contact from './pages/contact/index';
import Donation from './pages/donation/index';
import Volunteers from './pages/volunteers/index';

export default function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/adoption" element={<Adoption />} />
            <Route path="/sponsorship" element={<Sponsorship />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donation" element={<Donation />} />
            <Route path="/volunteers" element={<Volunteers />} />
        </Routes>
    )
}