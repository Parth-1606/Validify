
# AI SaaS Validator

A Fullstack application that uses Google's Gemini AI to validate and analyze SaaS startup ideas.

## Features

- 🤖 AI-powered idea analysis using Gemini Models
- 📊 Comprehensive evaluation including:
  - Idea summary
  - Target users
  - Market potential
  - Competitor analysis
  - Monetization strategies
  - Risk assessment
  - Improvement suggestions
  - Final score (0-10)
  - Verdict (build/pivot/drop)
- ✨ Modern, fast React frontend using Vite and Tailwind CSS

## Setup

1. **Install Python backend dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Set up your Google API key:**
   - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - The API key for generating AI answers is **REQUIRED**.
   - Create a `.env` file in the project root:
     ```
     GOOGLE_API_KEY=your_api_key_here
     ```

3. **Install Frontend dependencies:**
   ```bash
   cd validify
   npm install
   ```

## Run the application

To run the application, you need to start both the Python backend and the Vite frontend.

1. **Start the FastAPI backend:**
   Open a terminal in the root directory and run:
   ```bash
   .\venv\Scripts\uvicorn app:app --reload
   ```
   (The backend runs on http://localhost:8000)

2. **Start the Frontend development server:**
   Open another terminal in the `validify` directory and run:
   ```bash
   npm run dev
   ```
   (The frontend runs on http://localhost:5173 - it proxies requests to the backend)

## Project Structure

- `app.py` - FastAPI backend server
- `validify/` - React / Vite frontend
- `llm.py` - LLM integration and analysis function
- `schema.py` - Pydantic models for structured output
- `prompts.py` - System and user prompts for the AI
- `database.py` - Database interactions for saving ideas

## Requirements

- Python 3.8+
- Node.js (for frontend)
- Google API key for Gemini (Yes, this is required)
- All dependencies listed in `requirements.txt` and `package.json`
