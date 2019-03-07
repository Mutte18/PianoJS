import SingleKeyController from "./Controller/SingleKeyController";
import PianoController from "./Controller/PianoController";
import PianoKeyView from "./Views/PianoKeyView";
import QuestionPromptView from "./Views/QuestionPromptView";
import InputHandler from "./InputHandler";
import PianoKeyModel from "./Models/PianoKeyModel";
import PianoKeysKeyMapModel from "./Models/PianoKeysKeyMapModel";
import ChordController from "./Controller/ChordController";
import AvailableChordsModel from "./Models/AvailableChordsModel";
import KeySoundsModel from "./Models/KeySoundsModel";
import SoundView from "./Views/SoundView";








/*function attemptChordGuess() {
    if (userChord.chordArr.length === chordSize) {
        const chordResult = chordHandler.verifySelectedAccord(userChord, chordToGuess);
        soundHandler.playChordSound(chordToGuess);
        if (chordResult) {
            console.log("YOU GUESSED RIGHT!");
            uiHandler.updateCorrectChordText();
        }
        else {
            console.log("YOU GUESSED WRONG!");
            uiHandler.updateIncorrectChordText();
        }
        gameRunning = false;
        uiHandler.removeHoverOnKeys();
    }
}*/

/*function initChordMode() {
    userChord.chordArr = [];
    chooseChordKeysToGuess();
    uiHandler.updateChordSelectionCounterText(userChord.chordArr.length, chordToGuess.length);

}*/






function init() {
    const pianoKeyView = new PianoKeyView();
    const questionPromptView = new QuestionPromptView();
    //const pianoController = new PianoController(pianoKeyView);
    const pianoKeysMap = new PianoKeysKeyMapModel(2);
    pianoKeyView.addPianoToHTML(pianoKeysMap.getPianoKeysHTML());
    const keySoundsModel = new KeySoundsModel();
    const soundView = new SoundView();
    const singleKeyController = new SingleKeyController(
        pianoKeyView, questionPromptView, pianoKeysMap, keySoundsModel, soundView);
    const availableChords = new AvailableChordsModel();

    const chordController = new ChordController(
        pianoKeyView, questionPromptView, pianoKeysMap, availableChords, keySoundsModel, soundView);
    const inputHandler = new InputHandler(singleKeyController, chordController);
}

init();
