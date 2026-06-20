# Smriti Resume Website

A professional resume website built with React.js and Node.js.

## Structure

- `frontend`: Vite + React single page portfolio
- `backend`: Express API serving resume, project, blog, and music data

## Run Locally

Install dependencies:

```bash
npm run install:all
npm install
```

Start both apps:

```bash
npm run dev
```

Frontend: `http://localhost:5173`

Backend API: `http://localhost:5000/api/profile`

## Personalize

Update the main content in:

- `backend/src/profileData.js`
- `frontend/src/data/fallbackProfile.js`

The frontend uses the backend when it is available and falls back to local data when it is not.
