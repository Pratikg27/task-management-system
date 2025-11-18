# 📝 Online Task Management System

<div align="center">

![MERN](https://img.shields.io/badge/Stack-MERN-green)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen)
![Build](https://img.shields.io/badge/Build-Passing-brightgreen)
![License](https://img.shields.io/badge/License-Training%20Project-blue)

**A Full-Stack Task Management Application**

Built as part of Software Developer Training Program at **Moxiedeck Software Pvt Ltd**

[Live Demo](https://task-management-system-one-theta.vercel.app) • [API Documentation](#-api-endpoints) • [Report Bug](https://github.com/Pratikg27/task-management-system/issues)

</div>

---

## 🌐 Live Application

| Service | URL | Status |
|---------|-----|--------|
| 🎨 **Frontend** | [https://task-management-system-one-theta.vercel.app](https://task-management-system-one-theta.vercel.app) | ✅ Live |
| ⚙️ **Backend API** | [https://task-management-system-f40x.onrender.com](https://task-management-system-f40x.onrender.com) | ✅ Live |
| 💾 **Database** | MongoDB Atlas (Cloud) | ✅ Connected |

> **⚠️ Note:** First API request may take 30-60 seconds as the backend service wakes up (free tier limitation).

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Training Assignment Details](#-training-assignment-details)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Screenshots](#️-screenshots)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [API Documentation](#-api-endpoints)
- [Testing](#-testing)
- [Project Structure](#-project-structure)
- [Future Enhancements](#-future-enhancements)
- [Contact](#-contact)

---

## 📌 About the Project

The **Online Task Management System** is a full-stack web application developed using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). This project demonstrates proficiency in modern web development practices, including RESTful API design, JWT authentication, responsive UI development, and cloud deployment.

### 🎯 Project Objectives

- Implement secure user authentication and authorization
- Build RESTful APIs with proper error handling
- Create responsive and intuitive user interfaces
- Integrate frontend with backend services
- Deploy full-stack application to cloud platforms
- Write comprehensive documentation

---

## 📚 Training Assignment Details

| Detail | Information |
|--------|-------------|
| **Company** | Moxiedeck Software Pvt Ltd |
| **Role** | Software Developer (Training) |
| **Trainer** | Sakshi Jadhav |
| **Assignment Type** | Full-Stack Development Training Project |
| **Duration** | 4 Weeks (11 Oct 2025 - 10 Nov 2025) |
| **Status** | ✅ Completed |

### 📅 Weekly Milestones

<details>
<summary><b>Week 1 (11 Oct - 17 Oct)</b> - Project Setup & Authentication ✅</summary>

**Objectives:**
- Setup project folder structure and Git repository
- Create frontend structure (React)
- Setup backend (Node.js + Express)
- Connect MongoDB database
- Develop User Signup and Login APIs
- Test authentication (JWT-based)

**Deliverable:** ✅ Working login/signup page with database connection

</details>

<details>
<summary><b>Week 2 (18 Oct - 24 Oct)</b> - Task Module (Core Functionality) ✅</summary>

**Objectives:**
- Create task model in MongoDB
- Develop APIs for Add, Edit, Delete, Mark Complete/Pending
- Design frontend for task list and forms
- Integrate frontend with backend APIs

**Deliverable:** ✅ User can add, edit, delete, and complete tasks

</details>

<details>
<summary><b>Week 3 (25 Oct - 31 Oct)</b> - Dashboard & UI Improvements ✅</summary>

**Objectives:**
- Create dashboard showing Total, Completed, Pending tasks
- Add search and filter functionality
- Improve UI with responsive design
- Handle validation and error messages

**Deliverable:** ✅ Fully functional and responsive dashboard

</details>

<details>
<summary><b>Week 4 (1 Nov - 10 Nov)</b> - Testing, Deployment & Documentation ✅</summary>

**Objectives:**
- Test all modules end-to-end
- Fix bugs and optimize performance
- Prepare comprehensive documentation
- Deploy on cloud platforms

**Deliverable:** ✅ Live working project + complete documentation

</details>

---

## ✨ Features

### 🔐 Authentication & Security
- ✅ User registration with email validation
- ✅ Secure login with JWT token authentication
- ✅ Password encryption using bcrypt
- ✅ Protected routes and API endpoints
- ✅ Session management

### ✅ Task Management
- ✅ Create tasks with title and description
- ✅ View all tasks in organized list
- ✅ Edit existing tasks
- ✅ Delete tasks with confirmation
- ✅ Mark tasks as complete/pending
- ✅ Real-time task status updates

### 📊 Dashboard & Analytics
- ✅ Total tasks counter
- ✅ Completed tasks counter
- ✅ Pending tasks counter
- ✅ Visual task statistics
- ✅ Quick overview of task status

### 🔍 Search & Filter
- ✅ Real-time search by task title/description
- ✅ Filter by status (All/Completed/Pending)
- ✅ Instant results without page reload
- ✅ Clear and intuitive UI

### 🎨 User Experience
- ✅ Clean and modern interface
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Form validation with error messages
- ✅ Loading states and feedback
- ✅ Success/error notifications
- ✅ Smooth animations and transitions

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React.js** | UI library for building interactive interfaces |
| **React Router** | Client-side routing and navigation |
| **Axios** | HTTP client for API requests |
| **CSS3** | Styling and responsive design |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web application framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB object modeling |
| **JWT** | JSON Web Tokens for authentication |
| **bcrypt** | Password hashing and encryption |
| **CORS** | Cross-Origin Resource Sharing |

### Deployment & Tools
| Service | Purpose |
|---------|---------|
| **Vercel** | Frontend hosting and deployment |
| **Render** | Backend API hosting |
| **MongoDB Atlas** | Cloud database hosting |
| **Git & GitHub** | Version control and code repository |

---

## 🖼️ Screenshots

### Authentication Flow

#### 🔑 Login Page
![Login Page](screenshots/login.png)
*Secure login with email and password. Includes "Forgot Password?" link for easy password recovery.*

#### 📝 Registration Page
![Register Page](screenshots/register.png)
*User registration with real-time validation. Creates secure account with encrypted password.*

#### 🔐 Forgot Password
![Forgot Password](screenshots/forgot-password.png)
*Simple password reset request form. Enter email to receive reset link via SendGrid.*

#### 🔄 Reset Password
![Reset Password Page](screenshots/reset-password.png)
*Secure password reset page with token validation. Set new password with confirmation.*

---

### Application Features

#### 📊 Dashboard
![Dashboard](screenshots/dashboard1.png)
*Comprehensive task statistics and overview. Visual breakdown of task status and priorities.*

#### ✅ Task Management
![Task List](screenshots/tasks.png)
*Complete task management interface with filtering, sorting, and CRUD operations.*

---
## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local) or **MongoDB Atlas** account - [Sign Up](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)
- Code editor (VS Code recommended)

### Installation

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Pratikg27/task-management-system.git
cd task-management-system

2️⃣ Backend Setup

# Navigate to backend directory
cd backend

# Install dependencies
npm install

Create .env file in backend folder:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanagement
JWT_SECRET=your_super_secret_jwt_key_here
CLIENT_URL=http://localhost:3000

Start the backend server:

npm start
# or for development with auto-restart
npm run dev

✅ Backend will run on: http://localhost:5000

3️⃣ Frontend Setup

Open a new terminal:

# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

Create .env.local file in frontend folder:

REACT_APP_API_URL=http://localhost:5000

Start the frontend:

npm start

✅ Frontend will open at: http://localhost:3000


🌐 DEPLOYMENT GUIDE

====================================================
1️⃣ DEPLOY FRONTEND TO VERCEL
====================================================

1. PUSH CODE TO GITHUB
----------------------------------------------------
git add .
git commit -m "Ready for deployment"
git push origin main

2. DEPLOY ON VERCEL
----------------------------------------------------
- Go to: https://vercel.com/dashboard
- Click "New Project"
- Import your GitHub repository

3. CONFIGURE PROJECT
----------------------------------------------------
Framework Preset: Create React App
Root Directory: frontend
Build Command: npm run build
Output Directory: build

4. ADD ENVIRONMENT VARIABLE
----------------------------------------------------
REACT_APP_API_URL = https://task-management-system-f40x.onrender.com

5. DEPLOY
----------------------------------------------------
Click "Deploy"
✅ Frontend will now be live on Vercel.

====================================================
2️⃣ DEPLOY BACKEND TO RENDER
====================================================

1. CREATE WEB SERVICE
----------------------------------------------------
- Go to: https://dashboard.render.com/
- Click "New" → "Web Service"
- Connect your GitHub repository

2. CONFIGURE SERVICE
----------------------------------------------------
Name: task-management-system
Root Directory: backend
Environment: Node
Build Command: npm install
Start Command: npm start

3. ADD ENVIRONMENT VARIABLES
----------------------------------------------------
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=https://task-management-system-one-theta.vercel.app
PORT=5000

4. CREATE SERVICE
----------------------------------------------------
Click "Create Web Service"
✅ Render will deploy your backend automatically.

====================================================
3️⃣ SETUP MONGODB ATLAS
====================================================

1. CREATE CLUSTER
----------------------------------------------------
- Go to: https://www.mongodb.com/cloud/atlas
- Click "Create a Free Cluster"
- Choose your cloud provider and region

2. CREATE DATABASE USER
----------------------------------------------------
- Go to "Database Access"
- Click "Add New Database User"
- Save your username and password

3. CONFIGURE NETWORK ACCESS
----------------------------------------------------
- Go to "Network Access"
- Add IP Address: 0.0.0.0/0  (allow access from anywhere)

4. GET CONNECTION STRING
----------------------------------------------------
- Go to "Database" → "Connect" → "Connect your application"
- Copy the connection string
- Replace <password> with your database user password

Example:
mongodb+srv://username:password@cluster0.mongodb.net/taskDB?retryWrites=true&w=majority

- Add this string to your Render environment variable:
MONGODB_URI


🔌 API Endpoints
Base URL
Production: https://task-management-system-f40x.onrender.com
Development: http://localhost:5000

Authentication Endpoints
Register User

POST /api/auth/register
Content-Type: application/json

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Success Response (200):
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Error Response (400):
{
  "success": false,
  "message": "User already exists"
}

Login User

POST /api/auth/login
Content-Type: application/json

Request Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Success Response (200):
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}

Error Response (401):
{
  "success": false,
  "message": "Invalid credentials"
}

Task Endpoints (Protected - Requires JWT Token)
Get All Tasks

GET /api/tasks
Authorization: Bearer <jwt_token>

Success Response (200):
{
  "success": true,
  "tasks": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Complete project documentation",
      "description": "Write comprehensive README",
      "completed": false,
      "user": "507f1f77bcf86cd799439012",
      "createdAt": "2025-11-08T10:30:00.000Z",
      "updatedAt": "2025-11-08T10:30:00.000Z"
    }
  ]
}

Create Task

POST /api/tasks
Authorization: Bearer <jwt_token>
Content-Type: application/json

Request Body:
{
  "title": "New Task",
  "description": "Task description here"
}

Success Response (201):
{
  "success": true,
  "message": "Task created successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "New Task",
    "description": "Task description here",
    "completed": false,
    "user": "507f1f77bcf86cd799439012",
    "createdAt": "2025-11-08T10:30:00.000Z",
    "updatedAt": "2025-11-08T10:30:00.000Z"
  }
}

Update Task

PUT /api/tasks/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

Request Body:
{
  "title": "Updated Task Title",
  "description": "Updated description",
  "completed": true
}

Success Response (200):
{
  "success": true,
  "message": "Task updated successfully",
  "task": { ... }
}

Error Response (404):
{
  "success": false,
  "message": "Task not found"
}

Delete Task

DELETE /api/tasks/:id
Authorization: Bearer <jwt_token>

Success Response (200):
{
  "success": true,
  "message": "Task deleted successfully"
}

Error Response (404):
{
  "success": false,
  "message": "Task not found"
}



Error Codes
| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid or missing token |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |


✅ Testing

Manual Testing Checklist
All features have been thoroughly tested:

| Feature | Test Case | Status |
|---------|-----------|--------|
| Authentication | User registration with valid data | ✅ Pass |
| | User registration with existing email | ✅ Pass |
| | Login with correct credentials | ✅ Pass |
| | Login with incorrect credentials | ✅ Pass |
| | Access protected routes without token | ✅ Pass |
| Task Management | Create task with valid data | ✅ Pass |
| | Create task with empty fields | ✅ Pass |
| | Edit task details | ✅ Pass |
| | Delete task | ✅ Pass |
| | Mark task as complete | ✅ Pass |
| | Mark task as pending | ✅ Pass |
| Search & Filter | Search tasks by title | ✅ Pass |
| | Search tasks by description | ✅ Pass |
| | Filter all tasks | ✅ Pass |
| | Filter completed tasks | ✅ Pass |
| | Filter pending tasks | ✅ Pass |
| Dashboard | Display total tasks count | ✅ Pass |
| | Display completed tasks count | ✅ Pass |
| | Display pending tasks count | ✅ Pass |
| Responsive Design | Desktop view (1920x1080) | ✅ Pass |
| | Tablet view (768x1024) | ✅ Pass |
| | Mobile view (375x667) | ✅ Pass |


Browser Compatibility

Tested and verified on:

✅ Google Chrome (Latest)
✅ Mozilla Firefox (Latest)
✅ Microsoft Edge (Latest)
✅ Safari (Latest)

Device Testing
✅ Desktop (Windows, macOS)
✅ Tablet (iPad, Android tablets)
✅ Mobile (iPhone, Android phones)


📁 Project Structure
task-management-system/
│
├── backend/                          # Backend server
│   ├── models/                       # Database models
│   │   ├── User.js                   # User schema
│   │   └── Task.js                   # Task schema
│   ├── routes/                       # API routes
│   │   ├── auth.js                   # Authentication routes
│   │   └── tasks.js                  # Task CRUD routes
│   ├── middleware/                   # Custom middleware
│   │   └── auth.js                   # JWT verification middleware
│   ├── server.js                     # Express server setup
│   ├── package.json                  # Backend dependencies
│   └── .env                          # Environment variables
│
├── frontend/                         # React frontend
│   ├── public/                       # Static files
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/                          # Source files
│   │   ├── components/               # Reusable components
│   │   │   ├── Login.js              # Login page
│   │   │   ├── Register.js           # Registration page
│   │   │   └── Dashboard.js          # Main dashboard
│   │   ├── services/                 # API services
│   │   │   └── api.js                # Axios configuration
│   │   ├── App.js                    # Main app component
│   │   ├── App.css                   # Global styles
│   │   └── index.js                  # Entry point
│   ├── package.json                  # Frontend dependencies
│   └── .env.local                    # Environment variables
│
├── screenshots/                      # Application screenshots
│   ├── login.png
│   ├── register.png
│   ├── dashboard.png
│   └── tasks.png
│
├── .gitignore                        # Git ignore file
└── README.md                         # Project documentation



🚀 Future Enhancements
Planned Features
| Priority | Feature | Description |
|----------|---------|-------------|
| 🔴 High | Priority Levels | Add High, Medium, Low priority tags |
| 🔴 High | Due Dates | Set and track task deadlines |
| 🟡 Medium | Categories/Tags | Organize tasks with custom tags |
| 🟡 Medium | Task Notes | Add detailed notes to tasks |
| 🟡 Medium | Dark Mode | Light/Dark theme toggle |
| 🟢 Low | Email Notifications | Reminder emails for pending tasks |
| 🟢 Low | Team Collaboration | Share tasks with team members |
| 🟢 Low | Analytics Dashboard | Productivity charts and insights |
| 🟢 Low | Mobile App | Native Android/iOS application |
| 🟢 Low | File Attachments | Upload files with tasks |



Technical Improvements
[ ] Add unit tests (Jest, React Testing Library)
[ ] Add integration tests for API endpoints
[ ] Implement pagination for large task lists
[ ] Add caching with Redis
[ ] Implement rate limiting for API
[ ] Add API documentation with Swagger
[ ] Set up CI/CD pipeline
[ ] Add error monitoring (Sentry)
[ ] Implement WebSocket for real-time updates
[ ] Add PWA features for offline support


🐛 Known Issues & Limitations

Current Limitations

1.Backend Cold Start
Free tier Render service sleeps after 15 minutes of inactivity
First request takes 30-60 seconds to wake up
Solution: Upgrade to paid tier or implement keep-alive ping

2.Database Storage
MongoDB Atlas free tier has 512MB storage limit
Solution: Upgrade to paid tier when needed

3.No Real-time Updates
Task changes don't reflect in real-time across multiple sessions
Solution: Implement WebSocket or Server-Sent Events

No Known Bugs
All features tested and working as expected
No critical bugs reported
If you find an issue, please https://github.com/Pratikg27/task-management-system/issues


📞 Contact

Developer Information:
Pratik Gunjal
Software Developer 
Moxiedeck Software Pvt Ltd

📧 Email: pratikgunjal2127@gmail.com
🐙 GitHub: https://github.com/Pratikg27
🔗 Project Repository: https://github.com/Pratikg27/task-management-system
🌐 Live Demo: https://task-management-system-one-theta.vercel.app

Training Supervisor:
Sakshi Jadhav
Trainer - Moxiedeck Software Pvt Ltd

🙏 Acknowledgments
Moxiedeck Software Pvt Ltd - For providing this training project assignment
Sakshi Jadhav - For guidance, mentorship, and project supervision throughout the training period
MongoDB Atlas - For free cloud database hosting
Vercel - For seamless frontend deployment
Render - For reliable backend hosting

📄 License
This project is developed as part of a training assignment at Moxiedeck Software Pvt Ltd.
All rights reserved by Moxiedeck Software Pvt Ltd.

For Educational and Training Purposes Only

📊 Project Statistics
| Metric | Value |
|--------|-------|
| Development Time | 4 Weeks |
| Total Commits | 50+ |
| Lines of Code | ~2,500 |
| API Endpoints | 6 |
| Components | 15+ |
| Test Cases | 25+ |


Built with ❤️ by Pratik Gunjal

Training Project - Moxiedeck Software Pvt Ltd

Last Updated: November 2025
Project Status: ✅ Completed and Deployed
Training Status: ✅ Successfully Completed