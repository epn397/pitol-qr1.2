/**
 * PITOL QR PRO
 * QR Generator Module
 */


export class QRGenerator {


    constructor(){

        this.preview =
        document.getElementById(
            "qrPreview"
        );


        this.logo = null;


        const logoInput =
        document.getElementById(
            "logoInput"
        );


        if(logoInput){


            logoInput
            .addEventListener(

                "change",

                event=>{


                    const file =
                    event.target.files[0];


                    if(file){


                        const reader =
                        new FileReader();



                        reader.onload = e=>{


                            this.logo =
                            e.target.result;


                        };



                        reader.readAsDataURL(
                            file
                        );


                    }


                }

            );


        }


    }




    prepareData(
        type,
        value
    ){



        switch(type){



            case "url":


                return value;




            case "wifi":


                return (

`WIFI:T:WPA;
S:${value};
P:;
;`

                );





            case "email":


                return (

`MATMSG:
TO:${value};
SUB:;
BODY:;
;`

                );





            case "phone":


                return (

`TEL:${value}`

                );





            case "vcard":


                return (

`BEGIN:VCARD
VERSION:3.0
FN:${value}
END:VCARD`

                );





            default:


                return value;



        }



    }






    generate(

        type,

        value,

        options={}

    ){



        if(
            !this.preview
        ){

            return;

        }





        this.preview.innerHTML="";





        const data =

        this.prepareData(

            type,

            value

        );







        const canvas =
        document.createElement(
            "canvas"
        );



        this.preview
        .appendChild(
            canvas
        );






        QRCode.toCanvas(

            canvas,

            data,

            {

                width:300,


                margin:2,


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

                    console.error(
                        error
                    );

                }



            }


        );



    }







    clear(){


        if(this.preview){


            this.preview.innerHTML="";


        }


    }




}
