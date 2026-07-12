/**
 * PITOL QR PRO
 * History Manager Module
 */


export class HistoryManager {



    constructor(){


        this.key =
        "pitol_qr_history";


        this.container =
        document.getElementById(
            "historyList"
        );


        this.searchInput =
        document.getElementById(
            "historySearch"
        );


        if(this.searchInput){


            this.searchInput
            .addEventListener(

                "input",

                ()=>this.render()

            );


        }



    }







    get(){



        try{


            return JSON.parse(

                localStorage.getItem(
                    this.key
                )

            ) || [];


        }

        catch(error){


            console.error(
                "History read error:",
                error
            );


            return [];


        }



    }







    save(items){


        localStorage.setItem(

            this.key,

            JSON.stringify(items)

        );


    }








    add(item){



        const history =
        this.get();




        history.unshift(item);




        /*
        Limit storage size
        */


        if(history.length > 100){


            history.pop();


        }





        this.save(history);



    }








    render(){



        if(!this.container){

            return;

        }




        let items =
        this.get();





        /*
        Search filter
        */


        if(
            this.searchInput &&
            this.searchInput.value.trim()
        ){



            const keyword =
            this.searchInput.value
            .toLowerCase();




            items =
            items.filter(

                item=>

                item.content
                .toLowerCase()
                .includes(keyword)

            );



        }






        if(items.length===0){


            this.container.innerHTML =

            `

            <p>
            No history found
            </p>

            `;


            return;


        }







        this.container.innerHTML =

        items.map(

            (item,index)=>


            `

            <div class="history-item">


                <div>


                    <strong>
                    ${this.escape(item.type)}
                    </strong>


                    <p>
                    ${this.escape(item.content)}
                    </p>


                    <small>
                    ${new Date(item.date)
                    .toLocaleString()}
                    </small>


                </div>



                <button
                data-index="${index}"
                class="delete-history">


                Delete


                </button>



            </div>


            `


        ).join("");






        document
        .querySelectorAll(
            ".delete-history"
        )
        .forEach(


            button=>{


                button.onclick = ()=>{


                    this.remove(

                        Number(
                            button.dataset.index
                        )

                    );


                };


            }


        );




    }








    remove(index){



        const items =
        this.get();



        items.splice(

            index,

            1

        );



        this.save(items);


        this.render();



    }









    clear(){



        localStorage.removeItem(
            this.key
        );


        this.render();



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
