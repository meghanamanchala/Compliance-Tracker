from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Load MongoDB URI (use local if not set)
app.config["MONGO_URI"] = os.getenv("MONGO_URI", "mongodb://localhost:27017/compliance_db")
mongo = PyMongo(app)

# Ensure MongoDB connection is established
if mongo.db is None:
    print("Error: MongoDB connection failed!")
else:
    print("✅ Connected to MongoDB")

# Define collection reference correctly
compliance_collection = mongo.db.compliances

# API to save compliance
@app.route("/api/compliances", methods=["POST"])
def save_compliance():
    try:
        data = request.json
        compliance_collection.insert_one(data)
        return jsonify({"message": "Compliance saved successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# API to fetch all compliances
@app.route("/api/compliances", methods=["GET"])
def get_compliances():
    try:
        compliances = list(compliance_collection.find({}, {"_id": 0}))  # Exclude _id from response
        return jsonify(compliances), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
