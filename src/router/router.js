import {createWebHistory, createRouter} from "vue-router";
import TheHome from '@/page/TheHome'
import TheEvent from '@/page/TheEvent'
import TheScore from '@/page/TheScore'
import TheStatistical from '@/page/TheStatistical'

const routes = [
    {path:'/',redirect: '/home'},
    {path:'/event',component:TheEvent},
    {path:'/home',component:TheHome},
    {path:'/score', component: TheScore},
    {path:'/statistical', component: TheStatistical},
]

const router = createRouter({
    history: createWebHistory(), 
    routes, 
  })  
  
export {router};