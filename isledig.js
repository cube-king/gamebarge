let failvar = (Math.ceil(Math.random() * 9) - 1);
let sucesses = 0
let firstdiv = document.getElementById("firstdiv")
let divArray = Array.from(firstdiv.parentNode.children)
let wager = 0

score = localStorage.getItem("score");

if (isNaN(score) || score == null || score < 50) {
    localStorage.setItem("score", "50");
}

function updateWagerCounter() {
    document.getElementById("wagertext").textContent = "Wager: "+ (wager).toString()
}


console.log(localStorage.getItem("score"))

console.log("Array is ", Array.from(firstdiv.parentNode.children))

divArray[failvar].querySelector('.backface').classList.add('fail')
divArray[failvar].querySelector('.backface').classList.remove('dblbg')

function updateDblCounter() {
    document.getElementById("dblcounter").textContent = "Doubloons: "+ localStorage.getItem("score")
}

function triggerConfetti() {
    const confettiScript = document.createElement('script');
    confettiScript.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
    confettiScript.onload = () => {
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 }
        });
    };
    document.body.appendChild(confettiScript);
}

function gamereset() {
    if (isNaN(score) || score == null || score < 50) {
        localStorage.setItem("score", "50");
    }
    console.log("reset function run")
    $(".option").off("click");
    $('.option').each(function(){
        if (this.classList.contains('flip-horizontal-bottom')) {
            this.classList.remove('flip-horizontal-bottom')
        }
    });
    divArray[failvar].querySelector('.backface').classList.add('dblbg')
    divArray[failvar].querySelector('.backface').classList.remove('fail')
    wager = 0
    sucesses = 0
    failvar = (Math.ceil(Math.random() * 9) - 1);
    clickEnable()
    divArray[failvar].querySelector('.backface').classList.add('fail')
    divArray[failvar].querySelector('.backface').classList.remove('dblbg')
    updateDblCounter()
    updateWagerCounter()
}

$(".reset").on("click", function () {
    gamereset()
}) 

$(".wager50").on("click", function () {
    score = Number(localStorage.getItem("score"));
    if (score > 0) {
        wager += 50
        score -= 50
        localStorage.setItem("score", score);
        console.log("Subtracted score", score)
    }
    updateWagerCounter()
})

function clickEnable() {
    $(".option").on("click", function () { 
        if (!(wager==0)) {
            this.classList.add('flip-horizontal-bottom')
            if (!(Array.from(this.parentNode.children).indexOf(this) == failvar)) {
                console.log('success')
                sucesses += 1
                $(this).off("click");
            }
            else {
                console.log('fail')
                $(".option").off("click");
                setTimeout(gamereset, 3000);
            }
        }
        if (sucesses == 8) {
            triggerConfetti()
            $(".option").off("click");
            score = Number(localStorage.getItem("score"));
            score += wager * 5
            console.log("Wager gain is",wager * 5)
            console.log("score as num", score)
            localStorage.setItem("score", score);
            console.log("score as string", localStorage.getItem("score"))
            console.log("pre reset")
            setTimeout(gamereset, 3000);
        }
    });    
}


clickEnable()
updateDblCounter()
updateWagerCounter()