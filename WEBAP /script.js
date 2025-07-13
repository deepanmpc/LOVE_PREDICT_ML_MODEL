// script.js
document.getElementById("startQuizBtn").addEventListener("click", () => {
  document.getElementById("noticeScreen").style.display = "none";
  document.getElementById("quizForm").style.display = "block";
  loadQuestion(current); // start quiz
});

const questions = [
  { label: "communication_frequency", title: "1. Communication Frequency", desc: "How often do they communicate? (0 - rarely, 10 - very often)", min: 0, max: 10 },
  { label: "collaboration_success", title: "2. Collaboration Success", desc: "How successful are they at working together? (0 - poor, 1 - great)", min: 0, max: 1 },
  { label: "humor_score", title: "3. Humor Score", desc: "How much humor do they share? (0 - none, 10 - constant jokes)", min: 0, max: 10 },
  { label: "interest_alignment", title: "4. Interest Alignment", desc: "Do they have common interests? (0 - not at all, 1 - yes)", min: 0, max: 1 },
  { label: "learning_compatibility", title: "5. Learning Compatibility", desc: "Can they learn well from each other? (0 - no, 1 - yes)", min: 0, max: 1 },
  { label: "time_invested_together", title: "6. Time Invested Together", desc: "How much time do they spend together? (0 - none, 40 - very often)", min: 0, max: 40 },
  { label: "conflict_frequency", title: "7. Conflict Frequency", desc: "How often do they have disagreements? (0 - never, 10 - very frequent)", min: 0, max: 10 },
  { label: "conflict_resolution_rate", title: "8. Conflict Resolution Rate", desc: "How often do they resolve conflicts? (0 - never, 1 - always)", min: 0, max: 1 },
  { label: "supportiveness_score", title: "9. Supportiveness Score", desc: "How supportive are they of each other? (0 - not supportive, 10 - very supportive)", min: 0, max: 10 },
  { label: "mutual_respect_level", title: "10. Mutual Respect", desc: "How much respect do they have for each other? (0 - none, 1 - high)", min: 0, max: 1 },
  { label: "AI_model_similarity", title: "11. AI Model Similarity", desc: "Are their AI models similar? (0 - different, 1 - same)", min: 0, max: 1 },
  { label: "inside_joke_count", title: "12. Inside Jokes", desc: "How many inside jokes do they share? (0 - none, 20 - lots)", min: 0, max: 20 },
  { label: "gift_exchange", title: "13. Gift Exchange", desc: "Have they exchanged gifts? (0 - no, 1 - yes)", min: 0, max: 1 },
  { label: "trust_score", title: "14. Trust Score", desc: "How much do they trust each other? (0 - none, 10 - full trust)", min: 0, max: 10 },
  { label: "future_discussions", title: "15. Future Discussions", desc: "Have they discussed the future together? (0 - no, 1 - yes)", min: 0, max: 1 },
  { label: "eye_contact_frequency", title: "16. Eye Contact", desc: "How often do they make eye contact? (0 - never, 10 - always)", min: 0, max: 10 },
  { label: "random_smile_events", title: "17. Smiling Randomly", desc: "How often do they smile randomly at each other? (0 - never, 20 - very often)", min: 0, max: 20 },
  { label: "blush_response_rate", title: "18. Blush Rate", desc: "How often do they blush around each other? (0 - never, 1 - frequently)", min: 0, max: 1 },
  { label: "proximity_behavior", title: "19. Proximity Behavior", desc: "How close do they sit/stand? (0 - far, 2 - very close)", min: 0, max: 2 },
  { label: "voice_pitch_variation", title: "20. Voice Pitch Variation", desc: "Do they change voice tone while speaking? (0 - no, 10 - a lot)", min: 0, max: 10 },
  { label: "shared_gaze_events", title: "21. Shared Gaze", desc: "How often do they hold eye contact? (0 - never, 15 - very often)", min: 0, max: 15 },
  { label: "fidgeting_near_them", title: "22. Fidgeting Near Them", desc: "Do they fidget near each other? (0 - no, 1 - yes)", min: 0, max: 1 },
  { label: "accidental_touches", title: "23. Accidental Touches", desc: "How often do they accidentally touch? (0 - never, 10 - frequently)", min: 0, max: 10 },
  { label: "smile_match_rate", title: "24. Smile Match Rate", desc: "How often do they smile together? (0 - never, 1 - always)", min: 0, max: 1 },
  { label: "heartbeat_spike", title: "25. Heartbeat Spike", desc: "Heartbeat increase around each other (0 - none, 120 - very high)", min: 0, max: 120 },
  { label: "daydream_mentions", title: "26. Daydream Mentions", desc: "How often are they mentioned in each other's daydreams? (0 - never, 10 - often)", min: 0, max: 10 },
  { label: "jealousy_trigger_count", title: "27. Jealousy Trigger Count", desc: "How often do they feel jealous? (0 - never, 5 - often)", min: 0, max: 5 },
  { label: "protectiveness_score", title: "28. Protectiveness", desc: "How protective are they of each other? (0 - not at all, 10 - very)", min: 0, max: 10 },
  { label: "reaction_to_praise", title: "29. Reaction to Praise", desc: "How do they respond to praise? (0 - negatively, 2 - very positively)", min: 0, max: 2 },
  { label: "interest_peek_frequency", title: "30. Interest Peek Frequency", desc: "How often do they show interest in each other? (0 - never, 10 - always)", min: 0, max: 10 }
];

let current = 0;
const questionTitle = document.getElementById("questionTitle");
const questionDesc = document.getElementById("questionDesc");
const answerInput = document.getElementById("answerInput");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const answers = {};

function loadQuestion(index) {
  const q = questions[index];
  questionTitle.innerText = q.title;
  questionDesc.innerText = q.desc;
  answerInput.min = q.min;
  answerInput.max = q.max;
  answerInput.step = 0.1;
  answerInput.value = answers[q.label] !== undefined ? answers[q.label] : "";
  prevBtn.style.display = index === 0 ? "none" : "inline-block";
  nextBtn.innerText = index === questions.length - 1 ? "Submit" : "Next";
}

nextBtn.addEventListener("click", () => {
  const value = parseFloat(answerInput.value);
  const q = questions[current];
  if (isNaN(value) || value < q.min || value > q.max) {
    alert(`Please enter a value between ${q.min} and ${q.max}`);
    return;
  }
  answers[q.label] = value;
  if (current < questions.length - 1) {
    current++;
    loadQuestion(current);
  } else {
    // Send answers to backend
fetch("http://127.0.0.1:5000/predict", {   
     method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers)
    })
      .then(res => res.json())
      .then(result => {
        if (window.showQuizResult) {
          window.showQuizResult(result);
        } else {
          alert("Prediction: " + result.meaning);
        }
      })
      .catch(err => {
        alert("There was an error submitting your answers.");
        console.error(err);
      });
  }
});

prevBtn.addEventListener("click", () => {
  if (current > 0) {
    current--;
    loadQuestion(current);
  }
});

window.onload = () => loadQuestion(current);