

// let fruits = ['Apple', 'Banana', 'Mango']
// let morefruits = ['jam', 'Strawberry' ];
// morefruits.unshift("kiwi")
// fruits.shift();

// fruits.push("APPLE");

// let allfruits = fruits.concat(morefruits);


// console.log("First list Fruits Array: " + fruits)
// console.log("Second list of fruits: " + morefruits)
// console.log ("Combined arrays: " + allfruits
// )

// console.log(allfruits.length);


// // reference Array 
// let fruits = ['Apple', 'Banana', 'Mango']
// let morefruits = fruits;
// morefruits.push("carrot")


// fruits.forEach(function(item, index){
//     console.log(index, item, index) ;

// })

// console.log("Fruits Array: " + fruits);
// console.log(morefruits)

// objects 

// const person = {
//     name: "Abul",
//     tweets: 20,
//     Age: 25


// };



// const newPerson = person;

// newPerson.Age = 29;
// console.log(newPerson)


// const message = [
//     'Hello Ab',
//     'How is it going',
//     'Hope all is well',
//     'What on your mind today',
//     'week',
//     'Coke'

// ]

//MAPPP in js 
//make a a copy without making changes to the main one 
// const newMessage = message.map(function (m){
//     return m.toUpperCase();
// })
// console.log(newMessage)



//FINDD
//looks for specific keywoard that is provided and return the whole string/sentance 
//returns the fist matc hed string 

// const findWord = message.find(function (video){
//     return video.includes("mind");
// })

// console.log("This is the sentance: " +findWord)


//FILTER
// it filters out specific length you specififed 

// const shortSearched = message.filter(function(video){

//     // this will return all the string that is less than 6
//     return video.length < 10;
// })

// console.log(shortSearched);


// const videos = [

//     "Prak gone wrong ",
//     "JavaScript",
//     "html basics ",
//     "java",
//     "Sping Boot"
// ]

// const games = [
//     {title: "Cricket", rating: 9.1},
//     {title: "Soccer", rating: 8.7},
//     {title: "Vollybal", rating: 10},
//     {title: "tennis ", rating: 7.2}
// ]

//lets map it and find certain ratig 


// const rating = videos.map(function (m){
//     if (m.length < 9){
//         return m;
//     }else{
//         return "nope"
//     }
// });
// console.log(rating)

//turnary operation 

// const shorter = videos.map(function(m){

//     //basically checking if m.length is less than 9 if so retun m or retun "nope"
//     return m.length<9? m : "nope";
// })

// console.log(shorter)
//Arrow Functionnn

// const arrowVideos = videos.map(video => video.toUpperCase());

// const arrowVideos = videos.map(video => {
//     if(video.length<7){

//     return video;
// }else{
//     return "nope";
// }
// });

// console.log(arrowVideos);


//SORT

// const items = ['banana', 'Apple','Mnago','Strawberry','orange'];
// const ratings = ['10','2','4','1','8','3'];


//whne it comes to sortting, you can use onoy SORT funtion to sort string only 
//such as items.sort()
// but for integer you gotta do the a-b function 

// ratings.sort((a,b) => a-b);
// console.log(ratings)



//COPIES without reference 


// const copyOfitem = [...ratings];

// copyOfitem.sort((a,b ) => a -b);

// console.log("Not sorted: "+ ratings)
// console.log("Sorted: " + copyOfitem)


// // constractor functions 

// function tofo (name, completed ){
//     this.name = name;
//     this.completed = completed;

// }

// //get name 

// tofo.prototype.getTodoName = function(){
//     console.log(this.name);
// }

// const todo = new tofo("Abul", false);
// const todo2 = new tofo("kalam", true);
// tofo.getTodoName();
// console.log(todo, todo2);

//classes

class Enemy{
    constructor (life,name,level){
        this.life = life;
        this.name= name;
        this.level = level;
    }

    getinfo(){

        console.log( this.life,
            this.name,
            this.level);

    }
}
const tiger = new Enemy(98, 'howard', 10);
console.log(tiger);

tiger.getinfo();
