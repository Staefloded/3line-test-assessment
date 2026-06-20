# Settings Page — React + Node.js

Responsive settings page built with React, Tailwind CSS, shadcn/ui primitives, and a Node.js REST API.

## Structure

```
settings-project/
├── client/   # React + Vite + Tailwind frontend
└── server/   # Node.js + Express REST API
```

## Frontend (client/)

```bash
cd client
npm install
npm run dev        # http://localhost:5173
npm test           # run Vitest tests
npm run build      # production build
```

## Backend (server/)

```bash
cd server
npm install
npm run dev        # http://localhost:3001
npm test           # run Jest tests
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/roles` | All roles data (active + table) |
| GET | `/api/roles/active` | Active role cards |
| GET | `/api/roles/table` | Table roles (supports `?status=` and `?type=` filters) |
| GET | `/api/roles/table/:id` | Single role by id |

## Deployment

- **Frontend**: Deploy `client/` to Vercel (framework: Vite)
- **Backend**: Deploy `server/` to Vercel (Node.js serverless)
- Set `VITE_API_URL` env var in the frontend Vercel project to point to the deployed API URL
