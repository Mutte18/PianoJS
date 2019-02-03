import PianoKey from './Models/PianoKey';
const keysArray = [];

function createPiano(octaves){
    const pianoHTML = document.querySelector('.pianoContainer');
    pianoHTML.insertAdjacentHTML('beforeend', getPianoTangents(octaves));
}



function createPianoKeys(id){
    keysArray.push(new PianoKey(id, 'white', 'c'));
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
    keysArray.push(new PianoKey(id, 'white', 'b'));
}

function getPianoTangents(octaves){
    for(let i = 0; i < octaves; i++){
        createPianoKeys(i);
    }

    let html =``;
    for(let i = 0; i < keysArray.length; i++){
        html += keysArray[i].getHTML();
    }
    console.log(html);


    /*const html =
        `<div class="key white c" id="c${id}">
                C
            </div>
            <div class="key black cs" id="cs${id}">
                cs
            </div>
            <div class="key white d" id="d${id}">
                D
            </div>
            <div class="key black ds" id="ds${id}">
                ds
            </div>
            <div class="key white e" id="e${id}">
                E
            </div>
            <div class="key white f" id="f${id}">
                F
            </div>
            <div class="key black fs" id="fs${id}">
                fs
            </div>
            <div class="key white g" id="g${id}">
                G
            </div>
            <div class="key black gs" id="gs${id}">
                gs
            </div>
            <div class="key white a" id="a${id}">
                A
            </div>
            <div class="key black as" id="as${id}">
                as
            </div>
            <div class="key white b" id="b${id}">
                B
            </div>`;*/
    return html;
}

function chooseTangent(id) {
    console.log(document.getElementById(id).id);
}

const pianoTanget = document.querySelector('.pianoContainer');
pianoTanget.addEventListener('click', e => {
    chooseTangent(e.target.id);
    console.log(keysArray);
});



function requestPianoKey(){

}

createPiano(3);
//initializePiano();