# CypherPulse

CypherPulse is a full-stack security monitoring project with a React frontend and an Express/Socket.io backend. The backend also integrates Firebase Admin for data and service handling.

## Repository structure

- `backend/` - backend source and build configuration
  - `dist/` - compiled backend output
  - `src/` - TypeScript backend source
  - `tsconfig.json` - TypeScript config
  - `package.json` - backend package scripts and dependencies
- `frontend/` - React frontend application
  - `package.json` - frontend package scripts and dependencies
- `.env.example` - backend environment variable template

## Key technologies

- Backend: Node.js, Express, Socket.io, Firebase Admin, TypeScript
- Frontend: React, TypeScript, Tailwind, Socket.io Client

## Setup

1. Install backend dependencies:

```bash
cd backend
npm install
```

2. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

3. Configure backend environment variables:

```bash
cd ../backend
copy .env.example .env.local
```

Then update `.env.local` with your Firebase credentials and optional `PORT`.

## Running the app

### Backend

From `backend/`:

```bash
npm run build
npm run dev
```

This starts the backend server from `dist/server.js`.

If you want to run the backend in production mode:

```bash
npm run build
npm start
```

### Frontend

From `frontend/`:

```bash
npm start
```

This starts the React development server.

## Notes

- The backend expects environment variables in `backend/.env.local` or `backend/.env`.
- The backend source is TypeScript and compiles into `backend/dist/`.
- The frontend connects to the backend over Socket.io via the browser client.

## Useful commands

### Backend

- `npm install` - install backend packages
- `npm run build` - compile TypeScript backend
- `npm run dev` - run the compiled backend with `nodemon`
- `npm start` - start the backend in production mode

### Frontend

- `npm install` - install frontend packages
- `npm start` - start the React development server
- `npm run build` - build the frontend for production

## Troubleshooting

- If `npm` cannot find `package.json`, ensure you are in the correct folder (`backend/` or `frontend/`).
- If the backend does not start, confirm your environment file exists and contains valid Firebase credentials.
