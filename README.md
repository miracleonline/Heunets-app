# Community WorkBoard

## Overview
This project sets up a backend using **NestJS**, **Mongoose**, and **JWT authentication** with secure role-based access.

## Features Added
- NestJS project initialized
- MongoDB connected with Mongoose
- User model with roles (`contributor`, `volunteer`)
- Authentication (`/auth/register`, `/auth/login`)
- Passwords hashed using `bcrypt`
- JWT implemented for secure access
- Custom `@Roles()` decorator and `RolesGuard` added for role-based access control
- Task schema (`title`, `description`, `createdBy`, `createdAt`)
- Contributors can:
  - Create new tasks (`POST /tasks`)
  - View their posted tasks (`GET /tasks/my-posted-tasks`)
- Volunteers can:
  - View all available tasks (`GET /tasks`)
- Role-based guards applied to endpoints

## How to Run
```bash
cd backend
npm install
npm run start:dev
Test Endpoints
Method	Endpoint	Role	Description
POST	/auth/register	Public	Register a new user
POST	/auth/login	Public	User login
POST	/tasks	Contributor	Create new task
GET	/tasks	Volunteer	Get all tasks
GET	/tasks/my-posted-tasks	Contributor	List own posted tasks
