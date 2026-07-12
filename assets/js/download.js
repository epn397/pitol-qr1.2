/**
 * PITOL QR PRO
 * Download Module
 */


export class Downloader {



    static PNG(canvas){



        if(!canvas){

            return;

        }




        const link =
        document.createElement(
            "a"
        );


        link.download =
        "pitol-qr.png";



        link.href =
        canvas.toDataURL(
            "image/png"
        );



        link.click();



    }






    static SVG(canvas){



        if(!canvas){

            return;

        }



        const image =
        canvas.toDataURL(
            "image/png"
        );



        const svg =

`<svg xmlns="http://www.w3.org/2000/svg"
width="${canvas.width}"
height="${canvas.height}">

<image
href="${image}"
width="${canvas.width}"
height="${canvas.height}" />

</svg>`;





        const blob =
        new Blob(

            [
                svg
            ],

            {
                type:
                "image/svg+xml"
            }

        );




        const url =
        URL.createObjectURL(
            blob
        );




        const link =
        document.createElement(
            "a"
        );


        link.download =
        "pitol-qr.svg";



        link.href =
        url;



        link.click();



        URL
        .revokeObjectURL(
            url
        );



    }







    static PDF(canvas){



        if(!canvas){

            return;

        }





        if(
            typeof jsPDF === "undefined"
        ){


            console.error(

                "jsPDF library missing"

            );


            return;


        }






        const image =
        canvas.toDataURL(
            "image/png"
        );





        const pdf =
        new jsPDF();





        pdf.addImage(

            image,

            "PNG",

            15,

            15,

            180,

            180

        );




        pdf.save(

            "pitol-qr.pdf"

        );



    }



}
