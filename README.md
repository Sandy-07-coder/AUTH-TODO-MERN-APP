# AUTH-TODO MERN App

A **full-stack To-Do application** built using the **MERN stack** (MongoDB, Express, React, Node.js) with user authentication. This app allows users to register, log in, and manage their personal to-do lists securely.

---

## 🌟 Features

- **User Authentication:** Secure login and registration with JWT-based authentication.
- **CRUD Operations:** Create, Read, Update, and Delete to-do items.
- **Responsive UI:** Built with React and styled using TailwindCSS.
- **Secure Backend:** Node.js and Express.js with MongoDB for data storage.
- **Cookie-Based Sessions:** Authentication tokens stored in HTTP-only cookies.

---

## 📁 File Structure

```
AUTH-TODO-MERN-APP/
│
├── server/                    # Backend server
│   ├── controllers/           # Route handlers
│   ├── models/               # Mongoose models (User, Todo)
│   ├── routers/              # API routes
│   ├── middleware/           # Authentication middleware
│   ├── config/               # Database and environment configurations
│   └── index.js              # Entry point for the backend
│
├── client/                   # Frontend application
│   ├── src/
│   │   ├── Components/       # Reusable UI components
│   │   ├── contexts/         # React Context for global state
│   │   ├── API/              # API service functions
│   │   ├── utils/            # Utility functions
│   │   └── App.jsx           # Main React component
│   └── vite.config.js        # Vite configuration
│
├── .env.example              # Example environment variables
├── package.json              # Project metadata and dependencies
└── README.md                 # Project documentation
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Sandy-07-coder/AUTH-TODO-MERN-APP.git
cd AUTH-TODO-MERN-APP
```

### 2. Set Up the Backend

```bash
cd server
npm install
```

Copy `.env.example` to `.env` and configure:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONT_END_URL=http://localhost:5173
NODE_ENV=development
```

Start the backend server:

```bash
npm run dev
```

### 3. Set Up the Frontend

```bash
cd ../client
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` by default.

---

## 📦 How to Contribute

1. **Fork the repository**

2. **Clone your fork locally**

3. **Create a new branch** for your feature or bugfix:

   ```bash
   git checkout -b feature/my-feature
   ```

4. **Make your changes** and commit them:

   ```bash
   git commit -m "Add some feature"
   ```

5. **Push to your branch:**

   ```bash
   git push origin feature/my-feature
   ```

6. **Open a Pull Request** on the main repository.

Please ensure your code follows the project's coding standards and includes appropriate tests and documentation.

---

## 🔗 GitHub Repository

[https://github.com/Sandy-07-coder/AUTH-TODO-MERN-APP](https://github.com/Sandy-07-coder/AUTH-TODO-MERN-APP)

---

## 💻 Technologies Used

| Category           | Technologies                           |
| ------------------ | -------------------------------------- |
| **Frontend**       | React, Vite, TailwindCSS, React Router |
| **Backend**        | Node.js, Express.js                    |
| **Database**       | MongoDB (Atlas)                        |
| **Authentication** | JWT, Cookies                           |
| **HTTP Client**    | Axios                                  |

---

## 📄 License

This project is licensed under the **MIT License**.

---

## ✨ Built with ❤️ by [Sandy-07-coder](https://github.com/Sandy-07-coder)
