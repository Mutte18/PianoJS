import * as uiHandler from "./Views/UIHandler";
import * as pianoHandler from "./Views/PianoHandler";
import * as chordHandler from "./Views/ChordHandler";
import * as soundHandler from "./Views/SoundHandler";
import * as chords from "./Models/Chords";
import SingleKeyController from "./Controller/SingleKeyController";
import PianoController from "./Controller/PianoController";
import PianoKeyView from "./Views/PianoKeyView";
import QuestionPromptView from "./Views/QuestionPromptView";
import InputHandler from "./InputHandler";
import PianoKeyModel from "./Models/PianoKeyModel";
import PianoKeysKeyMapModel from "./Models/PianoKeysKeyMapModel";
import ChordController from "./Controller/ChordController";
import AvailableChordsModel from "./Models/AvailableChordsModel";

let gameRunning = true;
let currentKey = {};
let currentMode;

let chordSize = 3;






const desiredChord = ""; //IF YOU WANT A SPECIFIC CORD, WRITE THE NAME HERE
//IT HAS TO BE SPELLED CORRECTLY
//CHECK SPELLING IN CHORD.JS


const userChord = {
    desiredSizeOfChord: chordSize,
    currentSize: 0,
    currentIndex: 0,
    chordArr: [],
};

let chordToGuess = [];




function setUpEventHandlers() {
    document.querySelector(DOMStrings.pianoContainer).addEventListener('click', e => {
        if (gameRunning) {
            let id = e.target.closest(`${DOMStrings.pianoKey}`).dataset.id;
            playRound(id);
        }
    });

    document.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            if (!gameRunning) {
                gameRunning = true;
                uiHandler.addHoverOnKeys();
                pianoHandler.clearSelectedKeys();
                uiHandler.clearCorrectnessKeyStyle();
                setKeyToGuess();
                initChordMode();
            }
        }
        if (e.key === 'x') {
            if (gameRunning) {
                attemptChordGuess();
            }
            //clearSelections();
        }
        if (e.key === 'c') {
            console.log(userChord);
            console.log(chordToGuess);
        }
        if (e.key === 'b') {
            //playSingleKeySound();
        }

    });
}



function attemptChordGuess() {
    if (userChord.chordArr.length === chordSize) {
        const chordResult = chordHandler.verifySelectedAccord(userChord, chordToGuess);
        soundHandler.playChordSound(chordToGuess);
        if (chordResult) {
            console.log("YOU GUESSED RIGHT!");
            uiHandler.updateCorrectChordText();
        }
        else {
            console.log("YOU GUESSED WRONG!");
            uiHandler.updateIncorrectChordText();
        }
        gameRunning = false;
        uiHandler.removeHoverOnKeys();
    }
}

function initChordMode() {
    userChord.chordArr = [];
    chooseChordKeysToGuess();
    uiHandler.updateChordSelectionCounterText(userChord.chordArr.length, chordToGuess.length);

}

function chooseChordKeysToGuess() {
    const chordObj = chords.getChord(desiredChord);
    uiHandler.updateChordToSelectText(chordObj.name);
    const chordKeys = chordObj.keys;
    chordToGuess = [];
    chordKeys.forEach(el => {
        chordToGuess.push(pianoHandler.getKey(el));
    });
    chordSize = chordToGuess.length;
    userChord.desiredSizeOfChord = chordSize;
}

function accordKeySelection(id) {
    /*
    TODO: I NEED TO CHECK IF THE CLICKED KEY EXISTS, CANT HAVE SAME KEY TWICE
    IF IT EXISTS THEN REMOVE FROM OBJECT?

     */
    if (id !== "") {
        const clickedKey = pianoHandler.getKey(id);
        chordHandler.addKeyToChord(clickedKey, userChord);
        if (userChord.chordArr.length === chordToGuess.length) {
            uiHandler.removeHoverOnKeys();
            uiHandler.addHoverToChordKeys(userChord.chordArr);
        }
        else {
            uiHandler.addHoverOnKeys();
        }
        uiHandler.updateChordSelectionCounterText(userChord.chordArr.length, chordToGuess.length);
        //Call UI to update chordCurrentCounter
        //If chordCounter is at max, remove hover from all keys apart from selected
    }
}


function playRound(id) {
    switch (currentMode) {
        case modeEnum.SINGLE_KEY_MODE:
            singleKeySelection(id);
            /*
            1. Set up which key to guess
            2. Allow User to click a key
            3. Update UI and show right/wrong
             */
            break;
        case modeEnum.CHORD_MODE:
            accordKeySelection(id);
            /*
            1. Set up the keys that are to be pressed
            2. Allow user to click up to three different keys, if click same deselect key
            3. Update UI and show right/wrong
             */
            break;
        case modeEnum.FREE_PLAY_MODE:
            soundHandler.playSingleKeySound(id);

            /*
            Just play the sound of the note pressed
             */
            break;
    }
}

function init() {

    const pianoKeyView = new PianoKeyView();
    const questionPromptView = new QuestionPromptView();
    //const pianoController = new PianoController(pianoKeyView);
    const pianoKeysMap = new PianoKeysKeyMapModel(2);
    pianoKeyView.addPianoToHTML(pianoKeysMap.getPianoKeysHTML());
    const singleKeyController = new SingleKeyController(
        pianoKeyView, questionPromptView, pianoKeysMap);
    const availableChords = new AvailableChordsModel();
    const chordController = new ChordController(
        pianoKeyView, questionPromptView, pianoKeysMap, availableChords);
    const inputHandler = new InputHandler(singleKeyController, chordController);

    /*pianoHandler.createPiano(2);
    setUpEventHandlers();
    setKeyToGuess();
    currentMode = modeEnum.SINGLE_KEY_MODE;
    initChordMode();
    //getChord('bMajor');*/


    //currentMode = modeEnum.SINGLE_KEY_MODE;
}

init();
