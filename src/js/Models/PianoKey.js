    export default class PianoKey{
    constructor(id, color, note){
        this.id = id;
        this.note = note;
        this.color = color;
    };

    getId(){
        return this.id;
    }

    getNote(){
        return this.note;
    }

    getHTML(){
        return`<div class="key ${this.color} ${this.note}" id="${this.note}${this.id}">
                ${this.note.toUpperCase()}
            </div>`;
    }
}