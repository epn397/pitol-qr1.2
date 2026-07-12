/**
 * PITOL QR PRO
 * UI Controller Module
 */


export class UIController {



    constructor(){


        this.pages =
        document.querySelectorAll(
            ".page"
        );


        this.navButtons =
        document.querySelectorAll(
            ".nav-btn"
        );


        this.themeKey =
        "pitol_qr_theme";


    }







    initialize(){



        this.setupNavigation();


        this.loadTheme();



    }








    setupNavigation(){



        this.navButtons
        .forEach(

            button=>{


                button.onclick = ()=>{


                    const page =
                    button.dataset.page;


                    this.showPage(
                        page
                    );



                };


            }


        );



    }









    showPage(pageName){



        this.pages
        .forEach(

            page=>{


                page.classList.remove(
                    "active"
                );


            }

        );





        const target =
        document.getElementById(
            pageName
        );





        if(target){


            target.classList.add(
                "active"
            );


        }






        this.navButtons
        .forEach(

            button=>{


                button.classList.remove(
                    "active"
                );


                if(
                    button.dataset.page === pageName
                ){


                    button.classList.add(
                        "active"
                    );


                }


            }

        );



    }









    toggleTheme(){



        const current =
        document.body
        .classList.contains(
            "dark"
        );





        if(current){


            document.body
            .classList.remove(
                "dark"
            );


            localStorage.setItem(

                this.themeKey,

                "light"

            );


        }

        else{


            document.body
            .classList.add(
                "dark"
            );


            localStorage.setItem(

                this.themeKey,

                "dark"

            );


        }



    }








    loadTheme(){



        const saved =
        localStorage.getItem(
            this.themeKey
        );





        if(saved==="dark"){


            document.body
            .classList.add(
                "dark"
            );


        }



    }




}
