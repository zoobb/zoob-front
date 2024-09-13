import {createRouter, createWebHistory} from 'vue-router';
import HomePage from './views/HomePage.vue';
import TodoPage from './views/TodoPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomePage
        }, {
            path: '/todo',
            name: 'Todo',
            component: TodoPage
        }
    ]
})

export default router;
