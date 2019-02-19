import {DOMStrings} from "../index";

const notesImages =
    importAll(require.context('../../img', false, /\.(png|jpe?g|svg)$/));

//Retrieves the images from the file specified to be able to work with webpack
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
        images[item.replace('./', '')] = r(item);
    });
    return images;
}

export function updateNoteImage(note) {
    document.querySelector('.notes').innerHTML = `
                <img src=${notesImages[`${note.getNote()}${note.getId()}.png`]}>
`;
}

export function updateKeyText(note){
    document.querySelector(DOMStrings.questionPrompt).innerHTML = `Please press ${note.getNote()}${note.getId()}`;
}