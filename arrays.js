

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


// reference Array 
// let fruits = ['Apple', 'Banana', 'Mango']
// let morefruits = fruits;
// morefruits.push("carrot")


// fruits.forEach(function(item, index){
//     console.log(index, item, index) ;

// })

// console.log("Fruits Array: " + fruits);
// console.log(morefruits)

//objects 

// const person = {
//     name: "Abul",
//     tweets: 20,
//     Age: 25


// };



// const newPerson = person;

// newPerson.Age = 29;
// console.log(newPerson)


const message = [
    'Hello Ab',
    'How is it going',
    'Hope all is well',
    'What on your mind today',
    'week',
    'Coke'

]

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

const shortSearched = message.filter(function(video){

    // this will return all the string that is less than 6
    return video.length < 10;
})

console.log(shortSearched);


