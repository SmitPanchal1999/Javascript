let colors=["rgb(255, 255, 0)","rgb(102, 0, 204)","rgb(153, 51, 51)","rgb(0, 204, 0)","rgb(255, 128, 0)"];
let direction="right";
function onLoadBody(){
    let result;
    result=alert('Greetings Mr. X Please choose the surprise box.');
    
if (result==undefined){
    console.log("hello");
    let box1=document.getElementById("box1");
    box1.innerHTML="Click Me First";
}
changeColor("right");
}

function printBox3(){
    let box3=document.getElementById("box3");
    box3.innerHTML="Oops,something is wrong";
}
let count=0;
function getColor(currentColor){
    console.log(direction,currentColor);
    let current=colors.indexOf(currentColor);
    let nextColor;
    if (direction=="right"){
        if (current==colors.length-1){
            nextColor=colors[0];
        }
        else{
            nextColor=colors[current+1];
        }

    }
    else{
        if (current==0){
            nextColor=colors[colors.length-1]
        }
        else{
            nextColor=colors[current-1];
        }
    } 
    console.log(nextColor);
    return nextColor;
}

function changeColor(){
    let box4=document.getElementById("boxes4");
    let currentColor=box4.style.backgroundColor;
    
    box4.style.backgroundColor=getColor(currentColor)
    
}

setInterval(changeColor,5000);

document.addEventListener('keyup', (e) => {
    console.log("key pressed");
    //left and down
    if (e.code =="ArrowLeft" || e.code=="ArrowDown") {
        direction="left";
        changeColor();
        console.log("direction must be left");
    }
    //right and up
    else if (e.code =="ArrowUp" || e.code=="ArrowRight"){
        direction="right";
        changeColor();
        console.log("direction must be right");
    }
  
    
});