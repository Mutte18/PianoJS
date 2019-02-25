export default class PianoKey{
    constructor(id, color, note){
        this.id = id;
        this.note = note;
        this.color = color;
        this.chordSelected = false;
        //this.notes = note+id;

        //TODO REMOVE THE ID PART, AND MAKE IT PART OF THE NOTE. THIS WILL REQUIRE LOTS OF REFACTORING

    };

    getId(){
        return this.id;
    }

    getNote(){
        return this.note;
    }

    getHTML(){
        return`<div class="key ${this.color} ${this.note} active disable-select" id="${this.note}${this.id}" data-id="${this.note}${this.id}">
                <p>${this.note}${this.id}</p>
            </div>`;
    }

    /*getHTML(){
        return`<div class="key ${this.color} ${this.getNote()} active disable-select" id="${this.getNote()}" data-id="${this.getNote()}">
                <p>${this.getNote()}</p>
            </div>`;
    }*/

    getChordSelected(){
        return this.chordSelected;
    }

    setChordSelected(value){
        this.chordSelected = value;

    }
}