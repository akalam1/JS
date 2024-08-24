const parent = document.querySelector("#items-parent");
const button = document.querySelector("#button")

//number of itens 

const displayLength = document.querySelector(".NumberofItems b");
console.log(displayLength);

//grab the form 

const UserInput = document.querySelector('.name_input');


//number of items 

const  NumberofItem = parent.children;


button.addEventListener('click', function(event){
    event.preventDefault();
   
   
    const newItem = document.createElement("li");
    newItem.classList.add("item");
    newItem.innerText = UserInput.value;
    UserInput.value = " ";

       parent.appendChild(newItem);

       newItem.addEventListener('click', deleteItem);

    //length
    displayLength.innerText = NumberofItem.length;
    
})

function deleteItem(e){
    e.stopPropagation();
    console.log(e.target);
    e.target.remove();


}


parent.addEventListener('click', function(){
    parent.classList.toggle("fade");

})

