/* =====================================
        TypeRush - script.js
        Partie 3.1
===================================== */

// ---------- Récupération des éléments ----------

const textDisplay = document.getElementById("textDisplay");
const textInput = document.getElementById("textInput");

const timerElement = document.getElementById("timer");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");

const restartButton = document.getElementById("restart");
const progressBar = document.getElementById("progressBar");

const levelSelect = document.getElementById("level");
const bestScore = document.getElementById("bestScore");

const message = document.getElementById("message");

// ---------- Variables ----------

let timer = null;
let seconds = 0;

let started = false;

let currentText = "";

let totalTyped = 0;
let correctTyped = 0;

let currentLevel = "easy";

// ---------- Textes ----------

const texts = {

    easy: [
    
    `Le soleil se lève doucement sur la ville tandis que les habitants commencent leur journée. Les enfants se rendent à l'école avec leur sac sur le dos. Les commerçants ouvrent leurs boutiques et les rues deviennent rapidement animées. C'est une belle matinée pour pratiquer la frappe au clavier et améliorer sa vitesse.`,
    
    `Chaque personne peut progresser en informatique grâce à la pratique régulière. Quelques minutes de frappe chaque jour suffisent pour gagner en précision et en rapidité. Avec de la patience et de la motivation, les résultats deviennent rapidement visibles et les exercices paraissent beaucoup plus simples.`,
    
    `Un étudiant prépare son devoir en utilisant un ordinateur portable. Il écrit ses idées, corrige ses fautes puis enregistre son travail. Plus il s'entraîne à taper rapidement, plus il gagne du temps pour réaliser d'autres activités importantes au cours de la journée.`,
    
    `La bibliothèque de la ville accueille chaque jour de nombreux lecteurs. Certains viennent pour lire des romans tandis que d'autres travaillent sur leurs projets scolaires. Le calme de cet endroit permet de rester concentré et d'améliorer efficacement sa vitesse de frappe.`,
    
    `Apprendre à taper sans regarder le clavier demande un peu d'entraînement. Au début les erreurs sont nombreuses, mais avec le temps les doigts trouvent naturellement les bonnes touches. Cette compétence est très utile pour les études comme pour le travail.`
    
    ],
    
    medium: [
    
    `Les développeurs utilisent plusieurs langages de programmation afin de créer des applications performantes. HTML structure les pages, CSS améliore leur apparence et JavaScript ajoute des interactions. Une bonne maîtrise du clavier permet de coder plus rapidement et de réduire le temps consacré à la rédaction.`,
    
    `La cybersécurité est devenue essentielle dans un monde connecté. Les entreprises mettent en place des systèmes de protection afin de limiter les attaques informatiques. Les utilisateurs doivent également choisir des mots de passe complexes et mettre régulièrement leurs logiciels à jour pour renforcer leur sécurité.`,
    
    `Un projet informatique commence souvent par une phase d'analyse. Les besoins sont étudiés avec précision avant la création du modèle conceptuel, du modèle logique puis du modèle physique des données. Cette organisation facilite le développement de solutions fiables et faciles à maintenir.`,
    
    `Les bases de données permettent de stocker de grandes quantités d'informations. Grâce au langage SQL, il est possible d'ajouter, modifier, supprimer ou rechercher des données rapidement. Une bonne vitesse de frappe représente un avantage lors de l'écriture de longues requêtes.`,
    
    `Les applications web modernes fonctionnent directement dans un navigateur. Elles utilisent souvent des interfaces réactives qui s'adaptent aux ordinateurs, aux tablettes et aux téléphones. Les utilisateurs profitent ainsi d'une expérience agréable quel que soit leur appareil.`
    
    ],
    
    hard: [
    
    `L'intelligence artificielle transforme progressivement de nombreux secteurs d'activité. Les algorithmes analysent des volumes considérables de données afin de détecter des tendances, proposer des recommandations ou automatiser certaines tâches complexes. Malgré leurs performances, ces systèmes nécessitent toujours une supervision humaine afin de garantir des résultats fiables et responsables.`,
    
    `Concevoir une application performante demande une bonne organisation du code ainsi qu'une architecture claire. Les développeurs séparent généralement la présentation, la logique métier et les données afin de faciliter les tests, la maintenance et l'ajout de nouvelles fonctionnalités sans modifier l'ensemble du projet.`,
    
    `La sécurité informatique repose sur plusieurs principes fondamentaux comme la confidentialité, l'intégrité et la disponibilité des informations. Les administrateurs mettent en œuvre des politiques de sauvegarde, des pare-feu, des systèmes de détection d'intrusion ainsi que des mécanismes de chiffrement pour protéger les données sensibles.`,
    
    `Le développement logiciel ne consiste pas uniquement à écrire du code. Il faut également comprendre les besoins des utilisateurs, réaliser des tests, corriger les anomalies, documenter les fonctionnalités et assurer le suivi de l'application tout au long de son cycle de vie afin de garantir sa qualité.`,
    
    `Les structures de données et les algorithmes jouent un rôle essentiel dans les performances des programmes. Choisir une méthode de recherche ou de tri adaptée permet de réduire le temps d'exécution et la consommation de mémoire, ce qui améliore considérablement l'efficacité globale d'une application.`
    
    ]
    
    };

// ---------- Choix d'un texte ----------

function getRandomText(){

const list = texts[currentLevel];

return list[Math.floor(Math.random()*list.length)];

}

// ---------- Affichage du texte ----------

