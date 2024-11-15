let controller;
let slideScene;
// let pageScene;
// let detailScene;


function animateSlides() {
    // Init controller
//set the controller 

controller = new ScrollMagic.Controller();

const sliders = document.querySelectorAll(".slide");
const nav = document.querySelector(".nav-header");


  // loop over each slide
  sliders.forEach((slide, index, slides)=> {
    // console.log(slide)
    const revealImg = slide.querySelector(".reveal-img");
    // console.log(revealImg);
    const img = slide.querySelector("img");
    // console.log(img);
    const revealText = slide.querySelector(".reveal-text");
    // console.log(revealText);

    // gsap.to(revealImg,1,{x:'100%'})
    // gsap.to(img, 1,{scale: 2})

    const slideT1 = gsap.timeline({
        defaults: { duration: 1, ease: "power2.inOut" },
      });
      slideT1.fromTo(revealImg, { x: "0%" }, { x: "100%" });
      slideT1.fromTo(img, { scale:2 }, {scale:1});
      slideT1.fromTo(revealText,{x:0}, {x:"100%"}, "-=0.75");
      slideT1.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5");

      //create a scene 
slideScene = new ScrollMagic.Scene({

  triggerElement: slide,
  triggerHook: 0.25,
  reverse: false
})
.setTween(slideT1)
.addIndicators({
  colorStart: "white",
  colorTrigger: "white",
  name: "slide",
})
.addTo(controller);

//new animation


    });

}

animateSlides();
