# Logistics Model

Static site, no build step, no dependencies.

    index.html        page
    style.css         styles
    script.js         canvas scene and animation
    404.html          redirects to home
    robots.txt
    assets/favicon.svg

Upload the CONTENTS of this folder (not the folder itself) to the web root of
any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, cPanel public_html).
Test locally: `python3 -m http.server` inside this folder, then open http://localhost:8000

The canvas always fills the full viewport height and width and re-fits on resize or rotation.
No mouse or touch interaction: the scene is a pure animation.
