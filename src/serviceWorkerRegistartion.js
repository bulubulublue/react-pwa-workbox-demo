import { Workbox } from "workbox-window";

export default function registerServiceWorker() {
    // if('production' !== process.env.NODE_ENV){
    //     return
    // }

    if('serviceWorker' in navigator){
        const wb = new Workbox('sw.js') // 有injectManifest生成的sw文件

        //判断如果有文件更改，则提示更新
        wb.addEventListener('installed',event => {
            if(event.isUpdate){
                if(confirm('New app update available')){
                    // 重新加载页面并清除缓存
                    window.location.reload()
                }
            }
        })
        wb.register()
    }
}