from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)


app.config["MONGO_URI"] = os.getenv("MONGO_URI", "mongodb://localhost:27017/compliance_db")
mongo = PyMongo(app)

if mongo.db is None:
    print("Error: MongoDB connection failed!")
else:
    print("✅ Connected to MongoDB")

compliance_collection = mongo.db.compliances

@app.route("/api/compliances", methods=["POST"])
def save_compliance():
    try:
        data = request.json
        existing = compliance_collection.find_one({"complianceName": data.get("complianceName")})
        
        if existing:
            return jsonify({"message": "Compliance already exists"}), 400
        compliance_collection.insert_one(data)
        return jsonify({"message": "Compliance saved successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/compliances", methods=["GET"])
def get_compliances():
    try:
        compliances = list(compliance_collection.find({}, {"_id": 0}))  # Exclude _id from response
        return jsonify(compliances), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

users_collection = mongo.db.users

@app.route("/api/register", methods=["POST"])
def register():
    try:
        data = request.json
        existing_user = users_collection.find_one({"email": data["email"]})

        if existing_user:
            return jsonify({"message": "User already exists"}), 400

        users_collection.insert_one({"email": data["email"], "password": data["password"], "role": data["role"]})
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/login", methods=["POST"])
def login():
    try:
        data = request.json
        user = users_collection.find_one({"email": data["email"]})

        if not user or user["password"] != data["password"]:
            return jsonify({"message": "Invalid email or password"}), 401

        return jsonify({"message": "Login successful", "role": user["role"]}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500 
               
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5000)), debug=True)
