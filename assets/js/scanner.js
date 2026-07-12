/**
 * QR Scanner Module
 */


export class QRScanner {



constructor(){


    this.scanner=null;


}





start(){



    if(this.scanner)
    return;



    this.scanner =
    new Html5Qrcode(
        "reader"
    );




    this.scanner.start(

        {
            facingMode:"environment"
        },


        {
            fps:10,
            qrbox:250
        },


        result=>{


            document
            .getElementById(
                "scanResult"
            )
            .innerHTML=result;


        }

    );


}






stop(){


    if(!this.scanner)
    return;



    this.scanner.stop()
    .then(()=>{


        this.scanner.clear();

        this.scanner=null;


    });


}


}
