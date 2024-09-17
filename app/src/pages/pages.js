import LandingPage from './public/landing_page/index';
import AboutUs from './public/about_us/index';
import Adoption from './public/adoption/index';
import Sponsorship from './public/sponsorship/index';
import Contact from './public/contact/index';
import Donation from './public/donation/index';
import Volunteers from './public/volunteers/index';

import Login from './private/login/index';
import ControlPanel from './private/control_panel/index';
import Animals from './private/animals/index';
import Sponsorships from './private/sponsorships/index';
import Adoptions from './private/adoptions/index';
import { Volunteers as AdminVolunteers }  from './private/volunteers/index';
import Admin from './private/admin_page/index'

const publicPages = {
    LandingPage,
    AboutUs,
    Adoption,
    Sponsorship,
    Contact,
    Donation,
    Volunteers
}

const privatePages = {
    Login,
    ControlPanel,
    Animals,
    Sponsorships,
    Adoptions,
    Volunteers: AdminVolunteers,
    Admin
}

export {
    publicPages,
    privatePages
}