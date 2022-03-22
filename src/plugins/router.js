import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieView from '../views/movies/MovieView.vue'
import MovieHomeView from '../views/movies/MovieHomeView.vue'
import MovieSearchView from '../views/movies/MovieSearchView.vue'
import MovieDetailsView from '../views/movies/MovieDetailsView.vue'
import MovieWatchView from '../views/movies/MovieWatchView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/movies',
    name: 'movies',
    component: MovieView,
    meta: {
      auth: {
        group: 'Torrent Peer',
      },
    },
    children: [
      {
        path: '',
        name: 'movies-home',
        component: MovieHomeView,
      },
      {
        path: '/movies/search/:terms',
        name: 'movies-search',
        component: MovieSearchView,
      },
      {
        path: '/movies/view/:id',
        name: 'movies-details',
        component: MovieDetailsView,
      },
      {
        path: '/movies/watch/:id',
        name: 'movies-watch',
        component: MovieWatchView,
      },
    ]
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/MovieView.vue')
  },
  {
    path: '/conductor',
    name: 'conductor',
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
