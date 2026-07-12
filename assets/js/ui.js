/**
 * PITOL QR PRO
 * User Interface Controller
 */


import {StorageManager} from "./storage.js";



export class UIController {



constructor(){


    this.pages =
    document.querySelectorAll(
        ".page"
    );


    this.buttons =
    document.querySelectorAll(
        ".nav-btn"
    );



}





initialize(){


    this.buttons.forEach(
        button=>{


            button.onclick =
            ()=>{


                this.openPage(
                    button.dataset.page
                );


            };


        }
    );



    this.loadTheme();



}






openPage(name){


    this.pages.forEach(
        page=>{


            page.classList.remove(
                "active"
            );


        }
    );



    document
    .getElementById(name)
    .classList.add(
        "active"
    );



    this.buttons.forEach(
        btn=>{


            btn.classList.toggle(

                "active",

                btn.dataset.page===name

            );


        }
    );


}







toggleTheme(){


    document.body
    .classList.toggle(
        "dark"
    );



    const mode =
    document.body.classList.contains(
        "dark"
    )
    ?
    "dark"
    :
    "light";



    StorageManager.saveTheme(
        mode
    );


}






loadTheme(){


    const theme =
    StorageManager.getTheme();



    if(theme==="dark"){


        document.body
        .classList.add(
            "dark"
        );


    }



}





toast(message){


    const box =
    document.getElementById(
        "toast"
    );



    box.textContent =
    message;



    box.classList.add(
        "show"
    );



    setTimeout(
        ()=>{


            box.classList.remove(
                "show"
            );


        },
        2000
    );


}



}
