/**
 * PITOL QR PRO
 * Batch QR Generator Module
 */


export class BatchGenerator {



    constructor(){


        this.progress =
        document.getElementById(
            "batchProgress"
        );


    }







    async generate(file){



        if(!file){

            return;

        }





        if(
            typeof JSZip === "undefined"
        ){


            console.error(

                "JSZip library missing"

            );


            return;


        }






        const text =
        await file.text();





        const rows =
        this.parseCSV(text);





        if(rows.length===0){


            this.show(
                "No data found"
            );


            return;


        }






        const zip =
        new JSZip();





        let completed = 0;





        for(
            const row of rows
        ){



            const canvas =
            document.createElement(
                "canvas"
            );





            await QRCode.toCanvas(

                canvas,

                row,


                {


                    width:300,


                    margin:2


                }


            );





            const image =
            canvas
            .toDataURL(
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



            this.show(

                `Generated ${completed}/${rows.length}`

            );



        }








        const content =
        await zip.generateAsync(

            {

                type:"blob"

            }

        );







        const url =
        URL.createObjectURL(
            content
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




        this.show(
            "Batch completed"
        );



    }









    parseCSV(data){



        return data

        .split(/\r?\n/)

        .map(

            row=>

            row.trim()

        )

        .filter(

            row=>

            row.length>0

        );



    }









    show(message){



        if(this.progress){


            this.progress.innerHTML =

            message;


        }



    }




}
