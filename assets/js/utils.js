/**
 * Global Error Handler
 */


export function handleError(
    error,
    message="Something went wrong"
){


    console.error(
        message,
        error
    );


    const toast =
    document.getElementById(
        "toast"
    );


    if(toast){


        toast.textContent =
        message;


        toast.classList.add(
            "show"
        );


        setTimeout(
            ()=>{

                toast.classList.remove(
                    "show"
                );

            },

            3000

        );


    }


}
