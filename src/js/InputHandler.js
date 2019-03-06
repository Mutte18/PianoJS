import * as uiHandler from "./Views/UIHandler";
import * as pianoHandler from "./Views/PianoHandler";
import * as base from "./base.js";
import {DOMStrings} from "./index";
import * as soundHandler from "./Views/SoundHandler";

export default class InputHandler{
    constructor(singleKeyController){
        this.singleKeyController = singleKeyController;
        this.setUpEventHandlers();
        this.currentMode = base.modeEnum.SINGLE_KEY_MODE;
    }

    updateCurrentMode(){
        //Change currentMode to whatever mode is clicked on from the radio buttons
    }

    setUpEventHandlers(){
        document.querySelector(DOMStrings.pianoContainer).addEventListener('click', e => {
                const id = e.target.closest(`${DOMStrings.pianoKey}`).dataset.id;
                this.handleClick(id);
            });


        document.addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                if (base.getGameOver()) {
                    this.singleKeyController.initSingleKeyMode();
                    /*uiHandler.addHoverOnKeys();
                    pianoHandler.clearSelectedKeys();
                    uiHandler.clearCorrectnessKeyStyle();
                    setKeyToGuess();
                    initChordMode();*/
                }
            }
            if (e.key === 'x') {
                /*if (gameRunning) {
                    attemptChordGuess();
                }*/
                //clearSelections();
            }
            /*if (e.key === 'c') {
                console.log(userChord);
                console.log(chordToGuess);
            }
            if (e.key === 'b') {
                //playSingleKeySound();
            }*/

        });
    }

    handleClick(clickedID){
        switch (base.currentMode) {
            case base.modeEnum.SINGLE_KEY_MODE:
                this.singleKeyController.checkKey(clickedID);

                /*
                1. Set up which key to guess
                2. Allow User to click a key
                3. Update UI and show right/wrong
                 */
                break;
            case base.modeEnum.CHORD_MODE:
                //accordKeySelection(id);
                /*
                1. Set up the keys that are to be pressed
                2. Allow user to click up to three different keys, if click same deselect key
                3. Update UI and show right/wrong
                 */
                break;
            case base.modeEnum.FREE_PLAY_MODE:
                //soundHandler.playSingleKeySound(id);

                /*
                Just play the sound of the note pressed
                 */
                break;
        }
    }
}