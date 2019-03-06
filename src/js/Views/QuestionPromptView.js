import {DOMStrings} from "../index";

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
        document.querySelector('.notes').innerHTML = `
                <img src=${image}>`;
    }
}