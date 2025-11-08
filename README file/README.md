# 📝 Online Task Management System

![MERN](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-Educational-blue)
![Status](https://img.shields.io/badge/Status-In%20Progress-yellow)
![Build](https://img.shields.io/badge/Build-Passing-brightgreen)

---

## 🌐 Live Demo

🚀 **Frontend (Vercel):** [https://your-frontend-link.vercel.app](https://your-frontend-link.vercel.app)  
⚙️ **Backend (Render):** [https://your-backend-api.onrender.com](https://your-backend-api.onrender.com)  
💾 **Database:** MongoDB Atlas (Cloud Hosted)

---

## 📌 Project Overview

The **Online Task Management System** is a full-stack web application built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.  
It enables users to manage daily tasks efficiently through secure authentication, CRUD operations, filtering, and task progress tracking — all in one place.

---

## ✨ Main Features

### 🔐 User Authentication
- **Sign Up** – Create a new account with name, email, and password  
- **Login** – Secure login with email and password  
- **Logout** – Safe logout from your account  
- **Password Security** – Encrypted password storage  

### ✅ Task Management
- **Add Task** – Create new tasks with title and description  
- **View Tasks** – Display all tasks in a clean list  
- **Edit Task** – Update task details anytime  
- **Delete Task** – Remove unnecessary tasks  
- **Mark Complete** – Mark tasks as done or pending  

### 📊 Dashboard
- **Task Count** – Total number of tasks  
- **Completed Count** – Finished tasks  
- **Pending Count** – Remaining tasks  
- **Beautiful Design** – Modern, responsive, and user-friendly  

### 🔍 Search & Filter
- **Search** – Instantly find tasks by keywords  
- **Filter All** – Show all tasks  
- **Filter Completed** – Show only completed tasks  
- **Filter Pending** – Show only pending tasks  

### 📱 Responsive Design
- Works perfectly on **desktop**, **tablet**, and **mobile** devices  

---

## 🖼️ Screenshots

### 🔑 Login Page
![Login](screenshots/login.png)

### 📝 Register Page
![Register](screenshots/register.png)

### 📋 Dashboard
![Dashboard](screenshots/dashboard.png)

### ✅ Task List
![Tasks](screenshots/tasks.png)

---

## 🛠️ Technologies Used

### 🎨 Frontend
- **React.js** – For building UI  
- **CSS3** – For styling and animations  
- **Axios** – For API communication  

### ⚙️ Backend
- **Node.js** – JavaScript runtime  
- **Express.js** – Server framework  
- **MongoDB** – NoSQL database  
- **JWT** – For secure authentication  

---

## 📦 How to Install and Run

### 🧰 Prerequisites
Make sure you have:
- **Node.js** installed  
- **MongoDB** installed (or use **MongoDB Atlas**)  
- A code editor (like **VS Code**)  

---

### 🚀 Step 1: Download the Project

```bash
# Clone from GitHub
git clone https://github.com/Pratikg27/task-management-system.git

# Navigate to project folder
cd task-management-system


Step 2: Setup Backend (Server)
# Go to backend folder
cd backend

# Install required packages
npm install

Create a file named .env in backend folder and add:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanagement
JWT_SECRET=mySecretKey123

Start the backend:

npm start
# or
npm run dev

✅ Backend runs at: http://localhost:5000

Step 3: Setup Frontend (Client)

Open a new terminal window:

# Go to frontend folder
cd frontend

# Install dependencies
npm install

Create a file named .env in frontend folder and add:

REACT_APP_API_URL=http://localhost:5000

Start the frontend:

npm start

✅ Website opens at: http://localhost:3000

🎯 How to Use the Application

1️⃣ Create an Account
Go to /register
Enter your details → Click “Create Account”

2️⃣ Login
Go to /login
Enter credentials → Click “Sign In”

3️⃣ Add a Task
Click “Add Task”
Enter title & description → Click “Save”

4️⃣ Mark as Complete
Check the box beside a task → Task marked done

5️⃣ Edit a Task
Click “Edit” → Modify → Save changes

6️⃣ Delete a Task
Click “Delete” → Confirm → Task removed

7️⃣ Search Tasks
Type in search box → Results auto-filter

8️⃣ Filter Tasks
“All” → All tasks
“Completed” → Finished tasks
“Pending” → Remaining tasks

📁 Project Structure
task-management-system/
│
├── backend/                    # Server side
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/                   # Client side
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Dashboard.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env
│
├── screenshots/
│   ├── login.png
│   ├── register.png
│   ├── dashboard.png
│   └── tasks.png
│
└── README.md

🔌 API Endpoints (For Developers)
🧑‍💻 Authentication APIs

1️⃣ Register New User

POST /api/auth/register

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "token": "your_jwt_token"
}

2. Login User

POST /api/auth/login

Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "token": "your_jwt_token"
}

🗂️ Task APIs
3 Get All Tasks

GET /api/tasks
Authorization: Bearer your_jwt_token

Response:
{
  "success": true,
  "tasks": [
    {
      "_id": "123",
      "title": "Buy groceries",
      "description": "Milk, bread, eggs",
      "completed": false
    }
  ]
}

4. Create New Task

POST /api/tasks
Authorization: Bearer your_jwt_token

Body:
{
  "title": "New Task",
  "description": "Task details"
}

Response:
{
  "success": true,
  "message": "Task created successfully"
}

5. Update Task

PUT /api/tasks/:id
Authorization: Bearer your_jwt_token


Body:
{
  "title": "Updated Task",
  "description": "Updated details",
  "completed": true
}

Response:
{
  "success": true,
  "message": "Task updated successfully"
}

6. Delete Task

DELETE /api/tasks/:id
Authorization: Bearer your_jwt_token

Response:
{
  "success": true,
  "message": "Task deleted successfully"
}

✅ Testing Completed
All features have been tested and working perfectly:
| Feature           | Status    |
| ----------------- | --------- |
| User Registration | ✅ Working |
| User Login        | ✅ Working |
| User Logout       | ✅ Working |
| Add Task          | ✅ Working |
| Edit Task         | ✅ Working |
| Delete Task       | ✅ Working |
| Mark Complete     | ✅ Working |
| Search Tasks      | ✅ Working |
| Filter Tasks      | ✅ Working |
| Responsive Design | ✅ Working |


Tested on:
✅ Google Chrome
✅ Mozilla Firefox
✅ Microsoft Edge
✅ Mobile devices
✅ Tablets

🚀 Future Enhancements
| Feature               | Description                        |
| --------------------- | ---------------------------------- |
| 🎯 Priority Levels    | Add High, Medium, Low priorities   |
| 📅 Due Dates          | Add and track due dates            |
| 🏷️ Categories/Tags   | Organize tasks by tags             |
| 👥 Team Collaboration | Share and assign tasks             |
| 📊 Analytics          | Productivity charts and reports    |
| 🔔 Notifications      | Email & browser reminders          |
| 🌙 Dark Mode          | Light/Dark theme toggle            |
| 📱 Mobile App         | Android/iOS version                |
| 🔄 Recurring Tasks    | Repeat daily/weekly/monthly        |
| 📎 File Attachments   | Upload files with tasks            |
| ⭐ Task Templates      | Save reusable task templates       |
| 🔍 Advanced Search    | Search by date, priority, category |


🐛 Known Issues

Currently, no known bugs.
All features tested and verified.
If you find an issue, please open a GitHub issue.

📞 Contact & Support

Developer: Pratik Gunjal
Email: your.email@example.com
GitHub: https://github.com/Pratikg27
Project Link: https://github.com/Pratikg27/task-management-system.git

📝 Project Timeline
| Week   | Dates           | Status         | Work Done                              |
| ------ | --------------- | -------------- | -------------------------------------- |
| Week 1 | 11 Oct - 17 Oct | ✅ Completed    | Setup, DB connection, User Auth        |
| Week 2 | 18 Oct - 24 Oct | ✅ Completed    | Task CRUD APIs, UI Integration         |
| Week 3 | 25 Oct - 31 Oct | ✅ Completed    | Dashboard, Search, Filters, Validation |
| Week 4 | 1 Nov - 10 Nov  | 🔄 In Progress | Testing, Documentation, Deployment     |

📄 License

This project is created for educational purposes as part of an academic assignment.
---


