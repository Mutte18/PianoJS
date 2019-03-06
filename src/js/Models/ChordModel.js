export default class ChordModel{
    constructor(chordName, chordKeys){
        this.chordName = chordName;
        this.chordKeys = chordKeys;
    }

    getName(){
        return this.chordName;
    }
    getKeys(){
        return this.chordKeys;
    }
}