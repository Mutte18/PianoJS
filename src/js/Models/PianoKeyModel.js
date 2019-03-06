export default class PianoKeyModel{
    constructor(id, color, note){
        this.id = id;
        this.note = note;
        this.color = color;
        this.chordSelected = false;

        //TODO REMOVE THE ID PART, AND MAKE IT PART OF THE NOTE. THIS WILL REQUIRE LOTS OF REFACTORING

    };

    getNote(){
        return this.note + this.id.toString();
    }

    getHTML(){
        return`<div class="key ${this.color} ${this.note} active disable-select" id="${this.getNote()}" data-id="${this.getNote()}">
                <p>${this.getNote()}</p>
            </div>`;
    }

    getChordSelected(){
        return this.chordSelected;
    }

    setChordSelected(value){
        this.chordSelected = value;

    }
}