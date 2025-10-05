# Community WorkBoard – Commit 1

## Overview
This initial commit sets up the foundational backend using **NestJS**, **Mongoose**, and **JWT authentication** with secure role-based access.

## Features Added
- NestJS project initialized
- MongoDB connected with Mongoose
- User model with roles (`contributor`, `volunteer`)
- Authentication (`/auth/register`, `/auth/login`)
- Passwords hashed using `bcrypt`
- JWT implemented for secure access
- Custom `@Roles()` decorator and `RolesGuard` added for role-based access control

## How to Run
```bash
cd backend
npm install
npm run start:dev
