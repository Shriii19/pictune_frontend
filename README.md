# PicTune — A sound for every sight

A React 19 frontend for turning photos and feelings into soundtracks. This phase focuses on the complete frontend experience; AI analysis and account services come next.

## Run locally

Requires Node.js 20.19+ or 22.12+ and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Production build: `npm run build`.

## Frontend features

- Responsive music studio with compact top navigation and a mobile menu
- Drag-and-drop photo upload, preview, replacement, and removal
- JPG, PNG, and WebP validation with a 10 MB file limit
- Four sample scenes and four mood choices
- English, Hindi, or mixed curated sample playlists
- YouTube search links for each track and copyable track lists
- Device-local saved playlists, search, and removal
- Consistent discovery, library, process, sign-in, and registration screens
- Accessible labels, keyboard focus states, and reduced-motion support

Photos are resized locally before preview and storage. Uploaded photos are not sent to a server. Library data lives in localStorage on the current browser and device, with up to 24 saved playlists. Clearing browser data removes it.

The studio uses handpicked sample tracks based on the selected mood and language. It does not analyze uploaded images yet. Image colors and sample artwork are illustrative. Sample photos load from Unsplash; fonts load from Google Fonts. Track thumbnails are scene artwork, not official album covers.

## Backend phase

Copy `.env.example` to `.env.local`. Account forms are in preview mode by default and do not submit credentials. Existing API functions in `src/services/api.js` are retained for integration.

When account services are ready, set `VITE_ENABLE_BACKEND=true` and configure `VITE_API_URL`. Google authentication also needs `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Restart Vite after changing environment variables. The studio and library remain local previews until their endpoints are integrated.

## Main files

- `src/pages/Home.jsx`: upload studio, preferences, and mood collections
- `src/components/Playlist.jsx`: tracks, local saving, and copying
- `src/data/collections.js`: sample scenes and curated tracks
- `src/hooks/useLibrary.js`: local saved playlist persistence
- `src/pages/History.jsx`: searchable library
- `src/App.css` and `src/index.css`: layout and shared design tokens
