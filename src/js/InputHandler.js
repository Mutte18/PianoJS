import * as base from "./base.js";


export default class InputHandler{
    constructor(singleKeyController, chordController, freePlayController){
        this.singleKeyController = singleKeyController;
        this.chordController = chordController;
        this.freePlayController = freePlayController;
        this.setUpEventHandlers();
        this.changeGameMode();
    }

    setUpEventHandlers(){
        document.querySelector(base.DOMStrings.pianoContainer).addEventListener('click', e => {
                const id = e.target.closest(`${base.DOMStrings.pianoKey}`).dataset.id;
                this.handleClick(id);
            });

        document.querySelector(base.DOMStrings.gameModeToggle).addEventListener('change', e => {
            const gameMode = document.querySelector('input[type = radio]:checked').id;
            base.setGameMode(gameMode);
            this.changeGameMode();

        });


        document.addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                if (base.getGameOver()) {
                    this.chordController.initChordMode();
                    this.singleKeyController.initSingleKeyMode();

                    /*uiHandler.addHoverOnKeys();
                    pianoHandler.clearSelectedKeys();
                    uiHandler.clearCorrectnessKeyStyle();
                    setKeyToGuess();
                    initChordMode();*/
                }
            }
            if (e.key === 'x') {
                if (!base.getGameOver()) {
                    this.chordController.verifySelectedAccord();
                }
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

    changeGameMode(){
        console.log(base.getGameMode());
        //Call to every controller to clear all views
        switch(base.getGameMode()){
            case base.modeEnum.SINGLE_KEY_MODE:
                this.singleKeyController.initSingleKeyMode();
                break;
            case base.modeEnum.CHORD_MODE:
                this.chordController.initChordMode();
                break;
            case base.modeEnum.FREE_PLAY_MODE:
                this.freePlayController.initFreePlayMode();
                break;
        }
    }

    handleClick(clickedID){
        switch (base.currentMode) {
            case base.modeEnum.SINGLE_KEY_MODE:
                this.singleKeyController.checkKey(clickedID);
                break;
            case base.modeEnum.CHORD_MODE:
                this.chordController.addKeyToChord(clickedID);
                break;
            case base.modeEnum.FREE_PLAY_MODE:
                this.freePlayController.playSound(clickedID);
                break;
        }
    }
}