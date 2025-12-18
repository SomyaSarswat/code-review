require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ BackEnd server is running on http://localhost:${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/`);
    console.log(`🤖 AI endpoint: http://localhost:${PORT}/ai/get-review`);
    console.log(`🩺 AI health: http://localhost:${PORT}/ai/health`);
});