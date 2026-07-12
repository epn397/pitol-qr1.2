/**
 * PITOL QR PRO
 * History Management
 */


import {StorageManager} from "./storage.js";

import {formatDate} from "./utils.js";



export class HistoryManager {



constructor(){


    this.container =
    document.getElementById(
        "historyList"
    );


}




render(){


    const items =
    StorageManager.getHistory();



    this.container.innerHTML="";



    if(items.length===0){


        this.container.innerHTML =
        `
        <p class="text-center">
        No QR history available
        </p>
        `;


        return;

    }





    items.forEach(item=>{


        const card =
        document.createElement(
            "div"
        );


        card.className =
        "history-item";



        card.innerHTML =
        `

        <strong>
        ${item.content}
        </strong>


        <p>
        ${formatDate(
            new Date(item.created)
        )}
        </p>


        <button data-id="${item.id}">
        Delete
        </button>

        `;



        card
        .querySelector("button")
        .onclick =
        ()=>this.delete(item.id);



        this.container.appendChild(
            card
        );


    });



}





delete(id){


    let history =
    StorageManager.getHistory();



    history =
    history.filter(
        item=>item.id!==id
    );



    localStorage.setItem(

        "pitol_qr_history",

        JSON.stringify(history)

    );



    this.render();


}





clear(){


    StorageManager.clearHistory();

    this.render();


}


}
