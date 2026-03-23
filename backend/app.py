from flask import Flask, request, jsonify
import joblib
import numpy as np
import os

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model = joblib.load(os.path.join(BASE_DIR, "../model/xgb_model.pkl"))
scaler = joblib.load(os.path.join(BASE_DIR, "../model/scaler.pkl"))

@app.route("/")
def home():
    return "ML API is running"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        features = np.array(list(data.values())).reshape(1, -1)
        features = scaler.transform(features)
        prediction = model.predict(features)[0]
        return jsonify({
            "prediction": int(prediction)
        })
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

if __name__ == "__main__":
    app.run(debug=True)
