export default class KeySoundsModel{
    constructor() {
        this.keySounds =
            this.importAll(require.context(`../../sounds/audacity`, false, /\.(wav|mp3|m4a)$/));
    }


//Retrieves the images from the file specified to be able to work with webpack
    importAll(r) {
        let images = {};
        r.keys().map((item, index) => {
            images[item.replace('./', '')] = r(item);
        });
        return images;
    }

    getSound(key){
        return this.keySounds[`${key.getNote()}.m4a`];
    }


}