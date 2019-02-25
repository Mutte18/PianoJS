import * as uiHandler from "./Views/UIHandler";
import * as pianoHandler from "./Views/PianoHandler";
import * as chordHandler from "./Views/ChordHandler";
import * as soundHandler from "./Views/SoundHandler";
import * as chords from "./Models/Chords";

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


const modeEnum = {
    SINGLE_KEY_MODE: 1,
    CHORD_MODE: 2,
    FREE_PLAY_MODE: 3
};

export const DOMStrings = {
    pianoContainer: '.pianoContainer',
    questionPrompt: '.questionPrompt',
    pianoKey: '.key',
    activeHover: 'hover'
};


function setKeyToGuess() {
    const idsArray = [0];
    const notesArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

    const randomNote = notesArray[Math.floor(Math.random() * notesArray.length)]
    const randomId = idsArray[Math.floor(Math.random() * idsArray.length)];
    currentKey = pianoHandler.getKey(randomNote + randomId);
    uiHandler.updateNoteImage(currentKey);
    uiHandler.updateKeyText(currentKey);
}

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



function singleKeySelection(id) {


    gameRunning = false;
    const clickedKey = pianoHandler.getKey(id);
    const requestedKey = clickedKey.getNote() + clickedKey.getId();

    const correctKey = currentKey.getNote() + currentKey.getId();
    if (requestedKey === correctKey) {
        document.querySelector(DOMStrings.questionPrompt).innerHTML = "CORRECT! <br> Press ENTER to start over";
        document.getElementById(`${requestedKey}`).classList.add('correctKey');
    }
    else {
        document.querySelector(DOMStrings.questionPrompt).innerHTML = "WROOOONG! <br> Press ENTER to start over";
        document.getElementById(`${requestedKey}`).classList.add('incorrectKey');
        document.getElementById(`${correctKey}`).classList.add('correctKey');
    }
    uiHandler.removeHoverOnKeys()

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
    pianoHandler.createPiano(2);
    setUpEventHandlers();
    setKeyToGuess();
    currentMode = modeEnum.CHORD_MODE;
    initChordMode();
    //getChord('bMajor');


    //currentMode = modeEnum.SINGLE_KEY_MODE;
}


init();
//initializePiano();