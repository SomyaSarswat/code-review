

# 🛰️ CodeRadar

> **CodeRadar** is an intelligent AI-powered code review platform designed to help developers write cleaner, more efficient, and maintainable code. By leveraging the power of AI, CodeRadar analyzes your code in real-time, detects potential bugs, suggests improvements, and ensures adherence to best practices.

---

## ✨ Introduction

Writing quality code is critical, but even experienced developers can overlook issues, inefficiencies, or potential security risks. **CodeRadar** acts as your personal code review assistant, providing:

* **Automated code analysis** to detect errors and inefficiencies
* **Best practice suggestions** to improve readability and maintainability
* **Real-time feedback** within a modern, easy-to-use interface
* **Markdown-based review reports** for clear and structured feedback

Whether you’re a student, professional developer, or a team lead, CodeRadar empowers you to maintain **high coding standards**, improve **productivity**, and **reduce bugs** before they reach production.

---

## 🚀 Key Features

* Live code editor with **syntax highlighting**
* AI-powered **code review suggestions**
* Supports **JavaScript code**, with plans to extend to other languages
* Markdown-rendered review feedback with **highlighted code snippets**
* Simple, intuitive **frontend interface**
* Fully integrated with **Groq AI** for intelligent suggestions

---

## 💡 Why “CodeRadar”?

Just like a radar scans the environment to detect hidden objects, **CodeRadar scans your codebase** to uncover hidden bugs, inefficiencies, and improvement opportunities — helping you maintain **clean, high-quality, and future-proof code**.

---

## 💻 Tech Stack

**Frontend:**

* React.js
* PrismJS (syntax highlighting)
* react-simple-code-editor
* react-markdown
* rehype-highlight

**Backend:**

* Node.js + Express.js
* Groq AI (Generative API)
* CORS enabled for frontend-backend communication

**Other:**

* Axios for HTTP requests
* dotenv for environment variables

---

## ⚡ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/coderadar.git
cd coderadar
```

---

### 2️⃣ Setup Backend

```bash
cd BackEnd
npm install
```

Create a `.env` file:

```env
GROQ_API_KEY=your_groq_api_key_here
PORT=3000
```

Start the backend:

```bash
npm run dev
```

You should see:

```
🚀 Server running at http://localhost:3000
```

---

### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Open your browser at `http://localhost:5175` (Vite default port).

---

### 4️⃣ Using CodeRadar

1. Write your JavaScript code in the editor.
2. Click the **Review** button.
3. AI-generated review will appear on the right panel in Markdown format.

---

## 🛠 Project Structure

```
BackEnd/
├─ server.js          # Backend entry point
├─ src/
│  ├─ app.js          # Express app with routes
│  ├─ controllers/
│  │  └─ ai.controller.js
│  ├─ routes/
│  │  └─ ai.routes.js
│  └─ services/
│     └─ ai.service.js  # Groq AI integration

frontend/
├─ src/
│  ├─ App.jsx          # Main React component
│  └─ App.css
├─ package.json
```

---

## ⚙️ Environment Variables

* `GROQ_API_KEY` — Your Groq API key for code review generation
* `PORT` — Backend server port (default: 3000)

---

## 💡 Tips

* Make sure backend is running before clicking **Review** in the frontend.
* For large code snippets, increase `express.json({ limit: '2mb' })` in `app.js`.
* Use modern browsers (Chrome, Edge, Firefox) for best experience.

---

## 📦 Dependencies

**Backend:**

```bash
npm install express cors dotenv groq-sdk
```

**Frontend:**

```bash
npm install react react-dom axios prismjs react-simple-code-editor react-markdown rehype-highlight highlight.js
```

---

## 🎯 Future Improvements

* Add **multi-language support** (Python, C++, Java)
* Real-time streaming of AI review
* Authentication & user accounts
* Deploy frontend + backend to Vercel/Render

---

## 🔗 Links

* [Frontend Preview](http://localhost:5175)
* [Backend API](http://localhost:3000)

---

## 📄 License

MIT License © 2025 Your Name

---

This README now includes:

* **Professional introduction** of CodeRadar
* **Features and tech stack**
* **Installation & usage instructions**
* **Project structure, environment variables, and dependencies**
* **Future improvements and links**

 

 
