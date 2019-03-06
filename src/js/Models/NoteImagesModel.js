export default class NoteImagesModel {
    constructor() {
        this.notesImages =
            this.importAll(require.context('../../img', false, /\.(png|jpe?g|svg)$/));
    }


//Retrieves the images from the file specified to be able to work with webpack
    importAll(r) {
        let images = {};
        r.keys().map((item, index) => {
            images[item.replace('./', '')] = r(item);
        });
        return images;
    }

    getNoteImage(key){
        return this.notesImages[`${key.getNote()}.png`];
    }
}