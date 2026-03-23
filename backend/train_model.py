import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import xgboost as xgb
import joblib
import os

# ── Load dataset ────────────────────────────────────────────────────────────
# Update this path to your local CSV file before running
DATA_PATH = os.environ.get(
    "DATA_PATH",
    "Download the modified dataset with class 2 samples"
)

data = pd.read_csv(DATA_PATH)

# ── Encode categorical columns (match notebook preprocessing) ────────────────
data['AI_model_similarity'] = data['AI_model_similarity'].map({'same': 1, 'different': 0})
data['proximity_behavior'] = data['proximity_behavior'].map({'close': 2, 'medium': 1, 'far': 0})
data['reaction_to_praise'] = data['reaction_to_praise'].astype('category').cat.codes

# ── Split features / labels ──────────────────────────────────────────────────
data = data.sample(frac=1, random_state=42)
X = data.drop(columns=['label', 'final_label'])
y = data['final_label']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ── Scale ────────────────────────────────────────────────────────────────────
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled  = scaler.transform(X_test)

# ── Train XGBoost ────────────────────────────────────────────────────────────
xgb_model = xgb.XGBClassifier(
    objective='multi:softmax',
    num_class=3,
    n_estimators=300,
    max_depth=8,
    learning_rate=0.1,
    subsample=0.8,
    colsample_bytree=0.8,
    use_label_encoder=False,
    eval_metric='mlogloss',
    random_state=42
)
xgb_model.fit(X_train_scaled, y_train)

y_pred = xgb_model.predict(X_test_scaled)
print("Classification Report:")
print(classification_report(y_test, y_pred))

# ── Save artifacts ────────────────────────────────────────────────────────────
os.makedirs("../model", exist_ok=True)
joblib.dump(xgb_model, "../model/xgb_model.pkl")
joblib.dump(scaler,    "../model/scaler.pkl")
print("Model and scaler saved to /model/")
