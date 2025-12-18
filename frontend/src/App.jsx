import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from 'remark-gfm'
import "highlight.js/styles/github-dark.css"
import axios from 'axios'
import './App.css'

// Import Prism and language components correctly
import Prism from 'prismjs';

// Load Prism language components
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-clike';

// Array of programming quotes
const codingQuotes = [
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. – Martin Fowler",
  "First, solve the problem. Then, write the code. – John Johnson",
  "Programming isn't about what you know; it's about what you can figure out. – Chris Pine",
  "The only way to learn a new programming language is by writing programs in it. – Dennis Ritchie",
  "Code is like humor. When you have to explain it, it's bad. – Cory House",
  "Clean code always looks like it was written by someone who cares. – Michael Feathers",
  "Programming is the art of telling another human what one wants the computer to do. – Donald Knuth",
  "The function of good software is to make the complex appear to be simple. – Grady Booch",
  "Testing leads to failure, and failure leads to understanding. – Burt Rutan",
  "The best error message is the one that never shows up. – Thomas Fuchs"
];

function App() {
  const [code, setCode] = useState(`function sum(a, b) {
  return a + b;
}

// Test the function
console.log(sum(5, 3)); // Should output: 8
console.log(sum(10, 20)); // Should output: 30`)
  
  const [review, setReview] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [processingTime, setProcessingTime] = useState("")
  const [backendStatus, setBackendStatus] = useState("checking")
  const [currentQuote, setCurrentQuote] = useState("")

  useEffect(() => {
    // Initialize Prism highlighting
    Prism.highlightAll()
    
    // Check backend status on component mount
    checkBackendStatus()
    
    // Set initial random quote
    setCurrentQuote(codingQuotes[Math.floor(Math.random() * codingQuotes.length)])
    
    // Change quote every 30 seconds
    const quoteInterval = setInterval(() => {
      setCurrentQuote(codingQuotes[Math.floor(Math.random() * codingQuotes.length)])
    }, 30000)
    
    return () => clearInterval(quoteInterval)
  }, [])

  // Function to check if backend is running
  async function checkBackendStatus() {
    try {
      const response = await axios.get('http://localhost:5000/', {
        timeout: 3000
      })
      if (response.data.status === 'running') {
        setBackendStatus("connected")
      } else {
        setBackendStatus("error")
      }
    } catch (error) {
      setBackendStatus("disconnected")
    }
  }

  async function reviewCode() {
    try {
      setLoading(true)
      setError("")
      setReview("⏳ **Reviewing your code...**\n\nPlease wait while our AI analyzes your code.")
      setProcessingTime("")

      const response = await axios.post(
        'http://localhost:5000/ai/get-review',
        { code },
        {
          timeout: 60000,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.data.success) {
        setReview(response.data.review)
        if (response.data.metadata) {
          setProcessingTime(`Processed in ${response.data.metadata.processingTime}`)
        }
      } else {
        setError(`Error: ${response.data.error || 'Failed to get review'}`)
        setReview("")
      }

    } catch (error) {
      console.error('Review error:', error)
      
      let errorMessage = "❌ Failed to get review. "
      
      if (error.response) {
        errorMessage += `Server error: ${error.response.data?.error || error.response.statusText}`
      } else if (error.request) {
        errorMessage += "No response from server. Make sure the backend is running on http://localhost:5000"
        setBackendStatus("disconnected")
      } else if (error.code === 'ECONNABORTED') {
        errorMessage += "Request timed out. The code might be too long or server is busy."
      } else {
        errorMessage += error.message || "Unknown error occurred"
      }
      
      setError(errorMessage)
      setReview("")
    } finally {
      setLoading(false)
    }
  }

  function clearCode() {
    setCode("")
    setReview("")
    setError("")
    setProcessingTime("")
  }

  function loadExample() {
    const exampleCode = `// JavaScript Example with Issues
function calculatePrice(quantity, price, discount) {
  let total = quantity * price;
  
  if (discount) {
    total = total - discount;
  }
  
  return total;
}

// Missing error handling
function getUserData(userId) {
  fetch('/api/user/' + userId)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    });
}

// Inefficient function
function findDuplicates(arr) {
  const duplicates = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (i !== j && arr[i] === arr[j]) {
        duplicates.push(arr[i]);
      }
    }
  }
  return duplicates;
}`
    setCode(exampleCode)
    setReview("")
    setError("")
    setProcessingTime("")
  }

  // Function to get a new random quote
  function newQuote() {
    setCurrentQuote(codingQuotes[Math.floor(Math.random() * codingQuotes.length)])
  }

  // Function to highlight code in the editor
  const highlightCode = (code) => {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript')
  }

  return (
    <main>
      <div className="header">
        <div className="header-top">
          <h1>🔍 CodeRadar</h1>
          <div className={`backend-status ${backendStatus}`}>
            <div className="status-indicator"></div>
            <span>
              {backendStatus === "connected" ? "✅ Backend Connected" :
               backendStatus === "checking" ? "🔄 Checking Backend..." :
               backendStatus === "disconnected" ? "❌ Backend Disconnected" :
               "⚠️ Backend Error"}
            </span>
          </div>
        </div>
        
        <div className="quote-section">
          <p className="quote">"{currentQuote}"</p>
          <button onClick={newQuote} className="quote-btn" title="New quote">
            🔄
          </button>
        </div>
        
        <div className="controls">
          <button onClick={loadExample} className="example-btn" disabled={loading}>
            Load Example
          </button>
          <button onClick={clearCode} className="clear-btn" disabled={loading}>
            Clear Code
          </button>
          <button onClick={checkBackendStatus} className="status-btn" disabled={loading}>
            Check Backend
          </button>
        </div>
      </div>

      <div className="content">
        <div className="left">
          <div className="editor-header">
            <h2>📝 Your Code</h2>
            <div className="language-tag">JavaScript</div>
          </div>
          
          <div className="code-editor-container">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={highlightCode}
              padding={20}
              style={{
                fontFamily: '"Fira Code", "Consolas", monospace',
                fontSize: 14,
                lineHeight: 1.5,
                height: "100%",
                width: "100%",
                background: "#1e1e1e",
                color: "#d4d4d4",
                borderRadius: "0.5rem",
                overflow: "auto"
              }}
              textareaClassName="code-textarea"
              preClassName="code-pre"
              disabled={loading}
            />
          </div>

          <div className="editor-footer">
            <div className="code-stats">
              <span>Characters: {code.length}</span>
              <span>Lines: {code.split('\n').length}</span>
            </div>
            <button 
              onClick={reviewCode} 
              className="review-btn"
              disabled={loading || code.trim().length === 0 || backendStatus !== "connected"}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Reviewing...
                </>
              ) : "🔍 Scan Code"}
            </button>
          </div>
        </div>

        <div className="right">
          <div className="review-header">
            <h2>📋 Code Analysis</h2>
            {processingTime && (
              <div className="processing-time">
                ⚡ {processingTime}
              </div>
            )}
          </div>
          
          <div className="review-content">
            {error ? (
              <div className="error-message">
                <h3>Error</h3>
                <p>{error}</p>
                <div className="error-actions">
                  <button onClick={() => setError("")} className="dismiss-btn">
                    Dismiss
                  </button>
                  <button onClick={checkBackendStatus} className="retry-btn">
                    Retry Connection
                  </button>
                </div>
              </div>
            ) : review ? (
              <div className="markdown-content">
                <Markdown 
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {review}
                </Markdown>
              </div>
            ) : (
              <div className="placeholder">
                <div className="placeholder-icon">🔍</div>
                <h3>Code Analysis Report</h3>
                <p>Write or paste your code in the left panel and click "Scan Code"</p>
                <ul className="tips">
                  <li>✅ Instant quality assessment</li>
                  <li>🔍 Bug and vulnerability detection</li>
                  <li>🚀 Performance optimization tips</li>
                  <li>📝 Best practice recommendations</li>
                  <li>🛡️ Security audit findings</li>
                </ul>
                {backendStatus !== "connected" && (
                  <div className="connection-warning">
                    <p>⚠️ Backend not connected. Make sure it's running on <code>http://localhost:5000</code></p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="footer">
        <p>
          <strong>CodeRadar</strong> • AI-Powered Code Analysis • 
          Backend: <code>http://localhost:5000</code> • 
          Port: <code>5173</code>
        </p>
      </div>
    </main>
  )
}

export default App