export const modeEnum = {
    SINGLE_KEY_MODE: 1,
    CHORD_MODE: 2,
    FREE_PLAY_MODE: 3
};

export let currentMode = modeEnum.SINGLE_KEY_MODE;

export let gameOver = false;

export function setGameOver(value){
    gameOver = value;
}

export function getGameOver(){
    return gameOver;
}

export const DOMStrings = {
    pianoContainer: '.pianoContainer',
    questionPrompt: '.questionPrompt',
    pianoKey: '.key',
    activeHover: 'hover'
};