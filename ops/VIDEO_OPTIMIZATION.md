# Hero Video Optimization Guide

- Target size: under 5–8 MB total.
- Format: H.264 MP4, 720p, 24–30 fps, progressive.
- Bitrate: 2.5–4 Mbps for 720p; lower if visuals allow.
- Audio: strip audio (muted autoplay).
- Keyframes: every 2 seconds.
- Poster: keep `logo-icon.svg` as poster for fast first paint.
- Preload: `preload="metadata"`, `muted` `playsInline` `loop` `autoPlay`.
- Layout stability: keep hero `min-h-screen` and overlays; video uses `object-cover` to avoid CLS.
- Delivery: host in `/public` and ensure base `./` for subfolder deploy.
- Validate on mobile: run Lighthouse mobile; ensure LCP under 2.5s on 4G throttling.