function loadText(){

currentText = getRandomText();

textDisplay.innerHTML = "";

currentText.split("").forEach((letter)=>{

const span = document.createElement("span");

span.innerText = letter;

textDisplay.appendChild(span);

});

textDisplay.firstChild.classList.add("current");

textInput.value = "";

textInput.focus();

seconds = 0;

started = false;

totalTyped = 0;

correctTyped = 0;

timerElement.textContent = "0 s";

wpmElement.textContent = "0";

accuracyElement.textContent = "100%";

progressBar.style.width = "0%";

message.textContent = "";

clearInterval(timer);

loadBestScore();

}

// ---------- Chargement du meilleur score ----------

function loadBestScore(){

const score = localStorage.getItem("best_" + currentLevel);

bestScore.textContent = score ? score : 0;

}

// ---------- Démarrage du chronomètre ----------

function startTimer(){

timer = setInterval(()=>{

seconds++;

timerElement.textContent = seconds + " s";

},1000);

}

// ---------- Changement de niveau ----------

levelSelect.addEventListener("change",()=>{

currentLevel = levelSelect.value;

loadText();

});

// ---------- Bouton Rejouer ----------

restartButton.addEventListener("click",()=>{

loadText();

});

// ---------- Initialisation ----------

loadText();
/* =====================================
        Partie 3.2
        Gestion de la saisie
===================================== */

textInput.addEventListener("input", () => {

    // Démarrage du chronomètre au premier caractère
    if (!started) {
        started = true;
        startTimer();
    }

    const typed = textInput.value;
    const characters = textDisplay.querySelectorAll("span");

    totalTyped = typed.length;
    correctTyped = 0;

    characters.forEach((character, index) => {

        character.classList.remove("correct");
        character.classList.remove("incorrect");
        character.classList.remove("current");

        const typedChar = typed[index];

        if (typedChar == null) {

            if (index === typed.length) {
                character.classList.add("current");
            }

        } else if (typedChar === character.innerText) {

            character.classList.add("correct");
            correctTyped++;

        } else {

            character.classList.add("incorrect");

        }

    });

    // ---------------- Progression ----------------

    const progress = (typed.length / currentText.length) * 100;

    progressBar.style.width = Math.min(progress, 100) + "%";

    // ---------------- Précision ----------------

    let accuracy = 100;

    if (totalTyped > 0) {

        accuracy = Math.round((correctTyped / totalTyped) * 100);

    }

    accuracyElement.textContent = accuracy + "%";

    // ---------------- WPM ----------------

    if (seconds > 0) {

        const words = correctTyped / 5;

        const wpm = Math.round(words / (seconds / 60));

        wpmElement.textContent = wpm;

    }

    // ---------------- Fin du texte ----------------

    if (typed === currentText) {

        finishGame();

    }

});
/* =====================================
        Partie 3.3
        Fin de partie
===================================== */

function finishGame() {

    // Arrêter le chronomètre
    clearInterval(timer);

    textInput.disabled = true;

    // Calcul du WPM final
    let finalWPM = 0;

    if (seconds > 0) {

        finalWPM = Math.round((correctTyped / 5) / (seconds / 60));

    }

    // Calcul de la précision finale
    let finalAccuracy = 100;

    if (totalTyped > 0) {

        finalAccuracy = Math.round((correctTyped / totalTyped) * 100);

    }

    wpmElement.textContent = finalWPM;
    accuracyElement.textContent = finalAccuracy + "%";

    // ---------- Sauvegarde du meilleur score ----------

    const storageKey = "best_" + currentLevel;

    const savedScore = Number(localStorage.getItem(storageKey)) || 0;

    if (finalWPM > savedScore) {

        localStorage.setItem(storageKey, finalWPM);

        bestScore.textContent = finalWPM;

        message.innerHTML =
            "🏆 Nouveau record !<br><br>" +
            "⚡ " + finalWPM + " WPM<br>" +
            "🎯 " + finalAccuracy + "% de précision";

    } else {

        bestScore.textContent = savedScore;

        message.innerHTML =
            "✅ Texte terminé !<br><br>" +
            "⚡ " + finalWPM + " WPM<br>" +
            "🎯 " + finalAccuracy + "% de précision";

    }

}

/* =====================================
        Préparation du redémarrage
===================================== */

// Chaque fois qu'un nouveau texte est chargé,
// on réactive la zone de saisie.

const oldLoadText = loadText;

loadText = function () {

    oldLoadText();

    textInput.disabled = false;

    textInput.focus();

};
/* =====================================
        Partie 3.4
        Améliorations finales
===================================== */

// Empêche la perte du focus sur la zone de saisie
document.addEventListener("click", (e) => {

    if (
        e.target !== levelSelect &&
        e.target !== restartButton
    ) {
        if (!textInput.disabled) {
            textInput.focus();
        }
    }

});

// Raccourci clavier : Ctrl + R pour recommencer
document.addEventListener("keydown", (e) => {

    if (e.ctrlKey && e.key.toLowerCase() === "r") {

        e.preventDefault();

        loadText();

    }

});

// Touche Échap pour effacer la saisie
document.addEventListener("keydown", (e) => {

    if (e.key === "Escape" && !textInput.disabled) {

        textInput.value = "";

        textInput.dispatchEvent(new Event("input"));

    }

});

// Recharger le meilleur score au chargement
window.addEventListener("load", () => {

    loadBestScore();

    textInput.focus();

});

// Animation de la barre de progression
progressBar.style.transition = "width .25s ease";

// Animation des statistiques
[wpmElement, accuracyElement, timerElement].forEach(element => {

    element.style.transition = ".25s";

});

// Sélection automatique de la zone de texte
textInput.addEventListener("focus", () => {

    textInput.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});

// Message d'accueil
message.innerHTML = "⌨️ Choisissez un niveau puis commencez à taper !";