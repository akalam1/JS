class DrumpKit{
    constructor(){
        //first we going to get all the pads 
        this.pads= document.querySelectorAll(".pad");

        // thne selecting the play buttons 
        this.playButton = document.querySelector('.play')

        //now grabbing all the audi tags from the buttom of the page

        this.kickAudio = document.querySelector(".kick-sound");
        this.kickAudio = document.querySelector(".snare-sound");
        this.kickAudio = document.querySelector(".hihat-sound");
        this.bpm=130;
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

    //check if the bar is active then play the svongs 

    if (bar.classList.contains('active')){
        //check which group bar is active to play specific song for each track
        if (bar.classList.contains('kick-pad')){
            this.kickAudio.play();
        }
        if (bar.classList.contains('snare-pad')){
            this.snareAudio.play();
        }
        if (bar.classList.contains('hihat-pad')){
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
        setInterval(() => {
        this.repeat();

    }, interval)

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
drumpkit.start();

}
);