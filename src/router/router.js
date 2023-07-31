import {createWebHistory, createRouter} from "vue-router";
import TheHome from '@/page/TheHome'
import TheEvent from '@/page/TheEvent'
import TheScore from '@/page/TheScore'
import TheStatistical from '@/page/TheStatistical'
import TheStudent from '@/page/TheStudent'
import TheContact from '@/page/contact/TheContact'

const routes = [
    {path:'/',redirect: '/contact'},
    {path:'/students',component:TheStudent},
    {path:'/event',component:TheEvent},
    {path:'/home',component:TheHome},
    {path:'/contact',component:TheContact},
    {path:'/score', component: TheScore},
    {path:'/statistical', component: TheStatistical},
]

const router = createRouter({
    history: createWebHistory(), 
    routes, 
  })  
  
export {router};