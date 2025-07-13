from flask import Flask, request, jsonify
import xgboost as xgb
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
import joblib


from flask_cors import CORS

app = Flask(__name__)
CORS(app)
from flask import send_from_directory

# Route for homepage
@app.route('/')
def root():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('.', filename)

# Load trained model and scaler
model = joblib.load("xgb_model.pkl")
scaler = joblib.load("scaler.pkl")

# Feature order (must match training order)
features = [
    'communication_frequency', 'collaboration_success', 'humor_score',
    'interest_alignment', 'learning_compatibility', 'time_invested_together',
    'conflict_frequency', 'conflict_resolution_rate', 'supportiveness_score',
    'mutual_respect_level', 'AI_model_similarity', 'inside_joke_count',
    'gift_exchange', 'trust_score', 'future_discussions',
    'eye_contact_frequency', 'random_smile_events', 'blush_response_rate',
    'proximity_behavior', 'voice_pitch_variation', 'shared_gaze_events',
    'fidgeting_near_them', 'accidental_touches', 'smile_match_rate',
    'heartbeat_spike', 'daydream_mentions', 'jealousy_trigger_count',
    'protectiveness_score', 'reaction_to_praise', 'interest_peek_frequency'
]

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    input_data = [data.get(f, 0) for f in features]
    scaled_input = scaler.transform([input_data])
    prediction = model.predict(scaled_input)[0]
    
    label_map = {0: "Just Friends", 1: "Great Pair", 2: "Meant to Be"}
    return jsonify({
        "label": int(prediction),
        "meaning": label_map.get(int(prediction), "Unknown")
    })

if __name__ == "__main__":
    app.run(debug=True)