# 🌌 Artifacts Tracker Web App

Welcome to the **Artifacts Tracker**, a web application designed to manage and explore historical artifacts. Users can register, log in, and contribute artifact data to a shared catalog. This app features JWT-based authentication and MongoDB backend integration.

live link : https://steady-gingersnap-13c2a6.netlify.app/
---

## 🎯 Purpose

This application serves as a platform to:
- Digitally catalog historical artifacts.
- Allow authenticated users to add, view, and manage artifacts.
- Practice modern full-stack development with secure authentication.

---

## 🚀 Key Features

- ✅ **User Registration & Login**
- 🔒 **JWT Authentication** (custom token, not Firebase)
- 📌 **Add, Edit, View Artifact Details**
- 📦 **MongoDB Backend Integration**
- 🔍 **Artifact Search by Name**
- 🧪 **Form Validation & Error Handling**
- 📁 **LocalStorage for Theme Preferences**
- 🧾 **Role-based Route Protection (optional)**
- 🎨 **Clean, Responsive UI**

---

## 🧱 Tech Stack

### 🖥️ Frontend:
- **React** – UI library
- **React Router DOM** – Routing
- **Axios** – HTTP requests
- **React Toastify** – Notifications

### 🛠️ Backend:
- **Node.js** – Runtime
- **Express.js** – Server framework
- **MongoDB** – Database
- **jsonwebtoken** – JWT token creation & verification
- **bcryptjs** – Password hashing
- **dotenv** – Environment variable support
- **cors** – Cross-Origin support

---

## 📁 Project Structure (Simplified)

/client
├── src/
│ ├── components/
│ ├── pages/
│ ├── context/
│ ├── App.jsx
│ └── main.jsx
└── public/

/server
├── index.js
├── routes/
├── controllers/
└── .env
