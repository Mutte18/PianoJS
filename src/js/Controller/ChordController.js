import ChordModel from "../Models/ChordModel";
import {addCorrectnessKeyStyle, toggleChordSelectedStyle} from "../Views/UIHandler";
import * as base from "../base";

export default class ChordController {
    constructor(pianoKeyView, questionPromptView, pianoKeysMap, availableChordsModel) {
        this.pianoKeyView = pianoKeyView;
        this.questionPromptView = questionPromptView;
        this.pianoKeysMap = pianoKeysMap;
        this.availableChordsModel = availableChordsModel;
        this.chordToGuess = [];
        this.userChord = [];
        this.initChordMode();
    }

    initChordMode() {
        this.chordToGuess = this.setUpChordToGuess();
        this.userChord = [];
        this.questionPromptView.updateChordToSelectText(this.chordToGuess);
        //Update questionPromptView to show the correct chord Notes image
        this.pianoKeyView.addHoverOnKeys();
        this.pianoKeyView.removeSingleKeyStyles();
        //Clear currently selected UserChords
        //Reset styles and such
        //Reset chordSelection Counter in new view file?
    }

    setUpChordToGuess() {
        const chord = this.availableChordsModel.getChord();
        return new ChordModel(chord.name, chord.keys);
    }


    addClickedKeyToUserChord(clickedKey) {
        this.userChord.push(clickedKey);
        this.pianoKeyView.toggleChordSelectedStyle(clickedKey);
        this.checkSizeOfChord();
    }

    removeDuplicateKeyFromChord(duplicateKey) {
        this.userChord.splice(duplicateKey.index, 1);
        duplicateKey.clickedKey.setChordSelected(false);
        this.pianoKeyView.toggleChordSelectedStyle(duplicateKey.clickedKey);
        this.checkSizeOfChord();
    }

    checkSizeOfChord(){
        if(this.userChord.length === this.chordToGuess.getKeys().length){
            this.pianoKeyView.removeHoverOnKeys();
            this.pianoKeyView.addHoverToChordKeys(this.userChord);
            //Remove hover from all keys apart from the userChord keys
        }
        else {
            this.pianoKeyView.addHoverOnKeys();
            //add Hover to the keys
        }

    }

    checkDuplicateChordKey(clickedKey) {
        for (let i = 0; i < this.userChord.length; i++) {
            if (clickedKey === this.userChord[i]) {
                return {
                    clickedKey: clickedKey,
                    index: i
                };
            }
        }
        return false;
    }

    addKeyToChord(keyID) {
        const pianoKeyModel = this.pianoKeysMap.getKey(keyID);
        const duplicateKeyObj = this.checkDuplicateChordKey(pianoKeyModel);
        console.log(this.chordToGuess);
        console.log(this.userChord);

        if (duplicateKeyObj.clickedKey) {
            console.log("Duplicate exists!");
            this.removeDuplicateKeyFromChord(duplicateKeyObj);
        }
        //If there is no duplicate, and we are not at the limit, add it
        else if (!duplicateKeyObj &&
            this.userChord.length < this.chordToGuess.getKeys().length)
        {
            this.addClickedKeyToUserChord(pianoKeyModel);
        }
    }

    verifySelectedAccord() {
        if(this.userChord.length === this.chordToGuess.getKeys().length) {


            let allMatch = true;
            //Check each guessed key if they exist in the chord, in any order
            this.userChord.forEach(el => {
                this.pianoKeyView.toggleChordSelectedStyle(el);
                if (!this.keyExistsInChord(el, this.chordToGuess.getKeys())) {
                    this.pianoKeyView.addCorrectnessKeyStyle(el, false);
                    allMatch = false;
                }
                else {
                    this.pianoKeyView.addCorrectnessKeyStyle(el, true);
                }
            });
            if (allMatch) {
                console.log("Correct keys in the chord!");
                //return true;
            }
            //If not all keys are guessed correctly, show the correct ones
            else {
                this.chordToGuess.getKeys().forEach(el => {
                    this.pianoKeyView.addCorrectnessKeyStyle(el, true);
                });
                //return false;
            }
            base.setGameOver(true);
            this.pianoKeyView.removeHoverOnKeys();
        }
    }

    keyExistsInChord(key, chordToGuess) {
        for (let i = 0; i < chordToGuess.length; i++) {
            if (key.getNote() === chordToGuess[i]) {
                return true;
            }
        }
        return false;
    }
}