export default class ChordModel{
    constructor(chordName, chordKeys){
        this.chordName = chordName;
        this.chordKeys = chordKeys;
    }

    getChordName(){
        return this.chordName;
    }
    getChordKeys(){
        return this.chordKeys;
    }
}