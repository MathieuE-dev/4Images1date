// Définir les niveaux avec des mots et leurs images associées
const levels = [
    {
        word: "1939",
        images: ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg"]
    },
    {
        word: "1453",
        images: ["img5.jpg", "img6.jpg", "img7.jpg", "img8.jpg"]
    },
    {
        word: "1492",
        images: ["img9.jpg", "img10.jpg", "img11.jpg", "img12.jpg"]
    }
];

let currentLevel = 0;
let score = 0;
let timer = 60; // Chronomètre en secondes
let timerInterval;

// Fonction pour démarrer le niveau
function startLevel(levelIndex) {
    const level = levels[levelIndex];
    const imageElements = document.querySelectorAll(".images img");
    document.getElementById("level").textContent = levelIndex + 1;
    
    // Charger les images
    for(let i = 0; i < imageElements.length; i++) {
        imageElements[i].src = "/Images/"+level.images[i];
    }

    // Réinitialiser le champ de réponse et le message
    document.getElementById("answer").value = "";
    document.getElementById("message").textContent = "";

    // Réinitialiser le timer
    resetTimer();
}

// Fonction pour vérifier la réponse
function checkAnswer() {
    let userAnswer = document.getElementById("answer").value.toLowerCase();
    let message = document.getElementById("message");

    if(userAnswer === levels[currentLevel].word) {
        score += 10;
        document.getElementById("score").textContent = score;
        message.textContent = "Félicitations ! Vous avez trouvé le bon mot.";
        message.style.color = "green";

        clearInterval(timerInterval); // Arrêter le chronomètre

        // Passer au niveau suivant après une courte pause
        setTimeout(() => {
            currentLevel++;
            if (currentLevel < levels.length) {
                startLevel(currentLevel);
            } else {
                message.textContent = "Vous avez terminé tous les niveaux ! Bravo !";
            }
        }, 2000);
    } else {
        message.textContent = "Désolé, ce n'est pas la bonne date. Essayez encore.";
        message.style.color = "red";
    }
}

// Fonction pour gérer le chronomètre
function startTimer() {
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById("timer").textContent = timer;
        if (timer === 0) {
            clearInterval(timerInterval);
            document.getElementById("message").textContent = "Temps écoulé !";
            document.getElementById("message").style.color = "red";
        }
    }, 1000);
}

// Fonction pour réinitialiser le chronomètre
function resetTimer() {
    clearInterval(timerInterval);
    timer = 60;
    document.getElementById("timer").textContent = timer;
    startTimer();
}

// Écouteur d'événement pour le bouton de validation
document.getElementById("submit").addEventListener("click", checkAnswer);

// Démarrer le premier niveau
startLevel(currentLevel);
