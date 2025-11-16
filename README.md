# 🤖 Project: Full-Stack AI Chatbot (MERN + NLP)

This project is a comprehensive, full-stack AI chatbot built from the ground up using the MERN stack (MongoDB, Express, React, Node.js) and a custom-trained Natural Language Processing (NLP) model.

It's not just a simple bot; it's a complete web application featuring secure user authentication, persistent, user-specific chat memory, and a modern, responsive interface with light/dark modes.

## 🚀 Live Demo

**Check out the live application:** **[https://chatbot-git-main-harsh-yadavs-projects-fe403f4d.vercel.app/](https://chatbot-git-main-harsh-yadavs-projects-fe403f4d.vercel.app/)**

*(Note: The backend is hosted on a free Render plan, so it may take 30-60 seconds for the server to "wake up" on the first request.)*

---

## 📸 Screenshots


### 🏠 Landing Page

|                      Light Mode                       |                     Dark Mode                     |
| :---------------------------------------------------: | :-----------------------------------------------: |
| ![Landing Light](frontend/Assets/landing_without.png) | ![Landing Dark](frontend/Assets/landing_with.png) |

---

### 📘 Instructions Page

|                     Instructions                     |
| :--------------------------------------------------: |
| ![Instructions Page](frontend/Assets/Guidelines.png) |

---

### 🔐 Authentication Pages

|              Signup Page              |             Login Page              |
| :-----------------------------------: | :---------------------------------: |
| ![Signup](frontend/Assets/signup.png) | ![Login](frontend/Assets/login.png) |

---

### 💬 Chat Interface

|               Chat (Light Mode)                |               Chat (Dark Mode)                |
| :--------------------------------------------: | :-------------------------------------------: |
| ![Chat Light](frontend/Assets/login_white.png) | ![Chat Dark](frontend/Assets/login_black.png) |

---

### 🗂️ Dashboard (History Save)

|                   History Sidebar                    |        Saved Chat View         |
| :--------------------------------------------------: | :----------------------------: |
| ![History Sidebar](frontend/Assets/chat_history.png) | ![Saved Chat](IMAGE_LINK_HERE) |

---


## ✨ Features

* **Custom AI Model:** Trained using `node-nlp` on a custom `Intent.json` dataset to understand 20+ intents, including jokes, gossip, time queries, and complex greetings.
* **Full User Authentication:** Secure signup (with name, email, password) and login functionality using **JWT (JSON Web Tokens)** and `bcrypt` for password hashing.
* **Persistent Chat History:** Logged-in users have their entire conversation history securely saved to a MongoDB database.
* **Anonymous Chat Mode:** Guests can use the bot without logging in. Their chat history is not saved, ensuring privacy.
* **User-Specific History:** The chat history is linked directly to the user's account, allowing them to log in from any device and continue their conversation.
* **History Dashboard:** A collapsible sidebar (dashboard) displays the user's recent chat history for quick reference.
* **Light/Dark Theme Toggle:** A seamless theme switcher (Light/Dark mode) that respects user preference and saves it in `localStorage`.
* **Info Modal:** An information modal explains the bot's capabilities and limitations to the user.
* **Responsive UI:** A clean, modern interface built with **React** that works on both desktop and mobile devices.

---

## 🛠️ Tech Stack

This project is divided into two main parts: a React frontend and a Node.js backend.

### Frontend
* **React (v18+):** For building the user interface.
* **Vite:** As the frontend build tool.
* **React Router:** For handling client-side routing (Login, Signup, Home).
* **React Context API:** For global state management (Authentication and Theme).
* **Axios:** For making API requests to the backend.
* **CSS:** For all custom styling, including the responsive layout and theme toggle.

### Backend
* **Node.js:** As the runtime environment.
* **Express.js:** As the API framework.
* **MongoDB:** As the NoSQL database for storing user and message data.
* **Mongoose:** For Object Data Modeling (ODM) with MongoDB.
* **JSON Web Tokens (JWT):** For handling secure user authentication.
* **Bcrypt.js:** For hashing user passwords.
* **`node-nlp`:** The core AI library used to train and run the intent-classification model.
* **Dotenv:** For managing environment variables.
* **CORS:** For enabling cross-origin requests.

---

## ☁️ Deployment Architecture

This project uses a **hybrid deployment model** for optimal performance and scalability:

* **Frontend (React/Vite):** Deployed on **Vercel**. Vercel is highly optimized for serving static files (like a React app) quickly and efficiently across the globe via its edge network.
* **Backend (Node.js/Express):** Deployed on **Render**. Render is used to host the persistent Node.js server. This is necessary because the backend is a stateful service that needs to be running 24/7 to handle API requests, manage database connections, and serve the loaded NLP model.

---

## ⚙️ Getting Started: Local Installation

To run this project on your local machine, follow these steps:

### Prerequisites
* Node.js (v18 or higher recommended)
* npm (Node Package Manager)
* A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (for the database)

### 1. Backend Setup (`/backend` folder)

1.  Clone the repository and navigate to the `backend` folder:
    ```bash
    git clone [https://github.com/thistooshallpasss/Chatbot.git](https://github.com/thistooshallpasss/Chatbot.git)
    cd Chatbot/backend
    ```
2.  Install all required dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` folder and add your environment variables.
    ```env
    # Aapki MongoDB Atlas connection string
    MONGO_URI=mongodb+srv://your_user:your_password@cluster...
    
    # Ek secret key (kuch bhi random text)
    JWT_SECRET=this_is_a_super_secret_key_for_my_project
    ```
4.  **Train the AI model:** This command reads `data/intents.json` and creates the `model/chatbot-model.json` file.
    ```bash
    npm run train
    ```
5.  Start the backend server (in development mode):
    ```bash
    npm run dev
    ```
The backend will now be running on `http://localhost:3001`.

### 2. Frontend Setup (`/frontend` folder)

1.  Open a **new terminal** and navigate to the `frontend` folder:
    ```bash
    cd ../frontend
    ```
2.  Install all required dependencies:
    ```bash
    npm install
    ```
3.  The frontend is set up to automatically connect to `http://localhost:3001/api`. You don't need a `.env` file for local development.
4.  Start the frontend development server:
    ```bash
    npm run dev
    ```
The application will now be running and accessible at `http://localhost:5173`.

---

## 🚀 Project Journey & Evolution

This project was built in iterative stages, evolving from a simple bot script into a full-fledged web application.

1.  **Checkpoint 1: The Core AI:** The initial goal was to build a simple AI chatbot. We used `node-nlp` to train a model on a custom `Intent.json` file, allowing the bot to understand and respond to 20+ different intents like jokes, gossip, and greetings.

2.  **Checkpoint 2: Full-Stack Integration:** We moved from a simple script to a full MERN-stack architecture. This involved building a Node.js/Express backend to serve the model via an API and a React/Vite frontend to create a modern chat interface.

3.  **Checkpoint 3: Adding Memory:** A simple bot is fun, but a *smart* bot has memory. We integrated MongoDB to save the chat history, making the bot stateful.

4.  **Checkpoint 4: Making it Personal:** To have *personal* memory, we needed users. This was the biggest update, where we implemented:
    * **User Authentication:** A complete auth system with JWT, `bcrypt`, and protected routes.
    * **User-Specific History:** The `Message` model in MongoDB was linked to a `User` model, allowing users to log in and see only their own past conversations.
    * **Anonymous Mode:** A separate, non-protected API route was created for guests.

5.  **Checkpoint 5: The Final Polish:** With the core functionality complete, we added the professional features you see today:
    * A **Theme Toggle** (Light/Dark mode) using React Context.
    * A **History Dashboard** (sidebar) to view past chats.
    * A polished header that displays the user's name and an info modal for bot limitations.

---
