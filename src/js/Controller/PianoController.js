import PianoKeyModel from "../Models/PianoKeyModel";

export default class PianoController {
    constructor(pianoKeyView) {
        this.pianoKeyView = pianoKeyView;
        this.createPiano(2);
        this.keysMap = new Map();
    }




}