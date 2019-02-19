import {updateNoteImage, updateKeyText} from "./Views/UIHandler";
import {getKey, createPiano, clearSelectedKeys, toggleHoverOnKeys} from "./Views/PianoHandler";


let gameRunning = true;
let currentKey = {};
let currentMode;

let accordSelection = {
    key1: "",
    key2: "",
    key3: "",
    clicksRemaining: 3,
};

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
    currentKey = getKey(randomNote+randomId);
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
                setKeyToGuess();
            }
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

function accordKeySelection(id){
    /*
    TODO: I NEED TO CHECK IF THE CLICKED KEY EXISTS, CANT HAVE SAME KEY TWICE
    IF IT EXISTS THEN REMOVE FROM OBJECT?

     */
    if(accordSelection.clicksRemaining > 0 && accordSelection.key1 != getKey(id)) {
        switch (accordSelection.clicksRemaining) {
            case 3:
                accordSelection.key1 = getKey(id);
                break;
            case 2:
                accordSelection.key2 = getKey(id);
                break;
            case 1:
                accordSelection.key3 = getKey(id);
                break;
        }
        getKey(id).toggleSelected();
        accordSelection.clicksRemaining -= 1;
    }
    console.log(accordSelection);
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
}


init();
//initializePiano();