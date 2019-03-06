export default class ChordsModel {
    chords = {
        cMajor: ['a0', 'c0', 'g0'],
        fMajor: ['f0', 'a0', 'c1'],
        gMajor: ['g0', 'b0', 'd1'],
        aMinor: ['a0', 'c1', 'e1'],
        BbMajor: ['as0', 'd1', 'f1'],
        dMinor: ['d0', 'f0', 'a0'],
        dMajor: ['d0', 'fs0', 'a0'],
        aMajor: ['a0', 'cs1', 'e1'],
        eMajor: ['e0', 'gs0', 'b0'],
        cSMajor: ['cs0', 'e0', 'gs0'],
        bMajor: ['b0', 'ds1', 'fs1'],
        fSMajor: ['fs0', 'a0', 'cs1']
    };

    chordNames = [
        'cMajor',
        'fMajor',
        'gMajor',
        'aMinor',
        'BbMajor',
        'dMinor',
        'dMajor',
        'aMajor',
        'eMajor',
        'cSMajor',
        'bMajor',
        'fSMajor',
    ];

    constructor() {

    }

    /*
    C Major: a0 c0 g0
    F Major: f0 a0 c1
    G Major: g0 b0 d1
    A Minor: a0 c1 e1
    Bb Major: as0 d1 f1
    D Minor: d0 f0 a0
    D Major: d0 fs0 a0
    A Major: a0 cs1 e1
    E Major: e0 gs0 b0
    C# Major: cs0 e0 gs0
    B Major: b0 ds1 fs1
    F# Major: fs0 a0 cs1
    */



    getChord(desiredChord) {
        let chordName;

        //If you want a specific chord, it will check the parameter if it is spelled correctly and exists
        //in the possible chords.
        //Otherwise pick a random one.
        if (this.chordNames.indexOf(desiredChord) > -1) {
            chordName = desiredChord;
        }
        else {
            chordName = this.chordNames[Math.floor(Math.random() * this.chordNames.length)];
        }
        return {
            keys: this.chords[chordName],
            name: chordName,
        };

    }
}