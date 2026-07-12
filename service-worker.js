/**
 * PITOL QR PRO
 * Progressive Web App Service Worker
 */

const CACHE_NAME = "pitol-qr-pro-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",

    "./assets/css/style.css",
    "./assets/css/components.css",
    "./assets/css/utilities.css",
    "./assets/css/themes.css",

    "./assets/js/app.js",
    "./assets/js/config.js",
    "./assets/js/qr.js",
    "./assets/js/scanner.js",
    "./assets/js/storage.js",
    "./assets/js/history.js",
    "./assets/js/download.js",
    "./assets/js/batch.js",
    "./assets/js/ui.js",
    "./assets/js/utils.js"
];


self.addEventListener(
    "install",
    event => {

        event.waitUntil(
            caches.open(CACHE_NAME)
            .then(cache =>
                cache.addAll(FILES_TO_CACHE)
            )
        );

        self.skipWaiting();
    }
);



self.addEventListener(
    "activate",
    event => {

        event.waitUntil(
            caches.keys()
            .then(keys =>
                Promise.all(
                    keys.map(
                        key => {

                            if(key !== CACHE_NAME){
                                return caches.delete(key);
                            }

                        }
                    )
                )
            )
        );

        self.clients.claim();
    }
);



self.addEventListener(
    "fetch",
    event => {

        event.respondWith(

            caches.match(event.request)
            .then(
                response => {

                    return response ||
                    fetch(event.request);

                }
            )

        );

    }
);
