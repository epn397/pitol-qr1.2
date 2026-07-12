addLogo(
canvas,
image
){


const ctx =
canvas.getContext("2d");


const logo =
new Image();


logo.onload =
()=>{


const size =
canvas.width * 0.22;


ctx.drawImage(

logo,

(canvas.width-size)/2,

(canvas.height-size)/2,

size,

size

);


};



logo.src=image;


}
