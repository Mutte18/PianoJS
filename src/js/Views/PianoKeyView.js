import {DOMStrings} from "../base.js";

export default class PianoKeyView{
    constructor(){

    }

    removeHoverOnKeys() {
        const allKeys = document.querySelectorAll(DOMStrings.pianoKey);
        for (let i = 0; i < allKeys.length; i++) {
            allKeys[i].classList.remove('active');
        }
    }
    addHoverOnKeys(){
        const allKeys = document.querySelectorAll(DOMStrings.pianoKey);
        for (let i = 0; i < allKeys.length; i++) {
            allKeys[i].classList.add('active');
        }
    }
    addSingleKeyCorrectStyle(clickedKey, isMatch, correctKey) {
        if (isMatch) {
            document.getElementById(clickedKey.getNote()).classList.add('correctKey');
        }
        else {
            console.log(correctKey);
            document.getElementById(clickedKey.getNote()).classList.add('incorrectKey');
            document.getElementById(correctKey.getNote()).classList.add('correctKey');

        }
    }
    removeSingleKeyStyles() {
        const allKeys = document.querySelectorAll(DOMStrings.pianoKey);
        for (let i = 0; i < allKeys.length; i++) {
            allKeys[i].classList.remove('incorrectKey');
            allKeys[i].classList.remove('correctKey');
        }
    }

    addPianoToHTML(keyHTML) {
        const pianoHTML = document.querySelector(DOMStrings.pianoContainer);
        pianoHTML.insertAdjacentHTML('beforeend', keyHTML);
    }

    toggleChordSelectedStyle(key) {
        document.getElementById(key.getNote()).classList.toggle('chordSelected');
    }
    addHoverToChordKeys(userChord){
        userChord.forEach(el => {
            document.getElementById(el.getNote()).classList.add('active');
        })
    }
    addCorrectnessKeyStyle(key, isMatch) {
        if (isMatch) {
            document.getElementById(key.getNote()).classList.add('correctKey');
        }
        else {
            document.getElementById(key.getNote()).classList.add('incorrectKey');
        }
    }
}
