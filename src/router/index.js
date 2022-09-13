import { createRouter, createWebHistory } from "vue-router";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "layout",
      component: () => import("../components/Frontend/Layout.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("../views/BookShop.vue"),
        },
        {
          path: "book/:slug",
          name: "book-details",
          component: () => import("../views/BookDetails.vue"),
        },
      ]
    },    
    {
      path: "/admin",
      name: "admin",
      component: () => import("../components/Admin/Layouts/Layout.vue"),
      children: [
        {
          path: 'book',
          name: 'book',
          component: () => import("../views/Admin/Book/Index.vue"),
          children: [
            {
              path: 'list',
              name: 'book-list',
              component: () => import("../views/Admin/Book/List.vue"),
            },
            {
              path: 'create',
              name: 'book-create',
              component: () => import("../views/Admin/Book/Create.vue"),
            },
            {
              path: 'view/:id',
              name: 'book-view',
              component: () => import("../views/Admin/Book/View.vue"),
            },
            {
              path: 'edit/:id',
              name: 'book-edit',
              component: () => import("../views/Admin/Book/Edit.vue"),
            }
          ]
        },
        {
          path: 'author',
          name: 'author',
          component: () => import("../views/Admin/Author/Index.vue"),
          children: [
            {
              path: 'list',
              name: 'author-list',
              component: () => import("../views/Admin/Author/List.vue"),
            },
            {
              path: 'create',
              name: 'author-create',
              component: () => import("../views/Admin/Author/Create.vue"),
            },
            {
              path: 'view/:id',
              name: 'author-view',
              component: () => import("../views/Admin/Author/View.vue"),
            },
            {
              path: 'edit/:id',
              name: 'author-edit',
              component: () => import("../views/Admin/Author/Edit.vue"),
            }
          ]
        },
        {
          path: 'publisher',
          name: 'publisher',
          component: () => import("../views/Admin/Publisher/Index.vue"),
          children: [
            {
              path: 'list',
              name: 'publisher-list',
              component: () => import("../views/Admin/Publisher/List.vue"),
            },
            {
              path: 'create',
              name: 'publisher-create',
              component: () => import("../views/Admin/Publisher/Create.vue"),
            },
            {
              path: 'view/:id',
              name: 'publisher-view',
              component: () => import("../views/Admin/Publisher/View.vue"),
            },
            {
              path: 'edit/:id',
              name: 'publisher-edit',
              component: () => import("../views/Admin/Publisher/Edit.vue"),
            }
          ]
        },
        {
          path: 'genre',
          name: 'genre',
          component: () => import("../views/Admin/Genre/Index.vue"),
          children: [
            {
              path: 'list',
              name: 'genre-list',
              component: () => import("../views/Admin/Genre/List.vue"),
            },
            {
              path: 'create',
              name: 'genre-create',
              component: () => import("../views/Admin/Genre/Create.vue"),
            },
            {
              path: 'view/:id',
              name: 'genre-view',
              component: () => import("../views/Admin/Genre/View.vue"),
            },
            {
              path: 'edit/:id',
              name: 'genre-edit',
              component: () => import("../views/Admin/Genre/Edit.vue"),
            }
          ]
        },
      ]
    },
  ],
});

export default router;
