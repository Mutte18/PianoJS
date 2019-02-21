import {updateNoteImage, updateKeyText, toggleHoverOnKeys, clearCorrectnessKeyStyle} from "./Views/UIHandler";
import {getKey, createPiano, clearSelectedKeys, clearSelections} from "./Views/PianoHandler";
import {
    addKeyToChord,
    verifySelectedAccord
} from "./Views/ChordHandler";


let gameRunning = true;
let currentKey = {};
let currentMode;

let chordSize = 3;

const userChord = {
    desiredSizeOfChord: chordSize,
    currentSize: 0,
    currentIndex: 0,
    chordArr: [],
};

let chordToGuess = [];


const modeEnum = {
    SINGLE_KEY_MODE: 1,
    ACCORD_MODE: 2,
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
    currentKey = getKey(randomNote + randomId);
    updateNoteImage(currentKey);
    updateKeyText(currentKey);
}

function setUpEventHandlers() {
    document.querySelector(DOMStrings.pianoContainer).addEventListener('click', e => {
        if (gameRunning) {
            playRound(e.target.id);
        }
    });

    document.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            if (!gameRunning) {
                gameRunning = true;
                toggleHoverOnKeys();
                clearSelectedKeys();
                clearCorrectnessKeyStyle();
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
    });
}


function singleKeySelection(id) {

    if (id !== "") {
        gameRunning = false;
        const clickedKey = getKey(id);
        const requestedKey = clickedKey.getNote() + clickedKey.getId();

        const correctKey = currentKey.getNote() + currentKey.getId();
        console.log(requestedKey, correctKey);
        if (requestedKey === correctKey) {
            document.querySelector(DOMStrings.questionPrompt).innerHTML = "CORRECT! <br> Press ENTER to start over";
            document.getElementById(`${requestedKey}`).classList.add('correctKey');
        }
        else {
            document.querySelector(DOMStrings.questionPrompt).innerHTML = "WROOOONG! <br> Press ENTER to start over";
            document.getElementById(`${requestedKey}`).classList.add('incorrectKey');
            document.getElementById(`${correctKey}`).classList.add('correctKey');
        }
        toggleHoverOnKeys()
    }
}


function attemptChordGuess() {
    const chordResult = verifySelectedAccord(userChord, chordToGuess);
    if (chordResult) {
        console.log("YOU GUESSED RIGHT!");
        //Call UI to say you won
    }
    else {
        console.log("YOU GUESSED WRONG!");

        //Call UI to say you lost
    }
    gameRunning = false;
    toggleHoverOnKeys();
}

function initChordMode() {
    userChord.chordArr = [];
    chooseChordKeysToGuess();

}

function chooseChordKeysToGuess() {
    //Here we will choose between pre set chords which contain specific keys

    //FOR TESTING ALWAYS USING THE SAME
    chordToGuess = [getKey('c0'), getKey('d0'), getKey('e0')];
}

function accordKeySelection(id) {
    /*
    TODO: I NEED TO CHECK IF THE CLICKED KEY EXISTS, CANT HAVE SAME KEY TWICE
    IF IT EXISTS THEN REMOVE FROM OBJECT?

     */
    if (id !== "") {
        const clickedKey = getKey(id);
        addKeyToChord(clickedKey, userChord);
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
        case modeEnum.ACCORD_MODE:
            accordKeySelection(id);
            /*
            1. Set up the keys that are to be pressed
            2. Allow user to click up to three different keys, if click same deselect key
            3. Update UI and show right/wrong
             */
            break;
        case modeEnum.FREE_PLAY_MODE:
            /*
            Just play the sound of the note pressed
             */
            break;
    }
}

function init() {
    createPiano(2);
    setUpEventHandlers();
    setKeyToGuess();
    currentMode = modeEnum.ACCORD_MODE;
    initChordMode();


    //currentMode = modeEnum.SINGLE_KEY_MODE;
}


init();
//initializePiano();