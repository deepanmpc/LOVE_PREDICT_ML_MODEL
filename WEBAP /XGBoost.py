import pandas as pd
import joblib
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import xgboost as xgb
from sklearn.metrics import classification_report

# Load and preprocess data
data = pd.read_csv('Download the modified dataset with class 2 samples')  # Replace with actual filename

# Encode categorical values
data['AI_model_similarity'] = data['AI_model_similarity'].map({'same': 1, 'different': 0})
data['proximity_behavior'] = data['proximity_behavior'].map({'close': 2, 'medium': 1, 'far': 0})
data['reaction_to_praise'] = data['reaction_to_praise'].astype('category').cat.codes

# Shuffle the dataset
data = data.sample(frac=1, random_state=42)

# Define features and label
X = data.drop(columns=['label', 'final_label'])
y = data['final_label']

# Train-test split
x_train, x_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Standardize features
scaler = StandardScaler()
x_train_scaled = scaler.fit_transform(x_train)
x_test_scaled = scaler.transform(x_test)

# Train XGBoost model
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

xgb_model.fit(x_train_scaled, y_train)

# Evaluate model (optional)
y_pred = xgb_model.predict(x_test_scaled)
print("Classification Report:")
print(classification_report(y_test, y_pred))

# Save the model and scaler
joblib.dump(xgb_model, 'xgb_model.pkl')
joblib.dump(scaler, 'scaler.pkl')

print("✅ Model and scaler saved successfully as 'xgb_model.pkl' and 'scaler.pkl'")