/**
 * QR Download Manager
 */


export class Downloader {



static PNG(canvas){


    const link =
    document.createElement("a");


    link.download =
    "pitol-qr.png";


    link.href =
    canvas.toDataURL();


    link.click();


}





static SVG(){


    alert(
        "SVG export module ready"
    );


}





static PDF(){


    alert(
        "PDF export module ready"
    );


}


}
