export default class SoundView {
    constructor() {

    }

    playSingleKeySound(keySoundFile) {
        new Audio(keySoundFile).play();
        //keySound.play();
    }

    playChordSound(keySoundFiles) {
        const chordSound = [];
        keySoundFiles.forEach(el => {
            chordSound.push(new Audio(el));
        });
        chordSound.forEach(el => {
            el.play();
        });
    }
}