# GenderLator Backend API

Simple Express.js backend that provides AI-powered translation using Google AI (Gemini).

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Create `.env` file from example:

```bash
cp .env.example .env
```

3. Add your Google AI API key to `.env`:

```
GOOGLE_AI_API_KEY=your_api_key_here
```

Get your API key from: [Google AI Studio](https://aistudio.google.com/app/apikey)

## Running

Development mode (with auto-reload):

```bash
pnpm run dev
```

Production mode:

```bash
pnpm start
```

The server runs on `http://localhost:3001` by default.

## API Endpoints

### POST /api/translate

Translates a phrase using AI.

**Request Body:**

```json
{
  "text": "Nic mi nie jest",
  "mode": "female-to-male"
}
```

**Mode options:**
- `female-to-male` - Translates phrases spoken by women into male perspective
- `male-to-female` - Translates phrases spoken by men into female perspective

**Response:**

```json
{
  "translation": "Mam poważny problem i oczekuję, że się domyślisz co to jest",
  "mode": "female-to-male",
  "originalText": "Nic mi nie jest"
}
```

### GET /api/health

Health check endpoint.

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2026-01-08T12:00:00.000Z"
}
```

## Configuration

Environment variables (`.env`):

| Variable | Description | Default |
|----------|-------------|---------|
| `GOOGLE_AI_API_KEY` | Google AI API key | (required) |
| `PORT` | Server port | `3001` |
