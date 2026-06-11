# Personal Website

A personal website for Gabriel Cruz featuring an AI assistant ("Winston") that answers questions
about his background, experience, and skills. The site is a statically-exported single-page
application backed by a small serverless API that streams responses from a large language model.

---

## Highlights

- **Single-page site** with smooth section navigation, scroll-spy, light/dark theming, and an
  embedded conversational assistant.
- **Streaming AI chat** — responses are streamed token-by-token over Server-Sent Events (SSE).
- **Conversation memory** — each browser session keeps context across messages.
- **Fully serverless** — no servers to manage; static assets on a CDN and an on-demand function
  for the API.
- **Infrastructure as code** — the entire AWS stack is defined in Terraform and deployed by CI.

---

## Tech Stack

| Layer            | Technology |
| ---------------- | ---------- |
| Frontend         | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 |
| Theming          | `next-themes` (system / light / dark) |
| Markdown         | `react-markdown` (renders assistant replies) |
| Backend          | Python 3.12, FastAPI, served by Uvicorn locally / Mangum on Lambda |
| AI               | OpenAI `gpt-4o-mini` (streaming chat completions) |
| Hosting (static) | Amazon S3 + CloudFront |
| Hosting (API)    | AWS Lambda + API Gateway (HTTP API) |
| Storage          | Amazon S3 (chat sessions) |
| DNS / TLS        | Route 53 + ACM |
| IaC              | Terraform |
| CI/CD            | GitHub Actions |

---

## Architecture

```
                         ┌────────────────────────────────────────────┐
                         │                    Browser                 │
                         │           React/Next.js static SPA         │
                         └───────────────┬───────────────┬────────────┘
                                         │               │
                           static assets │               │ POST /api/chat (SSE)
                                         ▼               ▼
                  ┌──────────────────────────┐   ┌──────────────────────────┐
                  │      CloudFront (CDN)    │   │   API Gateway (HTTP API) │
                  │   TLS via ACM, Route 53  │   └─────────────┬────────────┘
                  └────────────┬─────────────┘                 │
                               │                               ▼
                               ▼                   ┌──────────────────────────┐
                  ┌──────────────────────────┐     │   AWS Lambda             │
                  │  S3 (frontend bucket)    │     │   FastAPI app via Mangum │
                  │  private, OAC-restricted │     └───────┬───────────┬──────┘
                  └──────────────────────────┘             │           │
                                                           ▼           ▼
                                              ┌────────────────┐  ┌──────────────┐
                                              │  S3 (memory)   │  │  OpenAI API  │
                                              │ chat sessions  │  │  gpt-4o-mini │
                                              └────────────────┘  └──────────────┘
```

### Components

- **Frontend (`frontend/`)** — A Next.js App Router project exported to fully static files
  (`output: "export"`). There is no Node server in production; the build output in `out/` is plain
  HTML/CSS/JS uploaded to S3 and served through CloudFront.

- **Backend (`backend/`)** — A FastAPI application with two endpoints:
  - `POST /api/chat` — streams an assistant reply over SSE.
  - `GET /api/resume` — serves a PDF.

  The same app runs locally under Uvicorn and in production on Lambda. The Lambda entrypoint is a
  single line — `handler = Mangum(app)` — which adapts the ASGI app to the Lambda event model, so
  no framework code is duplicated between environments.

- **Infrastructure (`terraform/`)** — Declares every AWS resource: the frontend S3 bucket and
  CloudFront distribution (with Origin Access Control so the bucket stays private), the Lambda
  function and HTTP API Gateway, the memory S3 bucket, IAM roles, and the Route 53 / ACM records
  for a custom domain.

---

## How the Chat Works

1. On the first message, the frontend generates a session UUID and persists it for the browser
   session.
2. It sends `{ session_id, message }` to `POST /api/chat`.
3. The backend loads that session's prior messages, appends the new user message, and calls the
   model with a composed system prompt: the assistant persona + a context document about Gabriel +
   the extracted text of his resume.
4. The model's reply is streamed back as SSE events:
   - `session` — the session id (sent first),
   - `chunk` — an incremental content delta,
   - `done` — stream finished,
   - `error` — something went wrong.
5. The frontend appends `chunk`s as they arrive and renders them as markdown.
6. When the stream completes, the full assistant message is written back to the session store.

The assistant's system prompt is deliberately constrained: it only answers questions about
Gabriel's professional background or about itself, and explicitly refuses attempts to override its
instructions (basic prompt-injection hardening).

---

## Project Structure

