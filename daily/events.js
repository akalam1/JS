const list_parent = document.getElementById("items-parent");

const itemsss = document.getElementsByClassName("item")

//button
const button = document.getElementById("button");


list_parent.addEventListener('click', function(){

 console.log("Parents div was clicked")


})

button.addEventListener('click', function(){
    console.log('buttons was clicked ')

})




// // //lets get the button and the div where we would be inserting the message 
// // //lets get the ul list so we add item on every click 

// //the ULIST group
// const uiList = document.getElementById("todo-list")
// //button
// const button = document.getElementById("button");
// //h2 tag 
// const displaylength = document.querySelector(".numOfList ")
// //item class
// const numberofItem = document.getElementsByClassName("item");

// // // console.log(displaylength)


// // // lets add event listenr with a function

// // button.addEventListener('click', function(event){
// //     //sending a message when button was clicked 


// //     const litag = document.createElement("li");
// //     litag.classList.add("item")
// //     const innerT = document.createTextNode(`item  ${numberofItem.length+1}`);

// //     litag.appendChild(innerT);
// //     uiList.appendChild(litag)
// //    console.log("Added another list ")
   
// // // const num = uiList.childElementCount;
// // displaylength.innerHTML = numberofItem.length;

// // // console.log("Number of list " + numberofItem.length);
// // // messagediv.innerHTML = "Button was clicked ";

// //     // console.log('Event Type: ', event.type);
// //     // console.log('Event Traget: ', event.target);
// //     // console.log("Event Details: ", event.detail);
 
// // });

// button.addEventListener('click', function(){

// displaylength.style.color = 'Red'
// displaylength.style.fontSize = '50px'

// })

