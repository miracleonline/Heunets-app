# Heunets – Full Stack Technical Assessment

**Full Stack Developer Task – Community Work Board**  
**Tech Stack:** NestJS + React + MongoDB

---

## Overview

Heunets Community WorkBoard is a two-role platform that connects **contributors** (who post community tasks) and **volunteers** (who browse and apply for them).  
It demonstrates secure authentication, role-based access control (RBAC), and a complete CRUD flow from backend to frontend.

---

## Features

### Authentication & Roles
- JWT-based authentication using **NestJS Guards**
- Two user roles:
  - **Contributor** – can create and manage tasks
  - **Volunteer** – can browse and apply to tasks
- Passwords securely hashed with **bcrypt**

### Core Functionality
| Role | Feature |
|------|----------|
| Contributor | Create new tasks |
| Contributor | View all posted tasks |
| Contributor | View applications per task |
| Volunteer | Browse all available tasks |
| Volunteer | View task details |
| Volunteer | Apply to tasks with a message |

---

## Backend (NestJS + MongoDB)

**Deployed URL:** [https://heunets-app.onrender.com](https://heunets-app.onrender.com)  

### Folder Structure
backend/
├── src/
│ ├── auth/
│ ├── users/
│ ├── tasks/
│ ├── applications/
│ ├── common/roles.guard.ts
│ ├── main.ts
│ └── app.module.ts
├── .env.example
├── package.json
└── Dockerfile

### ⚙️ .env Example
```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/heunets
JWT_SECRET=supersecretkey
PORT=3000

Core Models
User


{
  _id: ObjectId;
  name: string;
  email: string;
  password: string; // hashed
  role: 'contributor' | 'volunteer';
}

Task


{
  _id: ObjectId;
  title: string;
  description: string;
  createdBy: ObjectId;
  createdAt: Date;
}

Application


{
  _id: ObjectId;
  taskId: ObjectId;
  userId: ObjectId;
  message: string;
  appliedAt: Date;
}

Key Endpoints
Method  Endpoint  Role  Description
POST  /auth/register  All Register new user
POST  /auth/login All Login and receive JWT
GET /auth/me  Authenticated Get logged-in user info
POST  /tasks  Contributor Create new task
GET /tasks  Volunteer Get all tasks
GET /tasks/my-posted-tasks  Contributor View contributor’s own tasks
GET /tasks/:id  Authenticated Get task details
POST  /tasks/:id/apply  Volunteer Apply to a task
GET /tasks/:id/applications Contributor View applications for a task

Security Notes

Passwords stored securely with bcrypt (10 salt rounds).

JWTs signed with environment JWT_SECRET.

Route protection via AuthGuard + RolesGuard.

Sensitive fields (e.g., password) excluded from responses.

Docker Support

# docker-compose.yml
version: '3.8'
services:
  mongo:
    image: mongo:6
    restart: unless-stopped
    ports:
      - 27017:27017
  backend:
    build: ./backend
    command: npm run start:prod
    environment:
      - MONGO_URI=mongodb://mongo:27017/heunets
      - JWT_SECRET=changeme
    ports:
      - 3000:3000
    depends_on:
      - mongo
  frontend:
    build: ./frontend
    ports:
      - 5173:5173
    command: npm run dev
    depends_on:
      - backend

### Frontend (React + Vite + TypeScript)
Deployed URL: https://heunets-app.vercel.app

Structure

frontend/
├── src/
│   ├── api/
│   │   ├── axios.ts
│   │   └── tasks.ts
│   ├── components/
│   │   ├── ContributorDashboard.tsx
│   │   ├── VolunteerDashboard.tsx
│   ├── pages/
│   │   ├── TaskList.tsx
│   │   ├── TaskDetails.tsx
│   │   ├── TaskApplications.tsx
│   ├── context/AuthProvider.tsx
│   ├── App.tsx
│   └── main.tsx
├── vite.config.ts
├── tsconfig.app.json
├── tsconfig.node.json
└── package.json

Environment Example
env

VITE_API_BASE_URL=https://heunets-app.onrender.com

Features

React Router for navigation

Axios for API communication

Role-based dashboards (Contributor vs Volunteer)

Persistent JWT authentication

Clean minimal UI — focus on functionality

Running Locally
Backend

cd backend
npm install
npm run start:dev
App runs on http://localhost:3000

Frontend

cd frontend
npm install
npm run dev
App runs on http://localhost:5173

Improvements & Notes
Input validation via class-validator

Mongoose schema relationships for task → applications

Rate-limiting (via nestjs-throttler)

JWT tokens can be moved to httpOnly cookies for production security

Summary
This submission implements all core functional requirements within the 2–3 hour timebox, with additional deployment setup and documentation polish.

Backend: Render-hosted NestJS API
Frontend: Vercel-hosted React SPA
Database: MongoDB Atlas (Mongoose ODM)

Author
Miracle Nwabuisi
Full Stack Developer
Soexcelx@gmail.com