```
.
├── frontend/        # Next.js static SPA (App Router, src/ directory)
│   └── src/
│       ├── app/         # layout, page, /privacy, /terms, globals.css
│       └── components/  # Navbar, Hero, Skills, Experience, Education,
│                        # Contact, Footer, ChatBot, theming, reveal effects
├── backend/         # FastAPI app
│   ├── main.py          # endpoints, SSE streaming, session load/save
│   ├── *_context.py     # builds the system prompt from data files
│   └── data/            # context documents + resume PDF
├── memory/          # local chat session JSON (S3 in production)
├── terraform/       # AWS infrastructure as code
└── .github/workflows/deploy.yml   # CI/CD
```

---

## Local Development

### Frontend

```bash
cd frontend
npm install
npm run dev          # http://localhost:3000
```

### Backend

```bash
cd backend
uv run uvicorn main:app --reload --port 8000   # http://localhost:8000
```

### Environment

Root `.env` (consumed by the backend):

| Variable          | Purpose |
| ----------------- | ------- |
| `OPENAI_API_KEY`  | Required — authenticates the model calls. |
| `CORS_ORIGINS`    | Allowed origin(s); single value or comma-separated (e.g. apex + www). |
| `MEMORY_BUCKET`   | Production only — S3 bucket for sessions. Leave unset locally to use `memory/`. |

Frontend `frontend/.env.local`:

| Variable              | Purpose |
| --------------------- | ------- |
| `NEXT_PUBLIC_API_URL` | Backend base URL. Unset locally → defaults to `http://localhost:8000`. Set at build time in production to the API Gateway endpoint. |

---

## Deployment

The stack is deployed entirely through Terraform, automated by GitHub Actions
(`.github/workflows/deploy.yml`):

1. **Build the Lambda package** — `terraform/scripts/build_lambda.py` produces a zip with
   Linux-compatible wheels.
2. **`terraform apply`** — provisions/updates all AWS resources and emits the API endpoint, bucket
   names, and CloudFront distribution id as outputs.
3. **Build the frontend** with `NEXT_PUBLIC_API_URL` set to the freshly-provisioned API endpoint,
   then `aws s3 sync` the `out/` directory to the frontend bucket.
4. **Invalidate** the CloudFront cache so the new assets are served immediately.

A push to `main` runs the full apply-and-deploy flow. A manual `workflow_dispatch` can run either
`apply` or `destroy` to tear the environment down. See `terraform/README.md` for first-time setup.

---

## Design Decisions

**Static export over a Node server.**
The site is content-driven and has a single dynamic feature (the chat). Exporting to static files
removes an entire class of runtime concerns — there is no server to patch, scale, or keep warm — and
makes the frontend trivially cacheable at the CDN edge. The one dynamic piece is isolated behind its
own API rather than forcing the whole app onto a server runtime.

**One FastAPI app, two runtimes.**
The backend is written as an ordinary ASGI app and adapted to Lambda with Mangum in a single line.
This keeps local development fast and conventional (`uvicorn --reload`) while still deploying to a
pay-per-request serverless function — no separate "Lambda version" of the code to maintain.

**Lambda + API Gateway instead of a container/VM.**
Traffic is spiky and low-volume, so an always-on server would mostly sit idle. An on-demand function
costs nothing when no one is chatting and scales out automatically when they are. The trade-off is
cold starts and that API Gateway buffers the response (see the streaming note below).

**Dual-mode session storage.**
`load_session` / `save_session` write to S3 when `MEMORY_BUCKET` is set and to the local `memory/`
folder otherwise. The runtime needs no code branches beyond this helper, and local development
requires no AWS credentials at all. S3 was chosen over a database because sessions are simple,
self-contained JSON blobs keyed by id — there are no relational queries to justify the extra moving
part.

**SSE for streaming.**
Server-Sent Events are a natural fit for one-directional token streaming: they ride over plain HTTP,
need no extra protocol negotiation, and degrade gracefully. In production, API Gateway buffers the
Lambda response, so the reply arrives in one piece rather than token-by-token — but the same SSE
parser on the client handles both cases, so no special-casing is required.

**Composed, constrained system prompt.**
The assistant's instructions are assembled at startup from a persona file, a context document, and
the extracted resume text. Keeping these in plain data files (rather than hard-coded strings) makes
the assistant's knowledge editable without touching application logic, and the strict guardrails in
the prompt limit it to its intended scope.

**Private S3 + CloudFront with OAC.**
The frontend bucket is never public; CloudFront reaches it through an Origin Access Control identity.
This means assets are only ever served through the CDN (with TLS and caching) and the bucket itself
has no public surface area.

**Infrastructure as code from day one.**
Every resource — buckets, CDN, function, gateway, DNS, certificates, IAM — lives in Terraform, and
the same definitions create or destroy the whole environment. Nothing is click-configured in the
console, so the deployment is reproducible and reviewable.
