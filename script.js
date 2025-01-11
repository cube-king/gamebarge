let failvar = (Math.ceil(Math.random() * 9) - 1);
let sucesses = 0
let firstdiv = document.getElementById("firstdiv")
let divArray = Array.from(firstdiv.parentNode.children)
let wager = 0

score = localStorage.getItem("score");

if (isNaN(score) || score == null || score < 50) {
    localStorage.setItem("score", "50");
}

console.log(localStorage.getItem("score"))

console.log("Failvar is ",failvar)
console.log("Item of failvar is ", divArray[failvar])
console.log("Array is ", Array.from(firstdiv.parentNode.children))

divArray[failvar].classList.add('fail')

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
    $(".option").off("click");
    $('.option').each(function(){
        if (this.classList.contains('flip-horizontal-bottom')) {
            this.classList.remove('flip-horizontal-bottom')
        }
    });

    divArray[failvar].classList.remove('fail')
    wager = 0
    sucesses = 0
    failvar = (Math.ceil(Math.random() * 9) - 1);
    clickEnable()
    console.log(failvar)
    divArray[failvar].classList.add('fail')
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
                gamereset()
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
                gamereset()
            }
        }
    });    
}


clickEnable()