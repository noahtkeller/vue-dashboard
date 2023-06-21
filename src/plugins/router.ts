import type { App } from 'vue';

import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '@/views/home-view.vue';
import MovieHomeView from '@/views/movies/MovieHomeView.vue';
import MovieSearchView from '@/views/movies/MovieSearchView.vue';
import MovieDetailsView from '@/views/movies/MovieDetailsView.vue';
import MovieWatchView from '@/views/movies/MovieWatchView.vue';
import { userManager } from '@/services/oidc';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView as any,
    },
    {
      path: '/movies',
      name: 'movies',
      component: {
        template: '<router-view/>',
      },
      meta: {
        auth: {
          group: 'Torrent Peer',
        },
      },
      children: [
        {
          path: '',
          name: 'movies-home',
          component: MovieHomeView as any,
        },
        {
          path: '/movies/search/:terms',
          name: 'movies-search',
          component: MovieSearchView as any,
          children: [
            {
              path: '/movies/search/:terms/:page',
              name: 'movies-search',
              component: MovieSearchView as any,
            },
          ],
        },
        {
          path: '/movies/view/:id',
          name: 'movies-details',
          component: MovieDetailsView as any,
        },
        {
          path: '/movies/watch/:id',
          name: 'movies-watch',
          component: MovieWatchView as any,
        },
      ],
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ '../views/MovieView.vue')
    },
  ],
});

router.addRoute({
  path: `/auth/signinwin/main`,
  name: `signinwin-main`,
  component: {
    render: () => '',
    async created() {
      const location = window.location.href.replace(/dash\/#/, 'dash');
      const data: any = await this.$oidc
        .signinRedirectCallback(location)
        .catch(() => ({ state: { to: '/' } }));
      await router.replace(data.state?.to || '/');
    },
  },
});

router.beforeEach(async (to: any, from: any, next: any) => {
  if (typeof to.meta?.auth === 'function') {
    await to.meta.auth(to, from, next, userManager);
    // if (to.meta.auth.group) {
    //     if (user) {
    //         if (user.profile.groups?.includes(to.meta.auth.group)) {
    //             next();
    //         } else {
    //             next({ name: 'home' });
    //         }
    //     } else {
    //         next({ name: 'home' });
    //     }
    // } else {
    //     // unknown auth type
    // }
  } else {
    next();
  }
});

export default function (app: App<Element>) {
  app.use(router);
}
