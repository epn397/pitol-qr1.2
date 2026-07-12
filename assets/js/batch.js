/**
 * PITOL QR PRO
 * Batch QR Generator
 */


import {CONFIG} from "./config.js";



export class BatchGenerator {



constructor(){


    this.progress =
    document.getElementById(
        "batchProgress"
    );


}





async generate(file){


    try{


        this.progress.innerHTML =
        "Reading CSV...";



        const csv =
        await file.text();



        const rows =
        this.parseCSV(csv);



        if(rows.length===0){

            throw new Error(
                "CSV is empty"
            );

        }




        const zip =
        new JSZip();



        let completed = 0;




        for(
            const row of rows
        ){



            const canvas =
            await this.createQR(
                row
            );



            const image =
            canvas.toDataURL(
                "image/png"
            )
            .split(",")[1];



            zip.file(

                `qr-${completed+1}.png`,

                image,

                {
                    base64:true
                }

            );



            completed++;



            this.updateProgress(
                completed,
                rows.length
            );


        }





        this.progress.innerHTML =
        "Creating ZIP...";



        const content =
        await zip.generateAsync(
            {
                type:"blob"
            }
        );



        this.downloadZip(
            content
        );



        this.progress.innerHTML =
        "Completed ✔";



    }

    catch(error){


        console.error(error);


        this.progress.innerHTML =
        "Error: "
        +
        error.message;


    }


}







parseCSV(data){


    return data
    .split("\n")
    .map(
        row=>row.trim()
    )
    .filter(
        row=>row.length>0
    );


}







createQR(text){


    return new Promise(
        resolve=>{


            const canvas =
            document.createElement(
                "canvas"
            );



            QRCode.toCanvas(

                canvas,

                text,

                {
                    width:300,
                    height:300
                },


                ()=>{


                    resolve(canvas);


                }

            );



        }
    );


}







updateProgress(
done,
total
){


    const percent =
    Math.round(
        (done/total)*100
    );



    this.progress.innerHTML =

    `
    Generating:
    ${done}/${total}
    (${percent}%)
    `;


}







downloadZip(blob){



    const url =
    URL.createObjectURL(
        blob
    );



    const link =
    document.createElement(
        "a"
    );



    link.href=url;


    link.download =
    "pitol-qr-batch.zip";


    link.click();



    URL.revokeObjectURL(
        url
    );


}


}
