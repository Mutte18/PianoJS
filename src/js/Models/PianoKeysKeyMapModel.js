import PianoKeyModel from "./PianoKeyModel";

export default class PianoKeysKeyMapModel{
    constructor(octaves){
        this.keysMap = new Map();
        for (let i = -1; i < octaves; i++) {

            this.keysMap.set(`c${i}`, new PianoKeyModel(i, 'white', 'c'));
            this.keysMap.set(`cs${i}`, new PianoKeyModel(i, 'black', 'cs'));
            this.keysMap.set(`d${i}`, new PianoKeyModel(i, 'white', 'd'));
            this.keysMap.set(`ds${i}`, new PianoKeyModel(i, 'black', 'ds'));
            this.keysMap.set(`e${i}`, new PianoKeyModel(i, 'white', 'e'));
            this.keysMap.set(`f${i}`, new PianoKeyModel(i, 'white', 'f'));
            this.keysMap.set(`fs${i}`, new PianoKeyModel(i, 'black', 'fs'));
            this.keysMap.set(`g${i}`, new PianoKeyModel(i, 'white', 'g'));
            this.keysMap.set(`gs${i}`, new PianoKeyModel(i, 'black', 'gs'));
            this.keysMap.set(`a${i}`, new PianoKeyModel(i, 'white', 'a'));
            this.keysMap.set(`as${i}`, new PianoKeyModel(i, 'black', 'as'));
            this.keysMap.set(`b${i}`, new PianoKeyModel(i, 'white', 'b'));
        }
        console.log(this.keysMap);
    }

    getPianoKeysHTML() {
        let html = ``;
        this.keysMap.forEach(el => {
            html += el.getHTML();
        });
        return html;
    }

    getKey(id) {
        return this.keysMap.get(id);
    }
}