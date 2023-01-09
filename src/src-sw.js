import { clientsClaim} from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'

clientsClaim()

self.skipWaiting()

//precacheAndRoute默认使用的是cacheFirst方法
//可以定义precache的路由，revision:如果文件有更新，则是此次更新的id
// precacheAndRoute([
//     {url:'/index.html',revision:'3333'},
//     //....other entries
// ])

precacheAndRoute(self.__WB_MANIFEST)