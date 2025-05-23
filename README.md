Here's the updated `README.md` for your **AirBean** project, now including **React Hook Form** under frontend technologies and improved clarity throughout:

---

```markdown
# AirBean ☕️🚁

**AirBean** is a full-stack web application where users can order coffee and (fictionally) have it delivered by drone. The app uses a modern tech stack: **React** for the frontend, **Node.js** with **Express** for the backend, and **PostgreSQL** as the database.

---

## 🗂 Project Structure

```

airbean/
├── client/     # Frontend React app
└── server/     # Backend Node.js app

````

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Team-Umea/AirbeanApi.git
cd airbean
````

### 2. Install Dependencies and Run the Apps

#### Client (React)

```bash
cd client
npm install
npm run dev
```

#### Server (Node.js)

```bash
cd server
npm install
npm run dev
```

#### .env Example (for the server)

Create a `.env` file inside the `server` directory:

```env
PORT=5000
JWT_SECRET=your_jwt_secret
POSTGRES_URL=your_postgres_connection_url
```

---

## 🧰 Technologies Used

### Frontend (React)

* **React** + **Vite** – Fast and modern frontend tooling
* **React Router DOM** – Client-side routing
* **Redux Toolkit** – Scalable state management
* **TanStack Query (React Query)** – Server state management & caching
* **React Hook Form** – Performant and accessible form handling
* **Tailwind CSS** – Utility-first CSS framework

### Backend (Node.js + Express)

* **Express** – Web framework for Node.js
* **Zod** – Schema validation and type-safe input parsing
* **JWT (jsonwebtoken)** – Secure user authentication
* **PostgreSQL** – Relational database
* **MVC Pattern** – Organized code structure (Models, Controllers, Routes)

---

## ✨ Key Features

* 🛒 Coffee product listings and ordering
* 🔐 JWT-based user authentication
* ⚛️ Smart data fetching with React Query
* 🎨 Fully responsive UI using Tailwind CSS
* 🧾 Forms built with React Hook Form
* ✅ Backend validation via Zod

---

![Untitled](https://github.com/user-attachments/assets/164d507c-2678-4d50-ac0f-e87ff34cb813)
