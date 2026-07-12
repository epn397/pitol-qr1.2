/**
 * PITOL QR PRO
 * Application Bootstrap
 */

import { QRGenerator } from "./qr.js";
import { QRScanner } from "./scanner.js";
import { Downloader } from "./download.js";
import { HistoryManager } from "./history.js";
import { BatchGenerator } from "./batch.js";
import { UIController } from "./ui.js";


class App {

    constructor(){

        this.ui = new UIController();

        this.qr = new QRGenerator();

        this.scanner = new QRScanner();

        this.history = new HistoryManager();

        this.batch = new BatchGenerator();

    }


    start(){


        this.ui.initialize();


        this.history.render();



        /*
        ==========================
        QR GENERATOR
        ==========================
        */


        document
        .getElementById("generateBtn")
        .onclick = ()=>{

            this.generateQR();

        };



        document
        .getElementById("clearBtn")
        .onclick = ()=>{

            this.qr.clear();

        };




        /*
        ==========================
        THEME
        ==========================
        */


        document
        .getElementById("themeToggle")
        .onclick = ()=>{

            this.ui.toggleTheme();

        };




        /*
        ==========================
        SCANNER
        ==========================
        */


        document
        .getElementById("startScanner")
        .onclick = ()=>{

            this.scanner.start();

        };



        document
        .getElementById("stopScanner")
        .onclick = ()=>{

            this.scanner.stop();

        };





        /*
        ==========================
        HISTORY
        ==========================
        */


        document
        .getElementById("clearHistory")
        .onclick = ()=>{

            this.history.clear();

        };





        /*
        ==========================
        DOWNLOAD BUTTONS
        ==========================
        */


        document
        .getElementById("downloadPNG")
        .onclick = ()=>{


            const canvas =
            document.querySelector(
                "#qrPreview canvas"
            );


            if(canvas){

                Downloader.PNG(canvas);

            }


        };




        document
        .getElementById("downloadSVG")
        .onclick = ()=>{


            const canvas =
            document.querySelector(
                "#qrPreview canvas"
            );


            if(canvas){

                Downloader.SVG(canvas);

            }


        };





        document
        .getElementById("downloadPDF")
        .onclick = ()=>{


            const canvas =
            document.querySelector(
                "#qrPreview canvas"
            );


            if(canvas){

                Downloader.PDF(canvas);

            }


        };






        /*
        ==========================
        BATCH GENERATOR
        ==========================
        */


        document
        .getElementById("generateBatch")
        .onclick = async ()=>{


            const input =
            document.getElementById(
                "csvInput"
            );


            if(!input.files.length){

                return;

            }


            await this.batch.generate(
                input.files[0]
            );


        };



    }




    generateQR(){



        const type =
        document
        .getElementById(
            "qrType"
        )
        .value;



        const input =
        document
        .getElementById(
            "qrInput"
        )
        .value;



        if(!input){

            return;

        }




        const dark =
        document
        .getElementById(
            "qrForeground"
        )
        .value;



        const light =
        document
        .getElementById(
            "qrBackground"
        )
        .value;




        this.qr.generate(

            type,

            input,

            {

                dark,

                light

            }

        );



        this.history.add(

            {

                type,

                content: input,

                date:
                new Date()
                .toISOString()

            }

        );



        this.history.render();



    }



}





window.addEventListener(

    "DOMContentLoaded",

    ()=>{


        const app =
        new App();


        app.start();




        /*
        ==========================
        SERVICE WORKER
        ==========================
        */


        if(
            "serviceWorker" in navigator
        ){


            navigator.serviceWorker.register(

                "service-worker.js"

            )

            .then(

                registration=>{

                    console.log(

                        "Service Worker:",
                        registration.scope

                    );

                }

            )

            .catch(

                error=>{


                    console.error(

                        "Service Worker Error:",
                        error

                    );


                }

            );


        }



    }

);
