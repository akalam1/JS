class DrumpKit{
    constructor(){
        //first we going to get all the pads 
        this.pads= document.querySelectorAll(".pad");

        // thne selecting the play buttons 
        this.playButton = document.querySelector('.play')

        //now grabbing all the audi tags from the buttom of the page

        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio= document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");

        // now we are going to grab all the sounds tracks 
        this.currentKick = "./sounds/kick-classic.wav";
        this.currentSnare = "./sounds/snare-acoustic01.wav";
        this.currentHihat = "./sounds/hihat.acoustic01.wav";


        //now lets selct the mute button 
        this.muteButtons = document.querySelectorAll(".mute");
        // console.log(this.muteButtons);

        //temp slider 
        this.tempSlider = document.querySelector(".tempo-slider")
/// now lets selects all the selects opotions/drppdown from the list
        this.selects = document.querySelectorAll('select');
        // console.log(this.selects);

        this.bpm=130;
        this.isPlaying = null;

//counter
        this.index = 1;

    }

    activePad(){
this.classList.toggle("active");    }

    //createing  repeat method to loop over all the beats 
    repeat(){

        // what this reminder does it, the number remains same till it hists 
        //8, once 8, the remider becomes 0, and it start over again
        let steps = this.index % 8;
        // console.log("The answer is: "+steps)

        // now lets use this method grab all the this.pads, such as b0,1,2,3..

        const activeBars = document.querySelectorAll(`.b${steps}`)
// lets loop over each pads 

activeBars.forEach(bar=>{
    bar.style.animation= `playTrack 0.3s alternate ease-in-out 2`;
// console.log(bar);
    //check if the bar is active then play the svongs 

    if (bar.classList.contains('active')){
        //check which group bar is active to play specific song for each track
        if (bar.classList.contains('kick-pad')){
            this.kickAudio.currentTime = 0;
            this.kickAudio.play();
        }
        if (bar.classList.contains('snare-pad')){
            this.snareAudio.currentTime = 0;

            this.snareAudio.play();
        }
        if (bar.classList.contains('hihat-pad')){
            this.hihatAudio.currentTime = 0;

            this.hihatAudio.play();
        }
    }
})
        // console.log(activeBars);
        this.index++;
    }



    // interval its a like a loop but rather it just keeps running after the time/sec is defined 
    // so if yiu would like ot run in every 1 mins, it will do so constantly untill stopped


    start(){ 
        // insteda of using manual number at the buttom, we can use bmp to control the beats timing of how fast 
        const interval = (60/this.bpm)   * 1000;    
        
        // check if its playing beats 
        // essentially we are trying to co trol the beats by the play button,means whne we press play it shoud play, 
        // if press play button again, it shoud stop

if (!this.isPlaying){
    //if this isnt playing, it will play and aasign a number to interval
      this.isPlaying =  setInterval(() => {
        this.repeat();

    }, interval);
}else{

    //clear the intervals 
    clearInterval(this.isPlaying);
    this.isPlaying = null;
}
//checking interval value 
    // console.log("res: "+this.isPlaying)

    }

    updatePlaybutton(){

        // if this has a velue means its playing, 
        //if its null means not playing which will move it to else statement 
        if (!this.isPlaying){
            //if this has a vule and not null means its playing and will replace the text to "STOP"
            this.playButton.innerText = "Stop";
            this.playButton.classList.add("active");

        }else{
            this.playButton.innerText = "Play";
            this.playButton.classList.remove("active");
        }
    }

    changeSound(e){
        // console.log(e)
        //lets select each song name 
        const slectionName = e.target.name;
        const slectionValue = e.target.value;
    
        // console.log(slectionName);
        // console.log(slectionValue);
// now lets switch over the sounds from the selecte 

switch(slectionName){

    case "kick-select":
        this.kickAudio.src = slectionValue;
        break;
    case"snare-select":
            this.snareAudio.src = slectionValue;
            break;

    case "hihat-select":
                this.hihatAudio.src = slectionValue;
                break;

}


    }

    //mute buttons 

    mutee(e){
        // console.log(e.target);

      //  we set data track in html so we can track on which mute button we clikcing on
        const muteindex = e.target.getAttribute('data-track');
        // console.log(muteindex)

        e.target.classList.toggle("active")

        // no3w we are goibg to mute each track 
if (e.target.classList.contains("active")){
    switch (muteindex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
      }
    } else {
      switch (muteindex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
          break;
      }
    }       
    }

    changeTempo(e){
// basically using thi, we'll get temp number and and then update/display them accordingly to the bar

const tempText = document.querySelector(".tempo-nr");
this.bpm = e.target.value;
// console.log(this.bpm)

// updating tempo text
tempText.innerText = e.target.value;
    }

    updateTemp(e){
        this.bpm = e.target.value;
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playBtn = document.querySelector(".play");
        if (playBtn.classList.contains("active")) {
          this.start();
        }

    }

    }



// lets call the class now 
const drumpkit = new DrumpKit();




// grabbing each pads to be highlisted/acrive whne clicked 

drumpkit.pads.forEach(pad=> {
    pad.addEventListener('click', drumpkit.activePad);
    pad.addEventListener('animationend', function(){
        this.style.animation = "";
    })

});

drumpkit.playButton.addEventListener('click', function(){
    drumpkit.updatePlaybutton();
drumpkit.start();

}
);

//looping over all the selects and adding a method ot swithc them 
drumpkit.selects.forEach(select=> {
//   console.log(select);
select.addEventListener("change", function(e){
// console.log(e.target)
drumpkit.changeSound(e);

})

})


//now lets create a loop for mutebutton so we cann grab all accordingly 
//and run functions to mute it 


drumpkit.muteButtons.forEach(muBtn=>{

    muBtn.addEventListener('click', function(e){
        drumpkit.mutee(e);
    })
    // console.log(muBtn)

})


//for tempo

drumpkit.tempSlider.addEventListener('input', function(e){

    drumpkit.changeTempo(e);

})
drumpkit.tempSlider.addEventListener('change', function(e){

    drumpkit.updateTemp(e);

})