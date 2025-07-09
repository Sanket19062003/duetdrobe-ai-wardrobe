# Wardrobe AI - Outfit Recommender & Social Stylist

## Overview
AI-powered mobile app where users upload images of themselves in individual clothes. The AI suggests outfit combinations based on event type, weather, and user preferences. Includes a pairing mode to coordinate outfits with another person. Designed for Indian fashion styles, events, and cultural preferences.

## Goals
- Allow users to digitize their wardrobe by uploading full-body photos in clothes.
- Use AI to suggest outfit combinations based on weather, events, and daily trends.
- Provide social pairing mode for two users to get matching outfit suggestions.
- Ensure privacy, image security, and user-friendly design for the Indian audience.
- Avoid issues seen in competitors: poor UX, repetitive AI suggestions, unstable uploads.

## Tech Stack
- **Frontend:** React Native (Expo) + Tailwind CSS (NativeWind), Redux
- **Backend:** Node.js + Express.js, MongoDB, JWT
- **AI:** TensorFlow.js (on-device), PyTorch (backend)
- **Storage:** Firebase Storage
- **Weather API:** OpenWeatherMap
- **Calendar API:** Google Calendar (optional)
- **Image Processing:** OpenCV + MediaPipe or YOLOv8

## Structure
- `frontend/` - React Native app
- `backend/` - Node.js/Express API
- `ai/` - AI/ML models and scripts

---

## Setup Instructions
(Instructions will be added as we build each part)

---

## **Step 2.1: Initialize Node.js Project in `backend/`**

We’ll:
- Create a `package.json` (project manifest)
- Add a basic folder structure for clean code

**Directory structure:**
```
backend/
  src/
    controllers/
    models/
    routes/
    app.js
  .env
  .gitignore
  package.json
```

---

## **Step 2.2: Install Dependencies**

We’ll need:
- `express` (web server)
- `mongoose` (MongoDB ODM)
- `dotenv` (for environment variables)
- `jsonwebtoken` (for JWT auth)
- `cors` (for cross-origin requests)
- `nodemon` (for development auto-reload, as a dev dependency)

---

## **Step 2.3: Create Basic Express Server**

- Set up a simple server in `src/app.js`
- Add a health check endpoint: `/api/health`
- Connect to MongoDB (we’ll use a placeholder URI for now)
- Use environment variables for sensitive info

---

## **Step 2.4: Add JWT Auth Skeleton**

- Add a placeholder middleware for JWT authentication (no real user logic yet)

---

## **Step 2.5: Commit and Push**

---

### **Let’s start with 2.1 and 2.2: Initialize and Install**

**Commands to run:**
```sh
cd backend
npm init -y
npm install express mongoose dotenv jsonwebtoken cors
npm install --save-dev nodemon
```

**I’ll also add a backend-specific `.gitignore` and a starter folder structure.**

---

**Let me know if you want to run these commands yourself, or I can show you the code/files for each step and you can copy-paste.  
Otherwise, I’ll proceed as if I’m running them for you and show you the resulting files and explanations.**
