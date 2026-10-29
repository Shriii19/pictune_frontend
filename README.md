# PicTune — Photo to playlist

A React frontend connected to the PicTune REST API for photo results and email/password accounts.

## Run locally

Install dependencies with `npm install`, copy `.env.example` to `.env.local`, and run `npm run dev`. Start the backend separately on port 5000. `VITE_API_URL` must include the `/api` prefix. Production defaults to `https://pictune-backend.vercel.app/api`.

Run `npm run build` for a production build and `npm run lint` for code checks.

## Photo results

Upload one JPEG, PNG, WebP, or AVIF up to 4 MiB. The original file is sent as multipart form data to `/api/predict`, with the selected Hindi, English, or Marathi language preferences. Guests use a persistent UUID; signed-in users send their backend login token. Two successful guest results are allowed before sign-in is required.

Only successful backend results populate the playlist. Requests that fail show the error without creating songs locally. The result displays the analysis source, returned songs, and captions. Colour-only responses are explicitly labelled as estimates; actual scene recognition requires the backend's vision integration to be configured.

The latest result ID is kept in session storage and reloaded through `/api/results` on refresh. The library stores result text locally on this device, up to 24 entries. Photo bytes are not stored in the library. It uses `pictune-library-v2`; older local entries are left untouched and are not displayed.

## Accounts and deployment

Login and registration call the backend's `/api/login` and `/api/register` endpoints directly. Backend storage, signing credentials, allowed frontend origin, and vision-provider configuration must be set in the backend deployment. Only `VITE_API_URL` belongs in frontend configuration; never put backend secrets in a `VITE_` variable.

Rebuild and redeploy the frontend after configuration or source changes. A reachable health endpoint does not establish that account or photo storage is configured.
