require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Compliance Schema
const ComplianceSchema = new mongoose.Schema({
    complianceName: String,
    startDate: String,
    endDate: String,
    targetDays: String,
    frequency: String,
    vendor: String,
    auditor: String,
    priority: String,
    categories: [String],
    description: String,
    documents: [String], // Store file paths or URLs
});

const Compliance = mongoose.model("Compliance", ComplianceSchema);

// API to save compliance
app.post("/api/compliances", async (req, res) => {
    try {
        const newCompliance = new Compliance(req.body);
        await newCompliance.save();
        res.status(201).json({ message: "Compliance saved", data: newCompliance });
    } catch (error) {
        res.status(500).json({ error: "Error saving compliance" });
    }
});

// API to fetch all compliances
app.get("/api/compliances", async (req, res) => {
    try {
        const compliances = await Compliance.find();
        res.json(compliances);
    } catch (error) {
        res.status(500).json({ error: "Error fetching compliances" });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
