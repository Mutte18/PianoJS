export default class FreePlayController{
    constructor(pianoKeysMapModel, keySoundsModel, soundView){
        this.pianoKeysMap = pianoKeysMapModel;
        this.keySoundsModel = keySoundsModel;
        this.soundView = soundView;
    }

    initFreePlayMode(){

    }

    playSound(keyID){
        const pianoKeyModel = this.pianoKeysMap.getKey(keyID);
        this.soundView.playSingleKeySound(this.keySoundsModel.getSound(pianoKeyModel));
    }
}