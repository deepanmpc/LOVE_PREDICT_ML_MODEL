#  LOVE_PREDICT_ML_MODEL

## What It Does
This machine learning model predicts **relationship compatibility** based on behavioral, emotional, and psychological features from two individuals. The system classifies their connection into one of **three categories**:

- `0` – Just Friends
- `1` – Could Work Out
- `2` – Strong Match

It uses a **trained XGBoost classifier** (94.5% accuracy) and supports Random Forest (88.6% accuracy) as an alternative. A web-based quiz interface collects answers for 30 relationship-based questions and sends them to the ML backend for prediction.

---

## ⚙️ Setup & Installation

```bash
git clone https://github.com/<your-username>/LOVE_PREDICT_ML_MODEL.git
cd LOVE_PREDICT_ML_MODEL

# (Optional) Create virtual environment
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

Or manually:

```bash
pip install pandas scikit-learn xgboost joblib flask
```

---

##  Training the Model

```bash
python train_model.py
```

This will:
- Load your dataset (CSV)
- Train the XGBoost model
- Save:
  - `xgb_model.pkl` – trained model
  - `scaler.pkl` – fitted StandardScaler

---

##  How to Use

- Start your Flask server:
```bash
python app.py
```

- Send a POST request with all 30 features:
```bash
curl -X POST http://localhost:5000/predict \
     -H "Content-Type: application/json" \
     -d '{ "communication_frequency": 8, "trust_score": 9, ..., "reaction_to_praise": 2 }'
```

- Output:
```json
{
  "prediction": 2
}
```

---

##  Web UI

The frontend (HTML/CSS/JS) provides:
- A landing page with explanation
- A 30-question quiz (1 question at a time)
- Disclaimer + accuracy notice
- Sends input to `/predict` endpoint and shows compatibility result

---

##  Folder Structure

```
LOVE_PREDICT_ML_MODEL/
│
├── model/
│   ├── xgb_model.pkl          # Trained model
│   ├── scaler.pkl             # StandardScaler
│
├── backend/
│   ├── app.py                 # Flask app for prediction
│   ├── train_model.py         # Model training script
│
├── frontend/
│   ├── index.html             # Landing page
│   ├── quiz.html              # Quiz form
│   ├── styles.css             # UI styling
│   ├── script.js              # Question logic + animation
│
├── data/
│   ├── your_dataset.csv       # 30-feature CSV with labels
│
└── README.md
```

---

##  Disclaimer

- **This tool is for entertainment and educational use only.**
- It is not meant for serious relationship decisions.
- Accuracy:  
  - XGBoost: **94.5%**  
  - Random Forest: **88.6%**

---

##  Dependencies

- `pandas`
- `scikit-learn`
- `xgboost`
- `joblib`
- `flask`
- (Optional) `uvicorn`, `fastapi` if using a FastAPI backend

---

## Author

**Deepan**  
Made with  for AI + Relationship Fun

---

##  License

This project is open-sourced under the **MIT License**.
