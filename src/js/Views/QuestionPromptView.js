import {DOMStrings} from "../base.js";

export default class QuestionPromptView {
    constructor() {

    }

    updateKeyToGuessText(keyModel) {
        document.querySelector(DOMStrings.questionPrompt).innerHTML = `Please press ${keyModel.getNote()}`;
    }

    updateClickedKeyResults(results) {
        if (results) {
            document.querySelector(DOMStrings.questionPrompt).innerHTML = "CORRECT! <br> Press ENTER to start over";
        }
        else {
            document.querySelector(DOMStrings.questionPrompt).innerHTML = "WROOOONG! <br> Press ENTER to start over";
        }
    }

    updateSingleKeyImage(image) {
        document.querySelector('.notes').innerHTML = `<img src=${image}>`;
    }
    updateChordToSelectText(chord) {
        document.querySelector(DOMStrings.questionPrompt).innerHTML = `Please press the keys to make ${chord.getName()} chord`;

    }
    updateChordSelectionCounterText(userChordSize = 0, chordToGuessSize){
        document.querySelector('.chordSelectionCounter').textContent =
            `${userChordSize}/${chordToGuessSize} selected`;
    }
}