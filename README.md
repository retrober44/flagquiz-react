# Flagquiz
POC of a flag quiz to assign flags to the correct countries. It is implemented with React in the frontend and node in the backend.

# Prerequisites
- Node.js (Version 14 oder höher)
- npm

# Component structure
flaggenquiz/
├── backend/
│   ├── routes/
│   │   └── quiz.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   └── App.js
│   ├── public/
│   ├── package.json
│   └── ...
└── README.md

# Start quiz
## Start Frontend
cd frontend
npm start

## Start Backend
cd backend
node server.js

# Coding conventions

- Use comments
- Meaningful naming of attributes
- Use #id if something is unique 
- Use .class if something needs to be named indefinitely often
