import {DOMStrings} from "../index";

const notesImages =
    importAll(require.context('../../img', false, /\.(png|jpe?g|svg)$/));

//Retrieves the images from the file specified to be able to work with webpack
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
        images[item.replace('./', '')] = r(item);
    });
    return images;
}

export function updateNoteImage(note) {
    document.querySelector('.notes').innerHTML = `
                <img src=${notesImages[`${note.getNote()}${note.getId()}.png`]}>
`;
}

export function updateKeyText(note) {
    document.querySelector(DOMStrings.questionPrompt).innerHTML = `Please press ${note.getNote()}${note.getId()}`;
}

export function updateCorrectChordText() {
    document.querySelector(DOMStrings.questionPrompt).innerHTML = `You guessed correctly!`;
}

export function updateIncorrectChordText() {
    document.querySelector(DOMStrings.questionPrompt).innerHTML = `Wrong chord!`;
}

export function updateChordToSelectText(chord) {
    document.querySelector(DOMStrings.questionPrompt).innerHTML = `Please press the keys to make ${chord} chord`;

}

export function toggleChordSelectedStyle(key) {
    document.getElementById(key.getNote() + key.getId()).classList.toggle('chordSelected');
}

export function removeHoverOnKeys() {
    const allKeys = document.querySelectorAll(DOMStrings.pianoKey);
    for (let i = 0; i < allKeys.length; i++) {
        allKeys[i].classList.remove('active');
    }
}

export function addHoverOnKeys(){
    const allKeys = document.querySelectorAll(DOMStrings.pianoKey);
    for (let i = 0; i < allKeys.length; i++) {
        allKeys[i].classList.add('active');
    }
}

export function addHoverToChordKeys(userChord){
    userChord.forEach(el => {
        document.getElementById(el.getNote()+el.getId()).classList.add('active');
    })
}

export function updateChordSelectionCounterText(chordSize = 0, chordToGuessSize){
    document.querySelector('.chordSelectionCounter').textContent = `${chordSize}/${chordToGuessSize} selected`;
}

export function addCorrectnessKeyStyle(key, isMatch) {
    if (isMatch) {
        document.getElementById(key.getNote() + key.getId()).classList.add('correctKey');
    }
    else {
        document.getElementById(key.getNote() + key.getId()).classList.add('incorrectKey');
    }
}

export function clearCorrectnessKeyStyle(...keys) {
    keys.forEach(el => {
        document.getElementById(el.getNote() + el.getId().classList.remove('incorrectKey'));
        document.getElementById(el.getNote() + el.getId().classList.remove('correctKey'));
    });
}