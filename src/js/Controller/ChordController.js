import ChordModel from "../Models/ChordModel";
import * as base from "../base";

export default class ChordController {
    constructor(pianoKeyView, questionPromptView, pianoKeysMap, availableChordsModel, keySoundsModel, soundView) {
        this.pianoKeyView = pianoKeyView;
        this.questionPromptView = questionPromptView;
        this.pianoKeysMap = pianoKeysMap;
        this.availableChordsModel = availableChordsModel;
        this.keySoundsModel = keySoundsModel;
        this.soundView = soundView;
        this.userChord = [];
        this.correctChord = true;
    }

    initChordMode() {
        if(base.getGameMode() === base.modeEnum.CHORD_MODE) {
            //Play the correct chord, unless it is a new round and there is no previous chord
            if (this.chordToGuess && !this.correctChord) {
                this.playChordSound(this.chordToGuess.getKeys());
            }
            this.chordToGuess = this.setUpChordToGuess();
            console.log(this.chordToGuess.getName(), this.chordToGuess.getKeys());
            this.userChord = [];
            this.questionPromptView.updateChordToSelectText(this.chordToGuess);
            //Update questionPromptView to show the correct chord Notes image
            this.pianoKeyView.addHoverOnKeys();
            this.pianoKeyView.removeSingleKeyStyles();
            this.questionPromptView.updateChordSelectionCounterText(
                this.userChord.length, this.chordToGuess.getKeys().length);
            //Clear currently selected UserChords
            //Reset styles and such
            //Reset chordSelection Counter in new view file?
        }
    }

    setUpChordToGuess() {
        const chord = this.availableChordsModel.getChord();
        const filledChord = [];
        chord.keys.forEach(element => {
            filledChord.push(this.pianoKeysMap.getKey(element));
        });
        return new ChordModel(chord.name, filledChord);
    }


    addClickedKeyToUserChord(clickedKey) {
        this.userChord.push(clickedKey);
        this.pianoKeyView.toggleChordSelectedStyle(clickedKey);
        this.checkSizeOfChord();
        this.questionPromptView.updateChordSelectionCounterText(
            this.userChord.length, this.chordToGuess.getKeys().length);
        //Update chord selection counter text
    }

    removeDuplicateKeyFromChord(duplicateKey) {
        this.userChord.splice(duplicateKey.index, 1);
        this.pianoKeyView.toggleChordSelectedStyle(duplicateKey.clickedKey);
        this.checkSizeOfChord();
        this.questionPromptView.updateChordSelectionCounterText(
            this.userChord.length, this.chordToGuess.getKeys().length);
        //Update chord selection counter text
    }

    checkSizeOfChord() {
        if (this.userChord.length === this.chordToGuess.getKeys().length) {
            //Remove hover from all keys apart from the userChord keys
            this.pianoKeyView.removeHoverOnKeys();
            this.pianoKeyView.addHoverToChordKeys(this.userChord);
        }
        else {
            //Re-add hover on keys if size isnt at max
            this.pianoKeyView.addHoverOnKeys();
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

        if (duplicateKeyObj.clickedKey) {
            console.log("Duplicate exists!");
            this.removeDuplicateKeyFromChord(duplicateKeyObj);
        }
        //If there is no duplicate, and we are not at the limit, add it
        else if (!duplicateKeyObj &&
            this.userChord.length < this.chordToGuess.getKeys().length) {
            this.addClickedKeyToUserChord(pianoKeyModel);
        }
    }

    verifySelectedAccord() {
        if (this.userChord.length === this.chordToGuess.getKeys().length) {
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
                this.correctChord = true;
                //
                //return true;
            }
            //If not all keys are guessed correctly, show the correct ones
            else {
                this.chordToGuess.getKeys().forEach(el => {
                    this.pianoKeyView.addCorrectnessKeyStyle(el, true);
                });
                this.correctChord = false;
                //return false;
            }
            this.playChordSound(this.userChord);
            base.setGameOver(true);
            this.pianoKeyView.removeHoverOnKeys();
        }
    }

    playChordSound(chordToPlay){
        const chordSoundFiles = [];
        chordToPlay.forEach(el => {
            chordSoundFiles.push(this.keySoundsModel.getSound(el));
        });
        this.soundView.playChordSound(chordSoundFiles);
    }

    keyExistsInChord(key, chordToGuess) {
        for (let i = 0; i < chordToGuess.length; i++) {
            if (key.getNote() === chordToGuess[i].getNote()) {
                return true;
            }
        }
        return false;
    }
}