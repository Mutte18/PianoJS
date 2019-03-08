import SingleKeyController from "./Controller/SingleKeyController";
import PianoKeyView from "./Views/PianoKeyView";
import QuestionPromptView from "./Views/QuestionPromptView";
import InputHandler from "./InputHandler";
import PianoKeyModel from "./Models/PianoKeyModel";
import PianoKeysKeyMapModel from "./Models/PianoKeysKeyMapModel";
import ChordController from "./Controller/ChordController";
import AvailableChordsModel from "./Models/AvailableChordsModel";
import KeySoundsModel from "./Models/KeySoundsModel";
import SoundView from "./Views/SoundView";
import FreePlayController from "./Controller/FreePlayController";

function init() {
    const pianoKeyView = new PianoKeyView();
    const questionPromptView = new QuestionPromptView();
    const pianoKeysMap = new PianoKeysKeyMapModel(2);
    pianoKeyView.addPianoToHTML(pianoKeysMap.getPianoKeysHTML());
    const keySoundsModel = new KeySoundsModel();
    const soundView = new SoundView();
    const singleKeyController = new SingleKeyController(
        pianoKeyView, questionPromptView, pianoKeysMap, keySoundsModel, soundView);
    const availableChords = new AvailableChordsModel();

    const chordController = new ChordController(
        pianoKeyView, questionPromptView, pianoKeysMap, availableChords, keySoundsModel, soundView);
    const freePlayController = new FreePlayController(pianoKeysMap, keySoundsModel, soundView)
    const inputHandler = new InputHandler(singleKeyController, chordController, freePlayController);
}

init();
