
# Compliance Tracker

A web-based compliance management system built with **React (Frontend)** and **Flask (Backend)**, using **MongoDB** as the database.

## Features
- Add, fetch, and manage compliance records
- Store compliance details including name, dates, categories, description, and documents
- Prevent duplicate compliance entries
- User-friendly interface with filters
- Deployed backend on **Render** and frontend on **Vite (React)**

## Tech Stack
- **Frontend**: React, TailwindCSS
- **Backend**: Flask, Flask-PyMongo, Flask-CORS, Gunicorn
- **Database**: MongoDB

---

## Installation
### **1. Clone the Repository**
```sh
git clone https://github.com/your-username/compliance-tracker.git
cd compliance-tracker
```

### **2. Backend Setup**
#### **Navigate to the backend folder:**
```sh
cd backend
```
#### **Create a virtual environment (optional but recommended):**
```sh
python -m venv venv
venv\Scripts\activate  # Windows
```
#### **Install dependencies:**
```sh
pip install -r requirements.txt
```
#### **Create a `.env` file for environment variables:**
```sh
touch .env
```
Add the following to `.env`:
```
MONGO_URI=mongodb://localhost:27017/compliance_db
PORT=5000
```
#### **Run the Flask server:**
```sh
python server.py
```
The server will start at `http://localhost:5000`

---

### **3. Frontend Setup**
#### **Navigate to the frontend folder:**
```sh
cd ../frontend
```
#### **Install dependencies:**
```sh
npm install
```
#### **Run the frontend server:**
```sh
npm run dev
```
The frontend will be available at `http://localhost:5173`

---

## API Endpoints
### **1. Get All Compliances**
**GET** `/api/compliances`
#### **Response:**
```json
[
  {
    "complianceName": "Company A",
    "startDate": "2025-04-01",
    "endDate": "2025-06-01",
    "categories": ["IT", "Testing"],
    "description": "Quarterly audit compliance",
  }
]
```

### **2. Add Compliance**
**POST** `/api/compliances`
#### **Request Body:**
```json
{
  "complianceName": "Company B",
  "startDate": "2025-04-01",
  "endDate": "2025-06-01",
  "categories": ["Security", "Audit"],
  "description": "Annual security compliance",
}
```
#### **Response:**
```json
{ "message": "Compliance saved successfully" }
```

---

## Deployment
### **Backend Deployment (Render)**
- Deploy using **Gunicorn**:
```sh
pip install gunicorn
```
- Run Flask app using Gunicorn:
```sh
gunicorn -w 4 -b 0.0.0.0:5000 server:app
```
- Deploy on **Render** using `render.yaml` config.

### **Frontend Deployment (Vercel/Netlify)**
- Build the project:
```sh
npm run build
```
- Deploy the `dist/` folder using **Vercel**, **Netlify**, or **GitHub Pages**.

---

## Author
Developed by **[Meghana]** - Reach out at [meghana.m@kalvium.community]
 
---

## Video link: 
https://drive.google.com/file/d/1d1p9AqqkFzHk7j8HzI4eW06EnlfhrViu/view?usp=sharing