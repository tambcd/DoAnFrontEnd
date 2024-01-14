import {createWebHistory, createRouter} from "vue-router";
import TheHome from '@/page/TheHome';
import TheEvent from '@/page/TheEvent';
import TheScore from '@/page/consultant/TheScore';
import TheStatistical from '@/page/TheStatistical';
import TheStudent from '@/page/TheStudent';
import TheContact from '@/page/contact/TheContact';
import TheReport from '@/page/report/TheReport';
import SocialNetworkHome from '@/page/socialnetwork/SocialNetworkHome';

const routes = [
    {path:'/',redirect: '/contact'},
    {path:'/students',component:TheStudent},
    {path:'/event',component:TheEvent},
    {path:'/chat',component:TheHome},
    {path:'/contact',component:TheContact},
    {path:'/score', component: TheScore},
    {path:'/report', component: TheReport},
    {path:'/statistical', component: TheStatistical},
    {path:'/social_network', component: SocialNetworkHome},
]

const router = createRouter({
    history: createWebHistory(), 
    routes, 
  })  
  
export {router};