import PianoKey from './Models/PianoKey';

const notesImages =
    importAll(require.context('../img', false, /\.(png|jpe?g|svg)$/));

const keysMap = new Map();
let gameRunning = true;
let currentKey;

const DOMStrings = {
    pianoContainer: '.pianoContainer',
    questionPromt: '.questionPrompt',
    pianoKey: '.key',
    activeHover: 'hover'

};

//Retrieves the images from the file specified to be able to work with webpack
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
        images[item.replace('./', '')] = r(item);
    });
    return images;
}


function createPiano(octaves) {
    const pianoHTML = document.querySelector(DOMStrings.pianoContainer);
    pianoHTML.insertAdjacentHTML('beforeend', getPianoTangents(octaves));
}


function createPianoKeys(id) {
    keysMap.set(`c${id}`, new PianoKey(id, 'white', 'c'));
    keysMap.set(`cs${id}`, new PianoKey(id, 'black', 'cs'));
    keysMap.set(`d${id}`, new PianoKey(id, 'white', 'd'));
    keysMap.set(`ds${id}`, new PianoKey(id, 'black', 'ds'));
    keysMap.set(`e${id}`, new PianoKey(id, 'white', 'e'));
    keysMap.set(`f${id}`, new PianoKey(id, 'white', 'f'));
    keysMap.set(`fs${id}`, new PianoKey(id, 'black', 'fs'));
    keysMap.set(`g${id}`, new PianoKey(id, 'white', 'g'));
    keysMap.set(`gs${id}`, new PianoKey(id, 'black', 'gs'));
    keysMap.set(`a${id}`, new PianoKey(id, 'white', 'a'));
    keysMap.set(`as${id}`, new PianoKey(id, 'black', 'as'));
    keysMap.set(`b${id}`, new PianoKey(id, 'white', 'b'));
    /*keysArray.push(new PianoKey(id, 'white', 'c'));
    keysArray.push(new PianoKey(id, 'black', 'cs'));
    keysArray.push(new PianoKey(id, 'white', 'd'));
    keysArray.push(new PianoKey(id, 'black', 'ds'));
    keysArray.push(new PianoKey(id, 'white', 'e'));
    keysArray.push(new PianoKey(id, 'white', 'f'));
    keysArray.push(new PianoKey(id, 'black', 'fs'));
    keysArray.push(new PianoKey(id, 'white', 'g'));
    keysArray.push(new PianoKey(id, 'black', 'gs'));
    keysArray.push(new PianoKey(id, 'white', 'a'));
    keysArray.push(new PianoKey(id, 'black', 'as'));
    keysArray.push(new PianoKey(id, 'white', 'b'));*/
}


function getPianoTangents(octaves) {
    for (let i = -1; i < octaves; i++) {
        createPianoKeys(i);
    }

    let html = ``;
    keysMap.forEach(el => {
        html += el.getHTML();
    });
    /*for(let i = 0; i < keysMap.length; i++){
        html += keysArray[i].getHTML();
    }*/
    return html;
}

function chooseTangent(id) {
    console.log(document.getElementById(id).id);
}

/*const pianoTanget = document.querySelector('.pianoContainer');
pianoTanget.addEventListener('click', e => {
    chooseTangent(e.target.id);
    requestPianoKey(e.target.id);
});*/
function setKeyToGuess() {
    const idsArray = [0];
    const notesArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

    const randomNote = notesArray[Math.floor(Math.random() * notesArray.length)]
    const randomId = idsArray[Math.floor(Math.random() * idsArray.length)];
    currentKey = keysMap.get(randomNote + randomId);
    updateNoteImage(currentKey);
    updateKeyText(currentKey);
    //document.querySelector(DOMStrings.questionPromt).innerHTML = `Please click on ${randomNote + randomId}"`;
}

function updateNoteImage(note) {
    document.querySelector('.notes').innerHTML = `
                <img src=${notesImages[`${note.getNote()}${note.getId()}.png`]}>
`;
}

function updateKeyText(note){
    document.querySelector(DOMStrings.questionPromt).innerHTML = `Please press ${note.getNote()}${note.getId()}`;
}

function setUpEventHandlers() {
    document.querySelector(DOMStrings.pianoContainer).addEventListener('click', e => {
        if (gameRunning) {
            selectKey(e.target.id);
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


function selectKey(id) {

    if (id !== "") {
        gameRunning = false;
        const clickedKey = getKey(id);
        console.log(clickedKey);
        const requestedKey = clickedKey.getNote() + clickedKey.getId();

        const correctKey = currentKey.getNote() + currentKey.getId();
        console.log(requestedKey, correctKey);
        if (requestedKey === correctKey) {
            document.querySelector(DOMStrings.questionPromt).innerHTML = "CORRECT! <br> Press ENTER to start over";
            document.getElementById(`${requestedKey}`).classList.add('correctKey');
        }
        else {
            document.querySelector(DOMStrings.questionPromt).innerHTML = "WROOOONG! <br> Press ENTER to start over";
            document.getElementById(`${requestedKey}`).classList.add('incorrectKey');
            document.getElementById(`${correctKey}`).classList.add('correctKey');
        }
        toggleHoverOnKeys()
    }

}

function clearSelectedKeys() {
    keysMap.forEach(e => {
        const key = e.getNote() + e.getId();
        document.getElementById(`${key}`).classList.remove('incorrectKey');
        document.getElementById(`${key}`).classList.remove('correctKey');
    })
}

function getKey(id) {
    return keysMap.get(id);
}

function checkKey(key) {

}

function requestPianoKey(keyId) {
    return keysMap.get('c0');

}

function toggleHoverOnKeys() {
    const allKeys = document.querySelectorAll(DOMStrings.pianoKey);
    for (let i = 0; i < allKeys.length; i++) {
        allKeys[i].classList.toggle('active');
    }
}

function init() {
    createPiano(2);
    setUpEventHandlers();
    setKeyToGuess();
}


init();
//initializePiano();