let validSymbols = ["1","2","3","4","5","6","7","8","9","0"]
let counter = 0

function updateDblCounter() {
    document.getElementById("dblcounter").text = "Doubloons: "+ localStorage.getItem("score")
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

$('#rollbutton').on("click", function () { 
    scoreToAddTo = Number(localStorage.getItem("score"));
    scoreToAddTo -= 15;
    localStorage.setItem("score", scoreToAddTo);
    updateDblCounter()
    var i = setInterval(function(){ 
        $("#slot1").text((validSymbols[getRandomInt(0,9)]).toString())
        $("#slot2").text((validSymbols[getRandomInt(0,9)]).toString())
        $("#slot3").text((validSymbols[getRandomInt(0,9)]).toString())
        counter += 1
        if (counter >= 100) {
            counter = 0;
            if ($("#slot1").text() == $("#slot2").text() && $("#slot2").text() == $("#slot3").text()) {
                scoreToAddTo = Number(localStorage.getItem("score"));
                scoreToAddTo += 50000;
                localStorage.setItem("score", scoreToAddTo);
                updateDblCounter()
            }
            else if ($("#slot1").text() == $("#slot2").text() || $("#slot2").text() == $("#slot3").text() || ("#slot1").text() == $("#slot3").text()) {
                scoreToAddTo = Number(localStorage.getItem("score"));
                scoreToAddTo += 50;
                localStorage.setItem("score", scoreToAddTo);
                updateDblCounter()
            } 
            clearInterval(i);
        }
    },10)
});

updateDblCounter()