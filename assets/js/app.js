/**
 * PITOL QR PRO
 * Application Bootstrap
 */


import {QRGenerator} from "./qr.js";

import {QRScanner} from "./scanner.js";

import {Downloader} from "./download.js";

import {HistoryManager} from "./history.js";

import {BatchGenerator} from "./batch.js";

import {UIController} from "./ui.js";





class App {



constructor(){


    this.ui =
    new UIController();



    this.qr =
    new QRGenerator();



    this.scanner =
    new QRScanner();



    this.history =
    new HistoryManager();



    this.batch =
    new BatchGenerator();



}







start() document
.getElementById(
    "generateBatch"
)
.onclick =
async ()=>{


const input =
document
.getElementById(
    "csvInput"
);



if(
input.files.length===0
)
return;



await this.batch.generate(
    input.files[0]
);



};{



    
    this.ui.initialize();


    this.history.render();




    document
    .getElementById(
        "generateBtn"
    )
    .onclick =
    ()=>this.generateQR();





    document
    .getElementById(
        "clearBtn"
    )
    .onclick =
    ()=>this.qr.clear();






    document
    .getElementById(
        "themeToggle"
    )
    .onclick =
    ()=>this.ui.toggleTheme();





    document
    .getElementById(
        "startScanner"
    )
    .onclick =
    ()=>this.scanner.start();





    document
    .getElementById(
        "stopScanner"
    )
    .onclick =
    ()=>this.scanner.stop();





    document
    .getElementById(
        "clearHistory"
    )
    .onclick =
    ()=>this.history.clear();






   /*
    QR Export Buttons
*/


document
.getElementById(
    "downloadPNG"
)
.onclick =
()=>{


    const canvas =
    document.querySelector(
        "#qrPreview canvas"
    );


    if(canvas){

        Downloader.PNG(canvas);

    }


};





document
.getElementById(
    "downloadSVG"
)
.onclick =
()=>{


    const canvas =
    document.querySelector(
        "#qrPreview canvas"
    );


    if(canvas){

        Downloader.SVG(canvas);

    }


};





document
.getElementById(
    "downloadPDF"
)
.onclick =
()=>{


    const canvas =
    document.querySelector(
        "#qrPreview canvas"
    );


    if(canvas){

        Downloader.PDF(canvas);

    }


};



document
.getElementById(
"downloadPDF"
)
.onclick =
()=>{


const canvas =
document.querySelector(
"#qrPreview canvas"
);


if(canvas)
Downloader.PDF(canvas);


};


    };




}






generateQR(){


    const text =
    document
    .getElementById(
        "qrInput"
    )
    .value;



    if(!text)
    return;



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

        text,

        {
            dark,
            light
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



        if(
            "serviceWorker" in navigator
        ){

            navigator.serviceWorker.register(
                "service-worker.js"
            )
            .then(
                registration=>{

                    console.log(
                        "Service Worker registered:",
                        registration.scope
                    );

                }
            )
            .catch(
                error=>{

                    console.error(
                        "Service Worker registration failed:",
                        error
                    );

                }
            );

        }


    }
);
