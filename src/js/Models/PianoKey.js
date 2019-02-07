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
        return`<div class="key ${this.color} ${this.note} active disable-select" id="${this.note}${this.id}">
                <p>${this.note}${this.id}</p>
            </div>`;
    }
}