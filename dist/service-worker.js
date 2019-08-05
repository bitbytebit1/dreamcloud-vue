/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

importScripts(
  "update-available.js",
  "precache-manifest.0b8d3a851901788609c56a56c2de2116.js"
);

workbox.core.setCacheNameDetails({prefix: "dreamcloud"});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/^https:\/\/fonts\.googleapis\.com\/|^https:\/\/fonts\.gstatic\.com\//, workbox.strategies.cacheFirst({ "cacheName":"font-cache", plugins: [new workbox.expiration.Plugin({"maxEntries":100,"purgeOnQuotaError":false}), new workbox.cacheableResponse.Plugin({"statuses":[0,200]})] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/dc-mp3-wwlveeistv\.now\.sh|https:\/\/cors\.io\/\?https:\/\/www\.saveoffline\.com\/process|^https:\/\/www\.s\d{1,2}\.saveoffline\.com|^https:\/\/www\.saveoffline\.com\/get\/\?i|^https:\/\/www\.s\d{1,2}\.saveoffline\.com|^https:\/\/www\.saveoffline\.com\/get\/\?i|^https:\/\/api\.soundcloud\.com\/tracks\/.+\/stream|^https:\/\/sndcdn\.com/, workbox.strategies.cacheFirst({ "cacheName":"song-cache", plugins: [new workbox.expiration.Plugin({"maxAgeSeconds":1210000,"purgeOnQuotaError":false}), new workbox.cacheableResponse.Plugin({"statuses":[0,200,302]})] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/www\.googleapis\.com\/youtube\/v3|https:\/\/api\.mixcloud|^https:\/\/api\.soundcloud\.com\/users|^https:\/\/api\.soundcloud\.com\/tracks|^https:\/\/api.vimeo.com?/, workbox.strategies.cacheFirst({ "cacheName":"search-cache", plugins: [new workbox.expiration.Plugin({"maxAgeSeconds":10800,"purgeOnQuotaError":false}), new workbox.cacheableResponse.Plugin({"statuses":[0,200]})] }), 'GET');
