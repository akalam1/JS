
const generate = document.querySelector(".generate");
const hitag = document.querySelector("h1");


generate.addEventListener("click", function(){
    // console.log("button clicked ");

fetch("https://api.adviceslip.com/advice")

.then( result => result.json())
.then(data=> {
    console.log(data.slip.advice);

    hitag.innerText = data.slip.advice;

  //  lets create a div to insert data dynamically 
//   const div = document.createElement("p");
//   div.innerHTML = data.slip.advice;
//   hitag.appendChild(div);

})
})

// fetch("https://api.adviceslip.com/advice")

// .then( result => result.json())
// .then(data=> console.log(data));