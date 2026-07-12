/**
 * PITOL QR PRO
 * Batch Generator
 */


import {QRGenerator} from "./qr.js";



export class BatchGenerator {



constructor(){


    this.generator =
    new QRGenerator();


}





async process(file){



    const text =
    await file.text();



    const rows =
    text.split("\n")
    .filter(
        row=>row.trim()
    );



    let count=0;



    for(const row of rows){


        this.generator.generate(
            row.trim()
        );


        count++;


    }



    return count;


}



}
