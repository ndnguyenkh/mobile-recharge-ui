
/** Page Private*/
//import CategoryPage from "~/views/Category";
import About from "~/components/About";
import Contact from "~/components/Contact";
import { ManageLayout } from "~/layouts";
import AdminPayTheBills from "~/views/AdminPayTheBills";
import AdminRechargePhone from "~/views/AdminRechargePhone";
import AdminUserRegistered from "~/views/AdminUserRegistered";
import Error from "~/views/Error";

import Home from "~/views/Home";
import PayTheBills from "~/views/PayTheBills";
import Profile from "~/views/Profile";
import RechargePhone from "~/views/RechargePhone";

/** Page Public*/
const { default: Login } = require("~/views/Login");
const { default: Register } = require("~/views/Register");

const PublicRoutes = [
    { path: '/', component: Home, },
    { path: '/login', component: Login, },
    { path: '/register', component: Register, },
    { path: '/error', component: Error },
    { path: '/contact-us', component: Contact },
    { path: '/about-us', component: About },
    { path: '/recharge-phone', component: RechargePhone },

    // temp
    // { path: '/pay-the-bills', component: PayTheBills },
    // { path: '/profile', component: Profile },

    // temp admin
    // { path: '/admin-recharge-phone', component: AdminRechargePhone, layout: ManageLayout },
    // { path: '/admin-pay-the-bills', component: AdminPayTheBills, layout: ManageLayout },
    // { path: '/admin-user-registered', component: AdminUserRegistered, layout: ManageLayout },

];

const PrivateRoutes = [
    // user
    { path: '/pay-the-bills', component: PayTheBills },
    { path: '/profile', component: Profile },

    // admin
    { path: '/admin-recharge-phone', component: AdminRechargePhone, layout: ManageLayout },
    { path: '/admin-pay-the-bills', component: AdminPayTheBills, layout: ManageLayout },
    { path: '/admin-user-registered', component: AdminUserRegistered, layout: ManageLayout },
];

export { PublicRoutes, PrivateRoutes };