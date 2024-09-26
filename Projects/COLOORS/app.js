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



//event listener


//sdding event lister for sliders to change the color 
sliders.forEach(slider=>{
    slider.addEventListener("input", hslControls );
})

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

    //check for contrast 
    checkContrast(randomColor, hexText)

    //initial colorize sliders 
    const color = chroma(randomColor);
    // this is gettijng all the sliders input, such as hue,brightnerss, saturataion
    const sliders = div.querySelectorAll(".sliders input");
    // console.log(sliders);
    // selecting all the inputs ansd setting them 

    const hue = sliders[0];
    // console.log(hue);
    const brightnerss = sliders[1];
    const saturation = sliders[2];

    // now lets create a function to chnage a color of the panel according to theg sliders 

    colorizeSliders(color,hue, brightnerss, saturation);


    })

}

//check text contrast 
function checkContrast( color, text){

    // with help of chromajs we'll loop over and check how bright the color of each
    //tab is, goes up to 9
// iof its brighter thne .5, then the text needs to be dark but it will be too bright to 
// see and otherwise white 

//so leyts get the color contrast number 
const luminance = chroma(color).luminance();
if (luminance >.5){
    text.style.color = "black";

}else{
    text.style.color = "white";


}

}

//to control the color of each tab by sliders 

function colorizeSliders(color,hue, brightnerss, saturation){

    // with the help of chroma we can manage colors such as schaning them by sliders according
    //to our needs, checkout chroma tab for more info

// so here we setting the saturation of each color based on chroma doc 
// whereas 0 being the  no sat and 1 being the high, seting max nd min in a way
    const noSat = color.set("hsl.s", 0);
    const fullSat = color.set("hsl.s", 1);
    const midbright = color.set("hsl.l", .5)

    //scalling the sataration 
    const scaleSat = chroma.scale([noSat, color, fullSat])
    //setting the background color of that scale as the scale, so we can adjust it accoridngly 
    saturation.style.backgroundImage = `linear-gradient(to right, ${scaleSat(0)}, ${scaleSat(1)})`;


    // brightness 
    //setting the scale 
    const scalebright = chroma.scale(["black", midbright, "white" ])
    brightnerss.style.backgroundImage = `linear-gradient(to right, ${scalebright(0)}, ${scalebright(1)})`;

// hue 
// hue gets all the color and then we adjust the brigt and sat of hue 

hue.style.backgroundImage = `linear-gradient(to right, rgb(204,75,75),rgb(204,204,75),rgb(75,204,75),rgb(75,204,204),rgb(75,75,204),rgb(204,75,204),rgb(204,75,75))`;



}

// function for even lister to chnageclolrs 

function hslControls(e){
    // console.log(e);

    //now lets get tghe each sliders using the dataset we set earlier in html
    // basically we numbered each tab accoridigly such 0,1,2,3,4,etc
   // basiccaly it tells us which tab we clicked 
    const index= e.target.getAttribute("data-bright") ||
     e.target.getAttribute("data-sat") ||
      e.target.getAttribute("data-hue");
    // basiccaly it tells us which tab we clicked 
    // console.log(index);

    let sliders = e.target.parentElement.querySelectorAll('input[type="range"]');
    // console.log(sliders);

    //as above, lets get all three 
    const hue = sliders[0];
    const brightness = sliders[1];
    const saturation = sliders[2];


    const bgColor = colorDivs[index].querySelector("h2").innerText;
console.log(bgColor);

let color = chroma(bgColor)

.set("hsl.s", saturation.value)
.set("hsl.l", brightness.value)
.set("hsl.h", hue.value);
colorDivs[index].style.backgroundColor = color;

}

//Calling the functions 


randomColors();
let getHash = generateHex();
// console.log(getHash)
