import {toggleChordSelectedStyle, addCorrectnessKeyStyle, clearCorrectnessKeyStyle} from "./UIHandler";



function addKeyToUserChordArray(key, userChord) {
    userChord.chordArr.push(key);
    key.setChordSelected(true);
    toggleChordSelectedStyle(key);
}


function clearCurrentKey(key, userChord) {
    userChord.chordArr.splice(userChord.currentIndex, 1);
    key.setChordSelected(false);
    toggleChordSelectedStyle(key);
}

//Check if the clicked key already exists in the chord
function checkDuplicateChordKey(clickedKey, userChord) {
    for (let i = 0; i < userChord.chordArr.length; i++) {
        if (clickedKey === userChord.chordArr[i]) {
            userChord.currentIndex = i;
            return true;
        }
    }
    return false;
}

/*
    Attempt to add the clicked key to the chord. If the clicked key is already
    in the chord (duplicate), then deselect the key and remove from array
 */

export function addKeyToChord(clickedKey, userChord) {
    const duplicateExists = checkDuplicateChordKey(clickedKey, userChord);
    if (duplicateExists) {
        console.log("Duplicate exists!");
        clearCurrentKey(clickedKey, userChord);
    }
    //If there is no duplicate, and we are not at the limit, add it
    else if (!duplicateExists && userChord.chordArr.length < userChord.desiredSizeOfChord) {
        addKeyToUserChordArray(clickedKey, userChord);
    }
}

export function verifySelectedAccord(userChord, chordToGuess) {
    let allMatch = true;
    //Check each guessed key if they exist in the chord, in any order
    userChord.chordArr.forEach(el => {
        toggleChordSelectedStyle(el);
        if(!keyExistsInChord(el, chordToGuess)){
            addCorrectnessKeyStyle(el, false);
            allMatch = false;
        }
        else{
            addCorrectnessKeyStyle(el, true);
        }
    });
    if(allMatch){
        console.log("Correct keys in the chord!");
        return true;
    }
    //If not all keys are guessed correctly, show the correct ones
    else{
        chordToGuess.forEach(el => {
            addCorrectnessKeyStyle(el, true);
        });
        return false;
    }
}

function keyExistsInChord(key, chordToGuess){
    for(let i = 0; i < chordToGuess.length; i++){
        if(key === chordToGuess[i]){
            return true;
        }
    }
    return false;
}



//TODO
/*
 Continue on checking the two chords if they match, colour them when correct, and if incorrect show the correct ones.
 */