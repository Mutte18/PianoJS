//document.querySelector('h1').style.color = "red";
const pianoDiv = document.querySelector('.pianoContainer');
for (let i = 0; i < 22; i++) {
    let letter = "";

    if(i % 7 === 0){
        letter = "C";

    }
    else if(i % 7 === 1){
        letter = "D";

    }
    else if(i % 7 === 2){
        letter = "E";

    }
    else if(i % 7 === 3){
        letter = "F";

    }
    else if(i % 7 === 4){
        letter = "G";

    }
    else if(i % 7 === 5){
        letter = "A";

    }
    else if(i % 7 === 6){
        letter = "B";

    }





    const pianoElement =
        `<div class="pianoTangent" id="${i}">
                ${letter}
            </div>`;
    pianoDiv.insertAdjacentHTML('beforeend', pianoElement);
}
;

const pianoTanget = document.querySelector('.pianoContainer');
pianoTanget.addEventListener('click', e => {
    chooseTangent(e.target.id);
});

function chooseTangent(id) {
    console.log(document.getElementById(id));

}