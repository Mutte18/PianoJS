import * as base from "../base";
import NoteImagesModel from "../Models/NoteImagesModel";

export default class SingleKeyController {
    constructor(pianoKeyView, questionPromptView, pianoKeysMapModel) {
        this.pianoKeyView = pianoKeyView;
        this.pianoKeysMap = pianoKeysMapModel;
        this.questionPromptView = questionPromptView;
        this.correctSingleKey = this.setNewCorrectSingleKey();
        this.noteImagesModel = new NoteImagesModel();
        this.gameOver = false;
        this.initSingleKeyMode();
    }


    checkKey(keyID) {
        if (!base.getGameOver()) {
            const pianoKeyModel = this.pianoKeysMap.getKey(keyID);


            if (pianoKeyModel.getNote() === this.correctSingleKey.getNote()) {
                this.pianoKeyView.addSingleKeyCorrectStyle(pianoKeyModel, true);
                this.questionPromptView.updateClickedKeyResults(true);
                /*
                1. Send to view to update text that you guessed Correctly
                2. Send to view to update clicked key background colour to green
                 */
            }
            else {
                this.pianoKeyView.addSingleKeyCorrectStyle(pianoKeyModel, false, this.correctSingleKey);
                this.questionPromptView.updateClickedKeyResults(false);

                /*
                1. Send to view to update text that you guessed INCORRECTLY
                2. Send to view to update clicked key background colour to red
                3. Send to view to update correct key background colour to outline green
                 */
            }
            base.setGameOver(true);
            this.pianoKeyView.removeHoverOnKeys();
            //pause game, remove hover from keys etc
        }

    }

    initSingleKeyMode() {
        base.setGameOver(false);

        this.correctSingleKey = this.setNewCorrectSingleKey(this.correctSingleKey);
        this.questionPromptView.updateKeyToGuessText(this.correctSingleKey);
        this.questionPromptView.updateSingleKeyImage(this.noteImagesModel.getNoteImage(this.correctSingleKey));
        this.pianoKeyView.addHoverOnKeys();
        this.pianoKeyView.removeSingleKeyStyles();
        //Here we want to reset everything, this is done when game starts and when user presses enter
        //after a round has been played
    }

    setNewCorrectSingleKey(oldCorrectKey) {
        console.log(oldCorrectKey, "TJABBA");
        const idsArray = [0];
        const notesArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

        let randomNote = this.getRandomNote(idsArray, notesArray);
        if (oldCorrectKey) {
            while (randomNote === oldCorrectKey.getNote()) {
                console.log("ranomdizing");
                randomNote = this.getRandomNote(idsArray, notesArray);
            }
        }

        //Update view with correct Image to guess

        return this.pianoKeysMap.getKey(randomNote);
    }

    getRandomNote(idArray, noteArray) {
        const randomNote = noteArray[Math.floor(Math.random() * noteArray.length)];
        const randomId = idArray[Math.floor(Math.random() * idArray.length)];
        return randomNote + randomId.toString();
    }
}