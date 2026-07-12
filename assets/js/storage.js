/**
 * Local Storage Manager
 */


import {CONFIG} from "./config.js";



export class StorageManager {



    static getHistory(){


        const data =
        localStorage.getItem(
            CONFIG.STORAGE_KEY
        );


        return data
        ?
        JSON.parse(data)
        :
        [];

    }





    static saveHistory(item){


        let history =
        this.getHistory();



        history.unshift(item);



        history =
        history.slice(
            0,
            CONFIG.MAX_HISTORY
        );



        localStorage.setItem(

            CONFIG.STORAGE_KEY,

            JSON.stringify(history)

        );


    }





    static clearHistory(){


        localStorage.removeItem(
            CONFIG.STORAGE_KEY
        );


    }




    static saveTheme(theme){


        localStorage.setItem(

            CONFIG.THEME_KEY,

            theme

        );

    }





    static getTheme(){


        return localStorage.getItem(
            CONFIG.THEME_KEY
        );


    }



}
