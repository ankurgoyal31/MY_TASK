# 🚀 Task Manager App

A full-stack task manager application built using **React, Node.js, Express, and MySQL**.
This project allows users to manage their daily tasks with features like create, update, delete, filter, and mark tasks as completed.

---

## 📌 Features

* ✅ Create new tasks
* ✏️ Edit existing tasks
* ❌ Delete tasks
* 🔄 Toggle task completion (complete / incomplete)
* 👤 User-based task isolation (using localStorage userId)
* 🔍 Filter tasks:

  * All
  * Completed
  * Pending
* 🕒 Display task creation time
* 💾 Persistent data using MySQL database

---

## 🛠️ Tech Stack

**Frontend**

* React (Vite)
* JavaScript
* CSS

**Backend**

* Node.js
* Express.js

**Database**

* MySQL

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/ankurgoyal31/MY_TASK.git
cd MY_TASK
```

---

### 2️⃣ Install dependencies

#### Backend:

```bash
cd server
npm install
```

#### Frontend:

```bash
cd client
npm install
```

---

### 3️⃣ Setup environment variables

Create a `.env` file in backend:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=todo_app
```

---

### 4️⃣ Run the project

#### Start backend:

```bash
node index.js
```

#### Start frontend:

```bash
npm run dev
```

---

## 📡 API Endpoints

| Method | Endpoint            | Description     |
| ------ | ------------------- | --------------- |
| POST   | /create_tasks       | Create new task |
| GET    | /tasks?userId=      | Get user tasks  |
| PATCH  | /tasks/:id/update   | Update task     |
| PATCH  | /tasks/:id/complete | Toggle complete |
| DELETE | /tasks/:id/delete   | Delete task     |

---

## 🧠 Key Concepts Used

* REST API design
* SQL queries & relationships
* React state management
* Conditional rendering
* Client-side filtering
* Error handling (try-catch + response checks)

---

## 📷 Screenshots
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f5cd3808-49cb-4ca5-b909-969300613cee" />

*Add screenshots here*

---

## 👨‍💻 Author

**Ankur Goyal**

---

## ⭐ Conclusion

This project demonstrates full-stack development skills including frontend UI, backend APIs, database integration, and real-world problem solving.

---

## 🔥 Future Improvements

* Authentication (JWT / Clerk)
* Better UI/UX
* Deployment (Vercel + Render)
* Unit testing
* Docker setup

---
