import PianoKey from './Models/PianoKey';

const keysMap = new Map();
let gameRunning = true;
let currentKey;

function createPiano(octaves) {
    const pianoHTML = document.querySelector('.pianoContainer');
    pianoHTML.insertAdjacentHTML('beforeend', getPianoTangents(octaves));
    currentKey = keysMap.get('c0');
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
    console.log(html);
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


const keyEventHandler = document.querySelector('.pianoContainer');
keyEventHandler.addEventListener('click', e => {
    const clickedKey = e.target.id;
    const key = getKey(clickedKey);
    if(key.getNote() === currentKey.getNote()
        && key.getId() === currentKey.getId()){
        document.querySelector('.questionBox').textContent = "CORRECT!";
    }
    else{
        document.querySelector('.questionBox').textContent = "WROOOONG!";
        document.getElementById(key.getNote() + key.getId()).style.backgroundColor = "red";
        document.getElementById(currentKey.getNote() + currentKey.getId()).style.backgroundColor = "green";
    }


});

function getKey(id){
    return keysMap.get(id);
}

function checkKey(key){

}
function requestPianoKey(keyId) {
    return keysMap.get('c0');

}

createPiano(2);
//initializePiano();