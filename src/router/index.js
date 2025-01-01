import { createRouter, createWebHistory } from 'vue-router';
import UserHome from '../components/UserHome.vue';
import UserRegistration from '../components/UserRegistration.vue';
import UserLogin from '../components/UserLogin.vue';
import UserProfile from '../components/UserProfile.vue';
import UserInvest from '../components/UserInvest.vue';
import UserInvestHistory from '../components/UserInvestHistory.vue'; 

const routes = [
    { path: '/', component: UserHome },
    { path: '/register', component: UserRegistration },
    { path: '/login', component: UserLogin },
    { path: '/profile', component: UserProfile },
    { path: '/invest', component: UserInvest },
    { path: '/investment-history', component: UserInvestHistory },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
