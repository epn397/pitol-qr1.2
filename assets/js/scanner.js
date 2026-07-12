/**
 * PITOL QR PRO
 * QR Scanner Module
 */


export class QRScanner {


    constructor(){


        this.scanner = null;


        this.running = false;


        this.reader =
        document.getElementById(
            "reader"
        );


        this.result =
        document.getElementById(
            "scanResult"
        );



        this.imageInput =
        document.getElementById(
            "scanImage"
        );




        if(this.imageInput){


            this.imageInput
            .addEventListener(

                "change",

                event=>{


                    const file =
                    event.target.files[0];


                    if(file){

                        this.scanImage(file);

                    }


                }

            );


        }



    }





    start(){



        if(this.running){

            return;

        }





        this.scanner =
        new Html5Qrcode(
            "reader"
        );





        this.scanner
        .start(


            {

                facingMode:
                "environment"

            },


            {


                fps:10,


                qrbox:250



            },



            decodedText=>{


                this.showResult(
                    decodedText
                );



                this.stop();


            },



            errorMessage=>{


                // Ignore scanning frame errors

            }


        )



        .then(()=>{


            this.running=true;


        })



        .catch(error=>{


            console.error(

                "Camera start failed:",

                error

            );


        });



    }







    stop(){



        if(
            !this.scanner ||
            !this.running
        ){

            return;

        }





        this.scanner
        .stop()

        .then(()=>{


            this.scanner.clear();


            this.running=false;



        })


        .catch(error=>{


            console.error(

                "Scanner stop error:",

                error

            );


        });



    }









    scanImage(file){



        const scanner =

        new Html5Qrcode(
            "reader"
        );





        scanner
        .scanFile(

            file,

            true

        )

        .then(

            decodedText=>{


                this.showResult(
                    decodedText
                );


                scanner.clear();


            }

        )

        .catch(

            error=>{


                console.error(

                    "Image scan failed:",

                    error

                );


                this.showResult(

                    "No QR code found"

                );


            }

        );



    }








    showResult(text){



        if(!this.result){

            return;

        }




        this.result.innerHTML =

        `

        <strong>
        Result:
        </strong>

        <p>
        ${this.escape(text)}
        </p>

        `;



        localStorage.setItem(

            "lastScan",

            text

        );



    }







    escape(value){


        return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );


    }



}
