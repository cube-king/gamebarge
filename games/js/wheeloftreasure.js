var score = Number(localStorage.getItem("score"));

function updateDblCounter() {
    document.getElementById("dblcounter").textContent = "Doubloons: "+ localStorage.getItem("score")
}

updateDblCounter()

function roundnum(num,amt){
    return Math.round(num / amt)*amt;
}

function addscore(num) {
    score = Number(localStorage.getItem("score"));
    score += num
    localStorage.setItem("score", score);
}

function rotateFunction(){
    var deg = roundnum(Math.random()*5000,45)
    document.getElementById('box').style.transform = "rotate("+deg+"deg)";

    if (deg%360==45) {
        addscore(-100)
    }
    else if (deg%360==90) {
        addscore(-5000)
    }
    else if (deg%360==135) {
        addscore(100)
    }
    else if (deg%360==180) {
        addscore(5000)
    }
    else if (deg%360==225) {
        addscore(-500)
    }
    else if (deg%360==270) {
        addscore(-1000)
    }
    else if (deg%360==315) {
        addscore(500)
    }
    else if (deg%360==0) {
        addscore(1000)
    }
    setTimeout(updateDblCounter,3000)
}

if (isNaN(score) || score == null || score < 50) {
    localStorage.setItem("score", "50");
}

