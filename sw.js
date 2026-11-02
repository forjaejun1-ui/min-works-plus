importScripts('/min-works/push-sw.js?v=push102');
const CACHE='min-works-plus-standalone-v102';
const ASSETS=['/min-works/push-notifications.js?v=push102','/min-works/push-notifications.css?v=push102','/min-works-plus/','/min-works/reader.css?v=design85','/min-works/plus-auth.css?v=design81','/min-works/plus-opening.js?v=design81','/min-works/plus-auth.js?v=design81','/min-works/reader.js?v=push102','/min-works/device-session.js?v=63','/min-works/plus-icon-design-192.png','/min-works/plus-icon-design-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('min-works-plus-standalone-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  if(event.request.method!=='GET'||url.origin!==self.location.origin)return;
  event.respondWith((async()=>{
    try{const response=await fetch(event.request);if(response.ok){const cache=await caches.open(CACHE);cache.put(event.request,response.clone())}return response}
    catch(error){const cached=await caches.match(event.request,{ignoreSearch:event.request.mode==='navigate'});if(cached)return cached;if(event.request.mode==='navigate')return caches.match('/min-works-plus/');throw error}
  })());
});
