import LandingPage from './public/landing_page';
import AboutUs from './public/about_us';
import Adoption from './public/adoption';
import Sponsorship from './public/sponsorship';
import Contact from './public/contact';
import Donation from './public/donation';
import Volunteers from './public/volunteers';

import Login from './private/login';
import ControlPanel from './private/control_panel';
import Animals from './private/animals';
import Sponsorships from './private/sponsorships';
import Adoptions from './private/adoptions';
import { Volunteers as AdminVolunteers }  from './private/volunteers';

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
}

export {
    publicPages,
    privatePages
}