<div align="center">

# ◐ MotionLab

**A motion-first design studio website. Smooth scroll, 3D blob, cinematic video, zero boring.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel)](https://your-vercel-url.vercel.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=for-the-badge&logo=greensock&logoColor=black)](https://gsap.com)
[![Three.js](https://img.shields.io/badge/Three.js-r167-000000?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org)

</div>

---

## ✨ What is this?

MotionLab is an interactive, animation-heavy portfolio and studio website built to feel like a premium agency site. It combines a WebGL 3D blob, scroll-driven GSAP animation, looping video showcases, and a custom preloader into one fast single-page experience.

## 🎬 Features

- **3D interactive blob** rendered with Three.js
- **Scroll-driven animation** and floating parallax elements powered by GSAP
- **Animated preloader** that cycles through custom visuals before the site reveals
- **Video portfolio grid** with autoplaying, muted project loops
- **Contact modal** and a clean sticky navbar
- **Optimised assets**: compressed videos and WebP images for quick loads
- **Fully responsive** and deployed on Vercel

## 🧱 Tech Stack

| Layer | Tools |
| --- | --- |
| Framework | React 18 |
| Build tool | Vite 5 |
| Animation | GSAP |
| 3D | Three.js |
| Icons | Lucide React |
| Hosting | Vercel |

## 📁 Project Structure

```
MotionLab/
├── public/
│   └── assets/            # Videos and WebP images
├── src/
│   ├── components/
│   │   ├── 3D/
│   │   │   └── BlobCanvas.jsx
│   │   ├── Hero.jsx
│   │   ├── AboutSection.jsx
│   │   ├── PortfolioGrid.jsx
│   │   ├── ContactModal.jsx
│   │   ├── Navbar.jsx
│   │   └── Preloader.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

## 🚀 Getting Started

**Prerequisites:** Node.js 18 or newer.

```bash
# 1. Clone the repo
git clone https://github.com/Quantumboy80/MotionLab.git
cd MotionLab

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you're in.

### Production build

```bash
npm run build     # outputs to /dist
npm run preview   # preview the production build locally
```

## 🌐 Deploying to Vercel

1. Push this repo to GitHub
2. Import it on [vercel.com](https://vercel.com) via **Add New → Project**
3. Use these settings (Vercel detects them automatically):
   - **Framework:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Click **Deploy**

Every push to `main` redeploys automatically.

## ⚡ Performance Notes

- Project videos are compressed (H.264, 1280px wide, no audio) so the whole asset folder stays under 10 MB
- Videos are muted and autoplay, which browsers allow without user interaction
- If you add heavier video, host it on a CDN (Cloudinary, Bunny, R2) instead of committing it to the repo. GitHub rejects files over 100 MB

## 🗺️ Roadmap

- [ ] Add project detail pages
- [ ] Lazy-load videos below the fold
- [ ] Add page transitions
- [ ] Improve mobile performance for the 3D scene
- [ ] Add a working contact form backend

## 👤 Author

**Sayan** · [@Quantumboy80](https://github.com/Quantumboy80)

Electrical Engineering undergrad building at the intersection of AI/ML and full-stack web.

## 📄 License

MIT. Feel free to learn from it, fork it, and build on it.

---

<div align="center">

If you like this project, drop a ⭐ on the repo.

</div>
