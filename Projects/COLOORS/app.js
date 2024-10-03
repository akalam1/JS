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
// let initialColors;



// for local storage 
let savedPalettes = [];


//event listener

//generate colors 
generateBtn.addEventListener("click", randomColors);
//sdding event lister for sliders to change the color 
sliders.forEach(slider=>{
    slider.addEventListener("input", hslControls );
})

//updare the hashid for h2
colorDivs.forEach((div, index) =>{
    div.addEventListener("change", ()=> {
        updatetextUi(index);
    });

});

//copy to clipboard 
currentHexes.forEach(hex => {
    hex.addEventListener('click', () => {
        copyToClipboard(hex);
    })
})

//remove popup
popup.addEventListener("transitionend", ()=>{
    const popupBox = popup.children[0];

    popup.classList.remove("active");
    popupBox.classList.remove("active");
    
})

// adjust button for open controls panel 

adjustButton.forEach((button,index) => {
    button.addEventListener('click', ()=>{
        openadjustmentPanel(index);
    })
})

//close adjustment button
closeAdjustments.forEach((button, index)=>{
    button.addEventListener('click', ()=>{
        closeadjustmentPanel(index);
    })
})


// lockButton locking it 

lockButton.forEach((button, index)=>{
    button.addEventListener('click', e =>{
        lockLayer(e,index);
    })
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
//ceatinbg a empty array to save the color 
    initialColors = [];
    colorDivs.forEach((div, index) => {

        /*From here, hextext getting the children of color div
        which is the h2 
        and than we pasting the genrated hex id and useing as bg color 
        for each of the color div
        */
        
        const hexText = div.children[0];
        const randomColor = generateHex();
        // console.log(div);

// console.log(chroma(randomColor).hex());
        //saving the generated hgex to an array
        // initialColors.push(chroma(randomColor).hex());
        if (div.classList.contains("locked")) {
            initialColors.push(hexText.innerText);
            return;
          } else {
            initialColors.push(chroma(randomColor).hex());
          }

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


    });

    resetInputs();

      //Check For Button Contrast
  adjustButton.forEach((button, index) => {
    checkContrast(initialColors[index], button);
    checkContrast(initialColors[index], lockButton[index]);
  });

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


    // const bgColor = colorDivs[index].querySelector("h2").innerText;
    //passing the saved array color values we stored earlier 
    const bgColor = initialColors[index];
// console.log(bgColor);

let color = chroma(bgColor)

.set("hsl.s", saturation.value)
.set("hsl.l", brightness.value)
.set("hsl.h", hue.value);
colorDivs[index].style.backgroundColor = color;


//colorized input/sliders update 

colorizeSliders(color, hue, brightness, saturation);
}


//updating textUI
function updatetextUi(index){
/// this getting the index of each color div whneever we clikc on each div, it pulls the whole div
    const activeDiv = colorDivs[index];
    // console.log( activeDiv);
// this getting the background color of the deiv that was set by chroma
    const color = chroma(activeDiv.style.backgroundColor);
    // console.log(color)

    //this getting h2 tag
    const textHex = activeDiv.querySelector("h2");
    // console.log(textHex);
    const icons = activeDiv.querySelectorAll(".controls button");
    // console.log(icons);

    //seeting the h2 tag to represet chroma hash# andf add it to dynamically whenevr we slides
    textHex.innerText = color.hex();

    //update contrast
    checkContrast(color, textHex);
//update icons as well

for (icon of icons){
    checkContrast(color, icon);
}
}


function resetInputs(){

    // this gets all the input tag of sliders 
    const sliders = document.querySelectorAll(".sliders input");
    // console.log(sliders);

    sliders.forEach(slider =>{
        // console.log(slider);
        if (slider.name === "hue"){
            const hueColor = initialColors[slider.getAttribute("data-hue")];
            // console.log(hueColor)
            const hueValue = chroma(hueColor).hsl()[0];
            // console.log(hueValue);
            slider.value = Math.floor(hueValue);
        }
        if (slider.name === "brightness") {
            const brightColor = initialColors[slider.getAttribute("data-bright")];
            const brightValue = chroma(brightColor).hsl()[2];
            slider.value = Math.floor(brightValue * 100) / 100;
          }

       
        if (slider.name === "saturation"){
            const satColor = initialColors[slider.getAttribute("data-sat")];
            // console.log(hueColor)
            const satValue = chroma(satColor).hsl()[1];
            // console.log(hueValue);
            slider.value = Math.floor(satValue * 100) / 100;
        }
        
    });

    }


    //copy to clipbiard texts

   function  copyToClipboard(hex){

/**
 * what this function does is basically it copies and paste texts 
 * fisrt we create a empty text area to save the hex 
 * then use "select " and execCommand to copy the text and then ofc paste 
 */
    //creating a text area to save copied h2 and then pasting it
    const el = document.createElement("textarea");
    el.value = hex.innerText;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");

document.body.removeChild(el);

  //Pop up animation
  const popupBox = popup.children[0];
  popup.classList.add("active");
  popupBox.classList.add("active");



   }

   //open adjustment panle

   function openadjustmentPanel(index){
//this will make the panel active once clided on toggle button
    sliderContainers[index].classList.toggle("active");

   }

   //close panle by pressing x 

   function closeadjustmentPanel(index){
    //this will make the panel active once clided on toggle button
        sliderContainers[index].classList.remove("active");
    
       }


       //locking the lock

       function lockLayer(e, index) {
        const lockSVG = e.target.children[0];
        const activeBg = colorDivs[index];
        activeBg.classList.toggle("locked");
      
        if (lockSVG.classList.contains("fa-lock-open")) {
          e.target.innerHTML = '<i class="fas fa-lock"></i>';
        } else {
          e.target.innerHTML = '<i class="fas fa-lock-open"></i>';
        }
      }




      // save to pallet and LOCAL STORAGE 
      //getting the actual save button
      const saveBtn = document.querySelector(".save");
      const submitSave = document.querySelector(".submit-save");
      const closeSave = document.querySelector(".close-save");
      const saveContainer = document.querySelector(".save-container");
      const saveInput = document.querySelector(".save-container input");
      const libraryContainer = document.querySelector(".library-container");
      const libraryBtn = document.querySelector(".library");
      const closeLibraryBtn = document.querySelector(".close-library");


//event listener 
saveBtn.addEventListener('click', openPalette);
closeSave.addEventListener("click", closePalette);
submitSave.addEventListener("click", savePalette);
libraryBtn.addEventListener('click', openLibrary )
closeLibraryBtn.addEventListener('click',  closeLibrary)


function openPalette(e){
    const popup = saveContainer.children[0];
    saveContainer.classList.add("active");
    popup.classList.add("active");
}

function closePalette(e){
    const popup = saveContainer.children[0];
    saveContainer.classList.remove("active");
    popup.classList.add("active");
}

//saving colors pallet
function savePalette(e) {
    saveContainer.classList.remove("active");
    popup.classList.remove("active");
    const name = saveInput.value;
    const colors = [];
    currentHexes.forEach(hex => {
      colors.push(hex.innerText);
    });

    let paletteNr =  savedPalettes.length;

    // let paletteNr;
    // const paletteObjects = JSON.parse(localStorage.getItem("palettes"));
    // if (paletteObjects) {
    //   paletteNr = paletteObjects.length;
    // } else {
    //   paletteNr = savedPalettes.length;
    // }



    const paletteObj = {name, colors, nr:paletteNr};
    savedPalettes.push(paletteObj);

    // console.log( savedPalettes)
    //save to local

    savetoLocal(paletteObj)
    saveInput.value = "";

    //generating a liberary of clors after saving it 
    const palette = document.createElement('div');
    palette.classList.add("custom-palette");
    const title = document.createElement("h4");
    title.innerText = paletteObj.name;

    // console.log(paletteObj.name)
    const preview = document.createElement("div");
    preview.classList.add("small-preview");
    paletteObj.colors.forEach(smallColor=>{
        const smallDiv = document.createElement("div");
        smallDiv.style.backgroundColor = smallColor;
        preview.appendChild(smallDiv);   
    });

    const paletteBtn = document.createElement('button');
    paletteBtn.classList.add('pick-palette-btn');
    paletteBtn.classList.add(paletteObj.nr);
    paletteBtn.innerText = "Select";

    //coping the colors from teh saved liberary and then  pasting ot the main colors div

    paletteBtn.addEventListener("click", e =>{
        closeLibrary();
        const paletteIndex = e.target.classList[1];
        // console.log(paletteIndex);

        initialColors = [];
        savedPalettes[paletteIndex].colors.forEach((color,index)=>{
            initialColors.push(color);
            colorDivs[index].style.backgroundColor = color;
            const text = colorDivs[index].children[0];

            checkContrast(color, text);
            updatetextUi(index);
        })

        resetInputs();
    })

    //append to library

palette.appendChild(title);
palette.appendChild(preview);
palette.appendChild(paletteBtn);

//append to the main libraray
libraryContainer.children[0].appendChild(palette);




}

function savetoLocal (paletteObj){
  let  localpalettes;
    if (localStorage.getItem("palettes") === null){
        localpalettes = [];
    }else{
        localpalettes = JSON.parse(localStorage.getItem("palettes"));
    }

    localpalettes.push(paletteObj);
    localStorage.setItem("palettes", JSON.stringify(localpalettes));

}

function openLibrary(){
    const popup = libraryContainer.children[0];
    libraryContainer.classList.add('active');
    popup.classList.add('active')
}
function closeLibrary(){
    const popup = libraryContainer.children[0];
    libraryContainer.classList.remove('active');
    popup.classList.remove('active')
}





// getting saved libarary from local 
function getLocal(){
    if (localStorage.getItem("palettes") === null){
        localpalettes = [];

    }else{
        const paletteObjects = JSON.parse(localStorage.getItem("palettes"));
        paletteObjects.forEach(paletteObj =>{

                //generating a liberary of clors after saving it 
    const palette = document.createElement('div');
    palette.classList.add("custom-palette");
    const title = document.createElement("h4");
    title.innerText = paletteObj.name;

    // console.log(paletteObj.name)
    const preview = document.createElement("div");
    preview.classList.add("small-preview");
    paletteObj.colors.forEach(smallColor=>{
        const smallDiv = document.createElement("div");
        smallDiv.style.backgroundColor = smallColor;
        preview.appendChild(smallDiv);   
    });

    const paletteBtn = document.createElement('button');
    paletteBtn.classList.add('pick-palette-btn');
    paletteBtn.classList.add(paletteObj.nr);
    paletteBtn.innerText = "Select";

    //coping the colors from teh saved liberary and then  pasting ot the main colors div

    paletteBtn.addEventListener("click", e =>{
        closeLibrary();
        const paletteIndex = e.target.classList[1];
        // console.log(paletteIndex);

        initialColors = [];
        paletteObj[paletteIndex].colors.forEach((color,index)=>{
            initialColors.push(color);
            colorDivs[index].style.backgroundColor = color;
            const text = colorDivs[index].children[0];

            checkContrast(color, text);
            updatetextUi(index);
        })

        resetInputs();
    })

    //append to library

palette.appendChild(title);
palette.appendChild(preview);
palette.appendChild(paletteBtn);

//append to the main libraray
libraryContainer.children[0].appendChild(palette);
            

        })
    }
}

// localStorage.clear();


getLocal()

randomColors();
let getHash = generateHex();
// console.log(getHash)
