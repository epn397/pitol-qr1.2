/**
 * Utility Functions
 */


export function generateID(){

    return crypto.randomUUID();

}



export function formatDate(date){

    return new Intl.DateTimeFormat(
        "en-US",
        {
            dateStyle:"medium",
            timeStyle:"short"
        }

    ).format(date);

}





export function downloadFile(
    content,
    filename,
    type
){


    const blob =
        new Blob(
            [content],
            {
                type:type
            }
        );


    const url =
        URL.createObjectURL(blob);



    const a =
        document.createElement("a");


    a.href=url;

    a.download=filename;


    a.click();


    URL.revokeObjectURL(url);


}





export function readFile(file){


    return new Promise(
        resolve=>{


            const reader =
            new FileReader();


            reader.onload =
            ()=>resolve(reader.result);


            reader.readAsDataURL(file);


        }
    );

}
