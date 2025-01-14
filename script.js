var score = Number(localStorage.getItem("score"));

function updateDblCounter() {
    document.getElementById("dblcounter").textContent = "Doubloons: "+ localStorage.getItem("score")
}

updateDblCounter()