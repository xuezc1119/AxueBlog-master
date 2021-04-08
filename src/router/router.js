import App from '@/App';
import Index from '@/components/index/index';
import Admin from '@/components/admin/admin';
import Login from '@/components/login/login';
import Register from '@/components/login/register';
import Blog from '@/components/blog/blog';
import Home from '@/components/home/home';
import Articles from '@/components/articles/articles';
import Photographs from '@/components/photographs/photographs';
import Contact from '@/components/contact/contact';
import ArticleDetails from '@/components/home/details/article-details';

export default [
    {
        name: 'app',
        path: '/',
        component: App
    },
    {
        path: '/',
        name: 'blog',
        component: Blog,
        children: [
        {
            path: '/Axue-blog',
            component: Index,
            children: [
            {
                name: 'home',
                path: '/Axue-blog/home',
                component: Home
            },
            {
                name: 'articles',
                path: '/Axue-blog/articles',
                component: Articles
            },
            {
                name: 'photographs',
                path: '/Axue-blog/photographs',
                component: Photographs
            },
            {
                name: 'contact',
                path: '/Axue-blog/contact',
                component: Contact
            },
            {
                name: 'articleDetails',
                path: '/Axue-blog/articleDetails/:id',
                component: ArticleDetails
            }
            ]
        },
        {
            name: 'login',
            path: '/Axue-blog/login',
            component: Login
        },
        {
            name: 'register',
            path: '/Axue-blog/register',
            component: Register
        }
        ]
    },
    {
        name: 'admin',
        path: '/Axue-blog/admin',
        component: Admin
    }
]