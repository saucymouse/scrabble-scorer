const input = require('readline-sync');
const promptText = (`Welcome to the Scrabble score calculator!

Which scoring algorithm would you like to use?

0 - Scrabble: The traditional scoring algorithm.
1 - Simple Score: Each letter is worth 1 point.
2 - Bonus Vowels: Vowels are worth 3 pts, and consonants are 1 pt.

Enter 0, 1, or 2: `);
const enterWordPrompt = (`\nEnter a word to be scored, or 'Stop' to quit: `);


// Code your transform function here:
function transform(oldObject) {
  let newObject = {}; //creates new object to hold newPointStructure
  for (nameOfKey in oldObject) { //loop through each key of oldObject
    for (number in oldObject[nameOfKey]) { //loop through values of each key 
      newObject[oldObject[nameOfKey][number]] = Number(nameOfKey); //newPointStructure[oldPointStructure[points/#][letter w/in that number]] = that same number
    };
  };
  return newObject;
};



// Code your initialPrompt function here:
function initialPrompt() {
  let validResponses = ['0', '1', '2'];
  let selection = input.question(promptText);
  while (!validResponses.includes(selection)) {
    console.log('Nope! Try again!\n');
    selection = input.question('Enter 0, 1, or 2: ');
  };
  console.log(`\nUsing algorithm: ${scoringAlgorithms[selection].name}`);
  return selection;
};


// Code your runProgram function here:
function isValidWord(word) {
  for (letter in word) {
    if (!Object.keys(newPointStructure).includes(word[letter].toUpperCase())) {
    return false;
    };
  };
  return true;
};

function spacesCounter(word) {
  let totalSpaces = 0;
  for (letter in word) {
    if (word.charAt(letter) == ' ') {
      totalSpaces++;
    };
  };
  return totalSpaces;
};

function runProgram(scoreArr) {
  let selection = initialPrompt();
  let word = input.question(enterWordPrompt); 
  while (isValidWord(word) === false) {
    console.log('NO! A REAL word! Go again!!!');
    word = input.question(enterWordPrompt); 
  };
  while (word.toUpperCase() !== 'STOP') {
    console.log(`Score for '${word}': ${(scoreArr[selection].scoreFunction(word))}`);
    word = input.question(enterWordPrompt);  
  };
  return `\nfine byeee ~(˘▾˘~) ~(˘▾˘)~ (~˘▾˘)~\n`;
};


// Here is the oldPointStructure object:
const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

// Use the transform function to create the newPointStructure object here:
let newPointStructure = transform(oldPointStructure);
console.log(newPointStructure)

// Create your scoringAlgorithms array here:
let simpleObject = {
  name: 'Simple Score',
  description: 'Each letter is worth 1 point.',
  scoreFunction: word => word.length - spacesCounter(word)
};

let vowelObject = {
  name: 'Bonus Vowels',
  description: 'Vowels are 3 pts, consonants are 1 pt.',
  scoreFunction: word => {
    let score = 0;
    let vowelsArray = ["A", "E", "I", "O", "U"];
    for (letter in word) {
      if (vowelsArray.includes(word[letter].toUpperCase())) {
      score += 3;
      } 
      else score++;
    };
    return score-= spacesCounter(word);
  }
};

let scrabbleObject = {
  name: 'Scrabble',
  description: 'The traditional scoring algorithm.',
  scoreFunction: word => {
    let score = 0;
    for (letter in word) {
      score+= newPointStructure[word[letter].toUpperCase()]
    };
    return score;
  }
};

let scoringAlgorithms = [scrabbleObject, simpleObject, vowelObject];


// Call the runProgram function here:
runProgram(scoringAlgorithms);