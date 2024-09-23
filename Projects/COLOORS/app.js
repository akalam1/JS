//Global selections and variables
const colorDivs = document.querySelectorAll(".color");
const generateBtn = document.querySelector(".generate");
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll(".color h2");
const popup = document.querySelector(".copy-container");
const adjustButton = document.querySelectorAll(".adjust");
const lockButton = document.querySelectorAll(".lock");
const closeAdjustments = document.querySelectorAll(".close-adjustment");
const sliderContainers = document.querySelectorAll(".sliders");
let initialColors;




//functions 


//generate colors 
function generateHex(){

    /*
    So what we beasically doing here is, in RGB Color there only 5 numbers inclusing the hash
    so we defined the hash mnaully and from there we randomly generating a 5 hash nukber to combine a color 
    and then since every hash color needs a hash, we define has to include on every 
    iteration and reurning it with the hash
     we multilying the randomply created number a number 16, so that 
     any genarated nuber stays within 16 which we will use a index to generate apporite number/letetr
     from the given strings
    */
    // const letters = "#0123456789ABCDEF";
    // let hash = "#";
    // for (let i=0; i<6; i++){

    //     hash += letters[Math.floor(Math.random()* 16)];

    // //   console.log( "Letter: "+ letters[Math.floor(Math.random()* 16)]);
    // }
    // return hash;


    // all these can be done in easier way with the help of an framewrok
    //chroma js which will genarte hash for us 

const hexColor = chroma.random();
return hexColor;

}

//looping over the color panels and adding background color and h2 text

function randomColors(){
    colorDivs.forEach((div, index) => {

        /*From here, hextext getting the children of color div
        which is the h2 
        and than we pasting the genrated hex id and useing as bg color 
        for each of the color div
        */
        
        const hexText = div.children[0];
        const randomColor = generateHex();
        // console.log(div);

            //Add the color to the bg

            //here setting each color div background color to the 
            //hash id we genrate above as a background color 
    div.style.backgroundColor = randomColor;
    //showing the hasID of that rgb as well 
    hexText.innerText = randomColor;

    })

}

randomColors();

let getHash = generateHex();
// console.log(getHash)