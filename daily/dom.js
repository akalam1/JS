
//grabbing the ul parent tg
const ulparent = document.getElementById("todo-list");

//grabbing a tag by its class name 
const items = document.getElementsByClassName("item")

console.log(items)


//adding another item using js

const item3 = document.createElement("li");
const item3txt = document.createTextNode("Item 3");

// //add the new item to a class
// item3.classList.add("item");
// item3.appendChild(item3txt);
// ulparent.appendChild(item3);

// const item4 = document.createElement("li");
// const item4txt = document.createTextNode("Item 4");

// //add the new item to a class
// item4.classList.add("item");
// item4.appendChild(item4txt);
// ulparent.appendChild(item4);


//lets create a loop to add a bunch of list 


for (let i =1; i<=8; i++){
    const infinittag = document.createElement("ul")
    const ulinnerTXT = document.createTextNode(`The new item number is: ${i}`)

    //lets add a Class so we can get the number itenms in there

    infinittag.classList.add("item");
    infinittag.appendChild(ulinnerTXT);

    //now lets insert into parent tag

    ulparent.appendChild(infinittag)

}

///getting the length of a tag
const lengths = document.getElementsByClassName("item").length;
console.log("Length is: " +lengths)


//inser a length into html using DOM

const h2Tag = document.getElementById("lengthOflist");
h2Tag.innerHTML = lengths;
