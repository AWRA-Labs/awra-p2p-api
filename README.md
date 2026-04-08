# AWRA P2P API

Minimal Node.js + TypeScript backend scaffold.

## Scripts

- `npm run dev` starts the API in watch mode
- `npm run build` compiles TypeScript to `dist/`
- `npm start` runs the compiled server
- `npm run typecheck` validates TypeScript without emitting files

## Getting started

1. Install dependencies with `npm install`
2. Copy `.env.example` to `.env` if you want to override the default port
3. Run `npm run dev`

The API exposes a health check at `GET /health`.
