import { createRouter, createWebHistory } from 'vue-router';

import Home from "../views/pages/Home.vue"
import Login from "../views/pages/Login.vue"
import Article from "../views/pages/Article.vue"
import Dashboard from "../views/components/Dashboard.vue"
import NotFound from "../views/components/Notfound.vue"
import CreateUser from "../views/pages/CreateUser.vue"
import AllUsers from "../views/pages/AllUsers.vue"
import AddArticle from "../views/pages/addArticle.vue"
import PatchArticle from "../views/pages/PatchArticle.vue"

const ifAuthenticated = (to, from, next) => {
    const loggedIn = localStorage.getItem('session_token');
    if (loggedIn) {
        next();
    } else {
        console.log('Not authenticated, redirecting to login');
        next('/login');
    }
};


const routes =[
    {path: "/", component: Home},
    {path: "/login", component: Login},
    {path: "/article/:id",component: Article },
    {path:"/:pathMatch(.*)*", component: NotFound},
    {path:"/dashboard", component: Dashboard,beforeEnter: ifAuthenticated},
    {path:"/addUser", component: CreateUser},
    {path:"/allUsers", component: AllUsers},
    {path:"/addArticle", component: AddArticle},
    {path:"/patchArticle",component: PatchArticle}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


export default router;