/**
 * QR Generator Module
 */


import {CONFIG} from "./config.js";
import {StorageManager} from "./storage.js";
import {generateID} from "./utils.js";



export class QRGenerator {



constructor(){


    this.container =
    document.getElementById(
        "qrPreview"
    );


}




generate(
    text,
    options={}
){



    this.container.innerHTML="";



    const canvas =
    document.createElement(
        "canvas"
    );



    this.container.appendChild(
        canvas
    );




    QRCode.toCanvas(

        canvas,

        text,

        {

            width:
            options.width ||
            CONFIG.QR_DEFAULTS.width,


            color:{

                dark:
                options.dark ||
                "#000000",


                light:
                options.light ||
                "#ffffff"

            }

        },

        error=>{

            if(error){

                console.error(error);

            }

        }

    );





    const item = {


        id:generateID(),


        content:text,


        created:new Date(),


        image:
        canvas.toDataURL()


    };



    StorageManager.saveHistory(
        item
    );


    return canvas;


}



clear(){


    this.container.innerHTML="";


}


}
