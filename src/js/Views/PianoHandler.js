import PianoKey from "../Models/PianoKey";
import {DOMStrings} from "../index";
import {toggleChordSelectedStyle} from "./UIHandler";

const keysMap = new Map();

function addPianoToHTML() {
    const pianoHTML = document.querySelector(DOMStrings.pianoContainer);
    pianoHTML.insertAdjacentHTML('beforeend', getPianoKeysHTML());
}

function getPianoKeysHTML() {
    let html = ``;
    keysMap.forEach(el => {
        html += el.getHTML();
    });
    return html;
}


function createPianoKeys(id) {
    keysMap.set(`c${id}`, new PianoKey(id, 'white', 'c'));
    keysMap.set(`cs${id}`, new PianoKey(id, 'black', 'cs'));
    keysMap.set(`d${id}`, new PianoKey(id, 'white', 'd'));
    keysMap.set(`ds${id}`, new PianoKey(id, 'black', 'ds'));
    keysMap.set(`e${id}`, new PianoKey(id, 'white', 'e'));
    keysMap.set(`f${id}`, new PianoKey(id, 'white', 'f'));
    keysMap.set(`fs${id}`, new PianoKey(id, 'black', 'fs'));
    keysMap.set(`g${id}`, new PianoKey(id, 'white', 'g'));
    keysMap.set(`gs${id}`, new PianoKey(id, 'black', 'gs'));
    keysMap.set(`a${id}`, new PianoKey(id, 'white', 'a'));
    keysMap.set(`as${id}`, new PianoKey(id, 'black', 'as'));
    keysMap.set(`b${id}`, new PianoKey(id, 'white', 'b'));
}

export function getKey(id) {
    return keysMap.get(id);
}

export function clearSelectedKeys() {
    keysMap.forEach(e => {
        const key = e.getNote() + e.getId();
        document.getElementById(`${key}`).classList.remove('incorrectKey');
        document.getElementById(`${key}`).classList.remove('correctKey');
    })
}

export function createPiano(octaves) {
    for (let i = -1; i < octaves; i++) {
        createPianoKeys(i);
    }
    addPianoToHTML();

}



//This is to be used when removing all Selections


//JUST A TEST FUNCTION
export function clearSelections() {
    keysMap.forEach(el => {
        if(el.getAccordSelected()){
            toggleAccordSelectedStyle(el);
            el.setAccordSelected(false);
        }
    });

}

/*for(let i = 0; i < keysMap; i++){

    if(keysMap.get(i).getAccordSelected()){

    }
    else{

    }
}*/

