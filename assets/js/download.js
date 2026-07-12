/**
 * PITOL QR PRO
 * Export Manager
 */


export class Downloader {



static PNG(canvas){


    const link =
    document.createElement("a");


    link.download =
    "pitol-qr.png";


    link.href =
    canvas.toDataURL(
        "image/png"
    );


    link.click();


}





static SVG(canvas){



    const image =
    canvas.toDataURL();



    const svg =

`
<svg xmlns="http://www.w3.org/2000/svg">

<image href="${image}"
width="${canvas.width}"
height="${canvas.height}"/>

</svg>
`;



    const blob =
    new Blob(
        [svg],
        {
            type:"image/svg+xml"
        }
    );



    const url =
    URL.createObjectURL(blob);



    const link =
    document.createElement("a");


    link.href=url;


    link.download =
    "pitol-qr.svg";


    link.click();


}





static PDF(canvas){



    const pdf =
    new jspdf.jsPDF();



    const image =
    canvas.toDataURL(
        "image/png"
    );



    pdf.addImage(

        image,

        "PNG",

        40,

        40,

        120,

        120

    );



    pdf.save(
        "pitol-qr.pdf"
    );


}



}
