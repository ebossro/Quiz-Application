const userInfoForm = document.getElementById("userInfoForm");
const sectionQuestion = document.getElementById("sectionQuestion");
const sectionBien = document.getElementById("Bienvenue");
const btnSuivant = document.getElementById("suivant");
const feedback = document.getElementById("feedback");

let questionPosition = 0;
let score = 0;


let timerInterval;
let timeRemaining = 1200;

const question = document.getElementById("question");
const options = document.getElementById("options");

const questionResponce = [
  {
    question: "Que signifie HTML ?",
    options: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "HyperTool Multi Language",
    ],
    answer: "HyperText Markup Language",
  },
  {
    question: "Quel est le rôle principal du CSS dans le développement web ?",
    options: [
      "Structurer le contenu",
      "Créer des bases de données",
      "Ajouter du style au contenu",
    ],
    answer: "Ajouter du style au contenu",
  },
  {
    question:
      "Quelle est la fonction principale d'un pare-feu en cybersécurité ?",
    options: [
      "Bloquer les virus",
      "Crypter les données",
      "Filtrer le trafic réseau",
    ],
    answer: "Filtrer le trafic réseau",
  },
  {
    question:
      "Quel langage est principalement utilisé pour le développement côté serveur ?",
    options: ["JavaScript", "HTML", "PHP"],
    answer: "PHP",
  },
  {
    question: "Que signifie IoT ?",
    options: [
      "Internet of Things",
      "Internet of Technology",
      "Innovation of Technology",
    ],
    answer: "Internet of Things",
  },
  {
    question: "Quel est l'objectif principal du RGPD ?",
    options: [
      "Protéger les données personnelles",
      "Augmenter la vitesse d'Internet",
      "Créer des bases de données",
    ],
    answer: "Protéger les données personnelles",
  },
  {
    question: "Quel est le rôle d'une API dans le développement web ?",
    options: [
      "Créer des interfaces utilisateur",
      "Permettre la communication entre applications",
      "Gérer les bases de données",
    ],
    answer: "Permettre la communication entre applications",
  },
  {
    question:
      "Quel est le protocole utilisé pour sécuriser les communications sur le web ?",
    options: ["HTTP", "HTTPS", "FTP"],
    answer: "HTTPS",
  },
  {
    question: "Que signifie le terme 'responsive design' ?",
    options: [
      "Un site qui répond rapidement",
      "Un site qui s'adapte à tous les appareils",
      "Un site avec des animations",
    ],
    answer: "Un site qui s'adapte à tous les appareils",
  },
  {
    question: "Quel est l'objectif principal du machine learning ?",
    options: [
      "Créer des bases de données",
      "Améliorer la vitesse des ordinateurs",
      "Permettre aux machines d'apprendre à partir des données",
    ],
    answer: "Permettre aux machines d'apprendre à partir des données",
  },
  {
    question: "Quel est le rôle principal d'un certificat SSL ?",
    options: [
      "Accélérer le chargement des pages",
      "Sécuriser les communications entre le client et le serveur",
      "Créer des bases de données",
    ],
    answer: "Sécuriser les communications entre le client et le serveur",
  },
  {
    question: "Que signifie le terme 'open source' ?",
    options: [
      "Logiciel gratuit",
      "Code source accessible et modifiable",
      "Logiciel propriétaire",
    ],
    answer: "Code source accessible et modifiable",
  },
  {
    question: "Quel est le rôle principal d'un framework comme React ?",
    options: [
      "Faciliter le développement d'interfaces utilisateur",
      "Créer des bases de données",
      "Gérer les serveurs",
    ],
    answer: "Faciliter le développement d'interfaces utilisateur",
  },
  {
    question: "Que signifie le terme 'phishing' en cybersécurité ?",
    options: [
      "Une attaque visant à voler des informations personnelles",
      "Un logiciel antivirus",
      "Un type de pare-feu",
    ],
    answer: "Une attaque visant à voler des informations personnelles",
  },
  {
    question: "Quel est le langage utilisé pour styliser les pages web ?",
    options: ["HTML", "CSS", "JavaScript"],
    answer: "CSS",
  },
  {
    question: "Que signifie le terme 'cloud computing' ?",
    options: [
      "Stockage de données sur des serveurs distants",
      "Créer des bases de données",
      "Améliorer la vitesse des ordinateurs",
    ],
    answer: "Stockage de données sur des serveurs distants",
  },
  {
    question: "Quel est l'objectif principal d'un CMS comme WordPress ?",
    options: [
      "Créer des bases de données",
      "Faciliter la création et la gestion de sites web",
      "Gérer les serveurs",
    ],
    answer: "Faciliter la création et la gestion de sites web",
  },
  {
    question: "Que signifie le terme 'cryptographie' ?",
    options: [
      "L'art de protéger les données par le chiffrement",
      "Créer des bases de données",
      "Améliorer la vitesse des ordinateurs",
    ],
    answer: "L'art de protéger les données par le chiffrement",
  },
  {
    question: "Quel est le rôle principal d'un VPN ?",
    options: [
      "Accélérer la connexion Internet",
      "Sécuriser la connexion et masquer l'adresse IP",
      "Créer des bases de données",
    ],
    answer: "Sécuriser la connexion et masquer l'adresse IP",
  },
  {
    question:
      "Quel est le langage principalement utilisé pour les bases de données relationnelles ?",
    options: ["SQL", "Python", "JavaScript"],
    answer: "SQL",
  },
];

userInfoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(userInfoForm);
  const username = formData.get("username");
  const mail = formData.get("mail");
  const age = parseInt(formData.get("age"));

  if (age < 15 || age > 25) {
    alert("L'âge doit être compris entre 15 et 25 ans.");
    return;
  }

  sessionStorage.setItem("userKey", username);
  sessionStorage.setItem("mailKey", mail);
  sessionStorage.setItem("ageKey", age);

  sectionBien.style.display = "none";
  sectionQuestion.style.display = "block";
  btnSuivant.style.display = "none";

  // l'affichage initiale
  updateTimerDisplay();

  afficherQestion();
  startTimer(); 
});

function afficherQestion() {
  const totalQuestions = document.getElementById("totalQuestions");
  totalQuestions.textContent = `Nombre de questions : ${questionPosition + 1} / ${questionResponce.length}`;
  const qr = questionResponce[questionPosition];
  question.innerText = qr.question;
  qr.options.forEach((op) => {
    const optionBtn = document.createElement("button");
    optionBtn.textContent = op;
    optionBtn.classList.add("answerBtn");
    optionBtn.onclick = () => {
      selectAnswer(op);
    };
    options.appendChild(optionBtn);
  });
}

function selectAnswer(answer) {
  const correctAnswer = questionResponce[questionPosition].answer;
  if (correctAnswer === answer) {
    feedback.innerText = "Bravo ! Bonne réponse";
    score++;
  } else {
    feedback.innerText = `Dommage ! La bonne réponse était : ${correctAnswer}`;
  }
  document.querySelectorAll(".answerBtn").forEach((btn) => {
    btn.disabled = true;
  });
  btnSuivant.style.display = "block";
}

btnSuivant.addEventListener("click", function () {
  questionPosition++;
  if (questionPosition < questionResponce.length) {
    // On nettoie les anciennes options
    options.innerHTML = "";
    feedback.innerText = "";
    btnSuivant.style.display = "none";
    afficherQestion();
  } else {
  
    afficherResultat();
  }
});


function startTimer() {
  timerInterval = setInterval(() => {
    timeRemaining--;
    updateTimerDisplay();

    if (timeRemaining <= 0) {
      endQuizByTimeout();
    }
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const timerMinutes = document.getElementById("timerMinutes");
  const timerSeconds = document.getElementById("timerSeconds");
  const timerDisplay = document.querySelector(".timer-display");

  if (timerMinutes) {
    timerMinutes.textContent = minutes.toString().padStart(2, "0");
  }
  if (timerSeconds) {
    timerSeconds.textContent = seconds.toString().padStart(2, "0");
  }
}

function endQuizByTimeout() {
  stopTimer();
  const username = sessionStorage.getItem("userKey");

  if (sectionQuestion) {
    sectionQuestion.innerHTML = `
      <div class="timeout-screen">
        <span class="timeout-icon">⏰</span>
        <h2>Temps écoulé !</h2>
        <p>Désolé ${username}, le temps imparti pour ce quiz est terminé.</p>
        <p>Vous avez répondu à <strong>${questionPosition}</strong> questions sur <strong>${questionResponce.length}</strong>.</p>
        <p>Votre score : <strong>${score}/${questionPosition}</strong></p>
        <p>Ne vous découragez pas ! Vous pouvez toujours recommencer pour améliorer votre performance.</p>
        <button onclick="recommencerQuiz()" style="background: white; color: #ff6b6b; padding: 15px 30px; border: none; border-radius: 25px; font-weight: bold; cursor: pointer; margin-top: 20px;">
          Recommencer le quiz
        </button>
      </div>
    `;
  }
}

function afficherResultat() {
  stopTimer(); 
  const username = sessionStorage.getItem("userKey");

  sectionQuestion.innerHTML = `
    <div style="text-align: center; padding: 30px;">
      <h2>🎉 Quiz terminé ! 🎉</h2>
      <h3>Félicitations ${username} !</h3>
      <div style="font-size: 24px; margin: 20px 0;">
        <strong>Score : ${score}/${questionResponce.length}</strong>
      </div>
      <div style="margin: 20px 0;">
        ${
          score > questionResponce.length / 2
            ? '<p style="color: orange; font-weight: bold;">👏 Bien joué ! Vous avez de bonnes connaissances !</p>'
            : '<p style="color: red; font-weight: bold;">💪 Continuez à apprendre, vous allez y arriver !</p>'
        }
      </div>
      <button onclick="recommencerQuiz()" style="background: #4CAF50; color: white; padding: 15px 30px; border: none; border-radius: 25px; font-weight: bold; cursor: pointer; margin-top: 20px;">
        Recommencer le quiz
      </button>
    </div>
  `;
}

function recommencerQuiz() {
  location.reload();
}
