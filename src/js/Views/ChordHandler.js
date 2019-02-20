import {toggleChordSelectedStyle} from "./UIHandler";

let chordSize = 3;


const userChord = {
    desiredSizeOfChord: chordSize,
    currentSize: 0,
    currentIndex: 0,
    chordArr: [],
};

let chordToGuess = []

;

function addKeyToChordArray(key) {
    userChord.chordArr.push(key);
    key.setChordSelected(true);
    toggleChordSelectedStyle(key);
}


function clearCurrentKey(key) {
    userChord.chordArr.splice(userChord.currentIndex, 1);
    key.setChordSelected(false);
    toggleChordSelectedStyle(key);
}

//Check if the clicked key already exists in the accord
function checkDuplicateChordKey(clickedKey) {
    console.log(clickedKey);
    for (let i = 0; i < userChord.chordArr.length; i++) {
        if (clickedKey === userChord.chordArr[i]) {
            userChord.currentIndex = i;
            return true;
        }
    }
    return false;
}

export function addKeyToChord(clickedKey) {
    const duplicateExists = checkDuplicateChordKey(clickedKey);
    if (duplicateExists) {
        console.log("Duplicate exists!");
        clearCurrentKey(clickedKey);
    }
    //If there is no duplicate, and we are not at the limit, add it
    else if (!duplicateExists && userChord.chordArr.length < userChord.desiredSizeOfChord) {
        addKeyToChordArray(clickedKey);
    }
}

export function verifySelectedAccord() {
    userChord.chordArr.forEach(el => {
        if(!keyExistsInChord(el)){
            console.log(`NO MATCH FOR ${el.getNote()+el.getId()}`);
        }
    });
}

function keyExistsInChord(key){
    for(let i = 0; i < chordToGuess.length; i++){
        if(key === chordToGuess[i]){
            return true;
        }
    }
    return false;
}

export function setUpAccordToGuess(...accordKeys) {
    console.log(accordKeys);
    accordKeys.forEach(el => {
        chordToGuess = el;
    });
}

//TODO
/*
 Continue on checking the two chords if they match, colour them when correct, and if incorrect show the correct ones.
 */