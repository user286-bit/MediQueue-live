# 🏥 MediQueue — Smart Hospital Crowd Management

> **Check hospital crowd levels before you leave home.**
> Real-time data · AI predictions · Built for Hyderabad

---

## 📌 Overview

**MediQueue** is a web-based healthcare platform that allows users to check live hospital crowd levels before visiting. Hospital staff update crowd status in real time through a secured admin panel, and users can instantly see which hospitals have the shortest wait times — all from home.

---

## 🚀 Features

| Feature | Description |
|---|---|
| 🔐 Google Sign-In | Secure authentication via Firebase |
| 📊 Live Crowd Data | Real-time Low / Medium / High crowd status |
| 🤖 AI Predictions | Hourly crowd pattern predictions per hospital |
| 🔴 Admin Dashboard | Protected panel for hospital staff to update levels |
| 📋 Activity Log | Track every crowd update made in a session |

---

## 🗂️ Project Structure

```
MEDI/
│
├── index.html              
├── home.html               
├── hospital-check.html     
├── suggestions.html        
├── contact.html            
├── profile.html            
├── admin.html               
│
├── css/
│   └── navbar.css          
│   ├── global.css          
│
└── js/
    ├── firebase-config.js
    ├── auth.js             
    ├── navbar.js           
    └── hospitals.js        
```

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, JavaScript |
| Authentication | Firebase Authentication (Google OAuth) |
| Database | Cloud Firestore|

---

## 🔧 Setup & Installation

### Step 1 — Clone the repository

```bash
# https://github.com/MARYAMAHMED08/MediQueue.git
```

cd MEDI.

---

### Step 2 — Create a Firebase Project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add Project** → name it `mediqueue-app`
3. Disable Google Analytics → **Create Project**

---

### Step 3 — Enable Google Sign-In

1. In Firebase Console → **Authentication** → **Sign-in method**
2. Click **Google** → Toggle **Enable** → Add a support email → **Save**

---

### Step 4 — Create Firestore Database

1. Firebase Console → **Firestore Database** → **Create database**
2. Select **Start in test mode**
3. Choose a location.

---

### Step 5 — Get Firebase Config Keys

1. Firebase Console → ⚙️ **Project Settings**
2. Scroll to **Your apps** → Click **`</>`** (Web app)
3. Register app as `mediqueue` → Copy the config object

---

### Step 6 — Paste Config into the Project

Open `js/firebase-config.js` and Paste Config:

```javascript
const firebaseConfig = {
  apiKey:            
  authDomain:       
  projectId:        
  storageBucket:   
  messagingSenderId: 
  appId:            
};
```

---

### Step 7 — Set Admin Emails

In `js/firebase-config.js`, add the Gmail addresses that should have admin access:

```javascript
const ADMIN_EMAILS = [
  "yourgmail@gmail.com"      
  "yourgmail@gmail.com"
];
```

> ⚠️ Only these emails can access `admin.html`. All others are automatically redirected.

---

### Step 8 — Add Firestore Security Rules

Firebase Console → Firestore → **Rules** tab → Replace with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Click **Publish**.

---

### Step 9 — Run the Project

1. Install **Live Server** extension in VS Code
2. Right-click `index.html` → **Open with Live Server**
3. Browser opens at `http://127.0.0.1:5500`
4. Sign in with Google → you're in! ✅

---

### Step 10 — Add Hospital Data 

Since the database is empty on first launch, add hospitals manually:

1. Firebase Console → **Firestore** → **Data** → **+ Start collection**
2. Collection ID: `hospitals`

> ✅ After adding hospitals once, the **Admin Panel** handles all future updates — no Firebase Console needed again.

---

## 🌐 Firestore Data Structure

```
firestore/
└── hospitals/
│   └── {documentId}/
│       ├── name:        "Gandhi Hospital"
│       ├── address:     "Musheerabad, Hyderabad"
│       ├── phone:       "040-2460-0124"
│       ├── crowd:       "low" | "medium" | "high"
│       ├── lastUpdated: timestamp
│       └── updatedBy:   "admin@gmail.com"
│
```

---

## 🔒 Admin Security Notes

- Admin access is controlled by `ADMIN_EMAILS` in `firebase-config.js`
- Non-admin users who visit `admin.html` are **automatically blocked** and redirected
- Firestore rules ensure only authenticated users can read/write data
- For production, update Firestore rules to restrict writes to admin emails only

---

© 2026 MediQueue — Built for better healthcare access.

---

*Made with ❤️ for smarter hospital visits.*
