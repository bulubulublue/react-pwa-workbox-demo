import { clientsClaim} from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

clientsClaim()

self.skipWaiting()

//precacheAndRoute默认使用的是cacheFirst方法
//可以定义precache的路由，revision:如果文件有更新，则是此次更新的id
// precacheAndRoute([
//     {url:'/index.html',revision:'3333'},
//     //....other entries
// ])




precacheAndRoute(self.__WB_MANIFEST)

//添加运行时缓存策略
registerRoute(
  ({url}) => url.origin === 'https://fonts.googleapis.com',
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

// Cache the underlying font files with a cache-first strategy for 1 year.
// @see https://developers.google.com/web/tools/workbox/guides/common-recipes#google_fonts
registerRoute(
  ({url}) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      //只缓存响应码为成功的请求
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

//缓存图片
registerRoute(
  ({request}) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);

// 缓存样式
registerRoute(
  ({request}) => request.destination === 'script' ||
    request.destination === 'style',
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

// 缓存第三方请求
registerRoute(
  ({url}) => url.origin === 'https://api.themoviedb.org' &&
    url.pathname.startsWith('/3/discover/tv'),
  new StaleWhileRevalidate({
    cacheName: 'movie-api-response',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({maxEntries: 1}), // Will cache maximum 1 requests.
    ]
  })
);