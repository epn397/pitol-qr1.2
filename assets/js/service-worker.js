/**
 * PITOL QR PRO
 * Progressive Web App Service Worker
 */


const CACHE_NAME = "pitol-qr-pro-v1";



const APP_FILES = [


    "./",

    "./index.html",


    "./manifest.json",



    "./assets/css/style.css",
    "./assets/css/components.css",
    "./assets/css/utilities.css",
    "./assets/css/themes.css",



    "./assets/js/app.js",
    "./assets/js/qr.js",
    "./assets/js/scanner.js",
    "./assets/js/download.js",
    "./assets/js/history.js",
    "./assets/js/batch.js",
    "./assets/js/ui.js",



    "./vendor/qrcode.min.js",
    "./vendor/html5-qrcode.min.js",
    "./vendor/jspdf.min.js",
    "./vendor/jszip.min.js"


];








/*
==========================
INSTALL
==========================
*/


self.addEventListener(

    "install",

    event=>{


        event.waitUntil(


            caches.open(
                CACHE_NAME
            )

            .then(

                cache=>{


                    return cache.addAll(
                        APP_FILES
                    );


                }

            )


        );


        self.skipWaiting();


    }

);








/*
==========================
ACTIVATE
==========================
*/


self.addEventListener(

    "activate",

    event=>{


        event.waitUntil(


            caches.keys()

            .then(

                keys=>{


                    return Promise.all(

                        keys.map(

                            key=>{


                                if(
                                    key !== CACHE_NAME
                                ){


                                    return caches.delete(
                                        key
                                    );


                                }


                            }

                        )

                    );


                }

            )


        );


        self.clients.claim();


    }

);









/*
==========================
FETCH
==========================
*/


self.addEventListener(

    "fetch",

    event=>{


        event.respondWith(


            caches.match(

                event.request

            )

            .then(

                cached=>{


                    if(cached){


                        return cached;


                    }




                    return fetch(

                        event.request

                    )

                    .then(

                        response=>{


                            return response;


                        }

                    )

                    .catch(

                        ()=>{


                            return caches.match(
                                "./index.html"
                            );


                        }

                    );



                }

            )


        );


    }

);
