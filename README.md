


# 🛰️ CodeRadar

> **CodeRadar** is an intelligent AI-powered code review platform designed to help developers write cleaner, more efficient, and maintainable code. By leveraging the power of AI, CodeRadar analyzes your code in real time, detects potential bugs, suggests improvements, and ensures adherence to best practices.

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
* Supports **JavaScript code** (extensible to other languages)
* Markdown-rendered review feedback with **highlighted code snippets**
* Clean, intuitive **frontend UI**
* Fully integrated with **Groq AI** for fast and accurate reviews

---

## 💡 Why “CodeRadar”?

Just like a radar scans the environment to detect hidden objects, **CodeRadar scans your codebase** to uncover hidden bugs, inefficiencies, and improvement opportunities — helping you maintain **clean, high-quality, and future-proof code**.

---

## 💻 Tech Stack

### Frontend

* React.js
* PrismJS (syntax highlighting)
* react-simple-code-editor
* react-markdown
* rehype-highlight
* Axios

### Backend

* Node.js
* Express.js
* Groq AI (LLM API)
* CORS
* dotenv

---

## ⚡ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/SomyaSarswat/code-review/edit/main
cd coderadar
```

---

### 2️⃣ Backend Setup

```bash
cd BackEnd
npm install
```

Create a `.env` file:

```env
GROQ_API_KEY=your_groq_api_key_here
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

You should see:

```
🚀 Server running at http://localhost:5000
📡 Health check: http://localhost:5000/
🤖 AI endpoint: http://localhost:5000/ai/get-review
🩺 AI health: http://localhost:5000/ai/health
```

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

## 🧠 Using CodeRadar

1. Write or paste your JavaScript code in the editor.
2. Click the **Review** button.
3. AI-generated review appears on the right panel in **Markdown format**.
4. Review includes:

   * Code issues
   * Performance tips
   * Best practices
   * Refactoring suggestions

---

## 🛠 Project Structure

```
BackEnd/
├─ server.js
├─ src/
│  ├─ app.js
│  ├─ controllers/
│  │  └─ ai.controller.js
│  ├─ routes/
│  │  └─ ai.routes.js
│  └─ services/
│     └─ ai.service.js

frontend/
├─ src/
│  ├─ App.jsx
│  └─ App.css
├─ package.json
```

---

## ⚙️ Environment Variables

| Variable       | Description                         |
| -------------- | ----------------------------------- |
| `GROQ_API_KEY` | Groq API key for AI reviews         |
| `PORT`         | Backend server port (default: 5000) |

---

## 💡 Tips & Troubleshooting

* Ensure **backend is running** before clicking **Review**
* If port is busy, kill it using:

  ```bash
  netstat -ano | findstr :5000
  taskkill /PID <pid> /F
  ```
* Increase payload limit for large code:

  ```js
  app.use(express.json({ limit: "2mb" }))
  ```

---

## 📦 Dependencies

### Backend

```bash
npm install express cors dotenv groq-sdk
```

### Frontend

```bash
npm install react react-dom axios prismjs react-simple-code-editor react-markdown rehype-highlight highlight.js
```

---

## 🎯 Future Improvements

* 🌍 Multi-language support (Python, C++, Java)
* ⚡ Streaming AI responses
* 🔐 Authentication & user profiles
* ☁️ Cloud deployment (Vercel + Render)
* 📊 Code quality scoring

---

## 🔗 Links

* **Frontend:** [http://localhost:5173](http://localhost:5173)
* **Backend:** [http://localhost:5000](http://localhost:5000)
* **AI Review Endpoint:** [http://localhost:5000/ai/get-review](http://localhost:5000/ai/get-review)
* **Health Check:** [http://localhost:5000/](http://localhost:5000/)

---

