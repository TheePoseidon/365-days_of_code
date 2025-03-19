# Enhanced Student Portal

A modern student portal with chat functionality and a beautiful UI. This project combines the design from Day 78 with additional features from Day 74.

## Features

- Modern, responsive UI
- Real-time chat with AI assistant
- Authentication system
- Dynamic notifications
- Course management
- Exam board
- Search functionality

## Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Set up environment variables:
Create a `.env` file with the following:
```
JWT_SECRET_KEY=your-secret-key
OPENAI_API_KEY=your-openai-api-key
```

3. Initialize the database:
```bash
python app.py
```

4. Run the development server:
```bash
python app.py
```

The application will be available at `http://localhost:5000`

## Project Structure

- `index.html` - Main application interface
- `login.html` - User authentication page
- `style.css` - Styling and theme
- `script.js` - Frontend functionality
- `app.py` - Backend server and API
- `requirements.txt` - Python dependencies

## Technologies Used

- Frontend: HTML5, CSS3, JavaScript
- Backend: Flask, SQLAlchemy
- Authentication: JWT
- AI Chat: OpenAI GPT-3.5
- Database: SQLite

## Notes

- Replace the OpenAI API key in `app.py` with your own key
- For production, update the JWT secret key and use environment variables
- The chat feature requires an active OpenAI API subscription