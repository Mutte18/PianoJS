const keySounds = importAll(require.context(`../../sounds/audacity`, false, /\.(wav|mp3|m4a)$/));


//import c0 from ('../../sounds/octave0/c0.wav');

//Retrieves the images from the file specified to be able to work with webpack
function importAll(r) {
    let notes = {};
    r.keys().map((item, index) => {
        notes[item.replace('./', '')] = r(item);
    });
    return notes;
}

export function playSingleKeySound(key){
    const keySound = new Audio(keySounds[`${key}.m4a`]);
    keySound.play();
}

export function playChordSound(userChord){
    //ToDo
    //Add chord sounds
    //Will have to crosscheck which keys are in the chord (The order should not matter)

}