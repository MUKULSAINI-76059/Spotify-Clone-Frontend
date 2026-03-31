<div align="center">

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/168px-Spotify_logo_without_text.svg.png" width="100" alt="Spotify Logo"/>

# 🎵 Spotify Clone — Frontend

**A modern, fully responsive music streaming web app**  
Built with **React**, **TypeScript**, **Tailwind CSS**, and **Shadcn UI**

<br/>

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

<br/>

![GitHub repo size](https://img.shields.io/github/repo-size/MUKULSAINI-76059/Spotify-Clone-Frontend?color=1DB954&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/MUKULSAINI-76059/Spotify-Clone-Frontend?color=1DB954&style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/MUKULSAINI-76059/Spotify-Clone-Frontend?color=1DB954&style=flat-square)
[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Click_Here-1DB954?style=flat-square)](https://spotify-clone-frontend-vert.vercel.app)

<br/>

### 🌐 [View Live Demo](https://spotify-clone-frontend-vert.vercel.app) &nbsp;|&nbsp; 🔧 [Backend Repo](https://github.com/MUKULSAINI-76059/Spotify-Clone-Backend)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🖼️ Screenshots](#️-screenshots)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🔐 Environment Variables](#-environment-variables)
- [📡 API Integration](#-api-integration)
- [🎨 UI Components](#-ui-components)
- [📦 Dependencies](#-dependencies)
- [🤝 Contributing](#-contributing)
- [👨‍💻 Author](#-author)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **Authentication** | Register, Login & Logout with JWT cookie sessions |
| 🎵 **Music Player** | Stream songs with play, pause, skip controls |
| 💿 **Albums** | Browse and manage music albums |
| 📤 **Upload Songs** | Upload tracks with cover art |
| 🎨 **Dark Theme** | Spotify-inspired dark UI throughout |
| 📱 **Fully Responsive** | Works on mobile, tablet and desktop |
| ⚡ **Fast & Optimized** | Powered by Vite for lightning-fast builds |
| 🧩 **Component Library** | Built with Shadcn UI + Radix UI primitives |
| 🔄 **React Query** | Efficient server state management & caching |
| 🎞️ **Animations** | Smooth transitions with Framer Motion |
| 🛡️ **Type Safe** | Full TypeScript coverage |
| ✅ **Form Validation** | React Hook Form + Zod schema validation |

---

## 🖼️ Screenshots

> 📸 *Add your app screenshots here by uploading images to the repo*

| Page | Preview |
|------|---------|
| 🏠 Home | `screenshot-home.png` |
| 🔐 Login | `screenshot-login.png` |
| 📝 Register | `screenshot-register.png` |
| 🎵 Player | `screenshot-player.png` |

---

## 🛠️ Tech Stack

```
Framework     →  React 18 + TypeScript
Build Tool    →  Vite 5
Styling       →  Tailwind CSS 3 + Shadcn UI
UI Primitives →  Radix UI
Routing       →  React Router DOM v6
State/Data    →  TanStack React Query v5
HTTP Client   →  Axios
Forms         →  React Hook Form + Zod
Animations    →  Framer Motion
Charts        →  Recharts
Deployment    →  Vercel
AI Assist     →  Lovable (UI scaffolding)
```

---

## 📁 Project Structure

```
Spotify-Clone-Frontend/
│
├── 📂 public/              # Static assets (favicon, images)
├── 📂 src/
│   ├── 📂 components/      # Reusable UI components
│   │   └── 📂 ui/          # Shadcn UI component library
│   ├── 📂 pages/           # Route-level page components
│   ├── 📂 hooks/           # Custom React hooks
│   ├── 📂 services/        # API call functions (Axios)
│   ├── 📂 lib/             # Utility functions
│   ├── 📂 types/           # TypeScript type definitions
│   ├── 📄 App.tsx          # Root component with routing
│   └── 📄 main.tsx         # App entry point
│
├── 📄 index.html           # HTML entry point
├── 📄 vite.config.ts       # Vite configuration
├── 📄 tailwind.config.ts   # Tailwind configuration
├── 📄 tsconfig.json        # TypeScript configuration
├── 📄 components.json      # Shadcn UI config
├── 📄 vercel.json          # Vercel SPA routing fix
└── 📄 package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) `v18+`
- [Git](https://git-scm.com/)
- Backend running — see [Backend Repo](https://github.com/MUKULSAINI-76059/Spotify-Clone-Backend)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/MUKULSAINI-76059/Spotify-Clone-Frontend.git
cd Spotify-Clone-Frontend
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**
```bash
cp .env.example .env
```

**4. Start the development server**
```bash
npm run dev
```

App will run at `http://localhost:8080` 🎉

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://spotify-clone-backend-mgni.onrender.com
```

For local development:
```env
VITE_API_URL=http://localhost:5000
```

> ⚠️ All Vite env variables **must** start with `VITE_` to be accessible in the browser.

---

## 📡 API Integration

All API calls go through Axios with credentials enabled for JWT cookie auth.

```ts
// src/services/api.ts
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,  // sends JWT cookie automatically
})

export default api
```

### API Endpoints Used

| Feature | Method | Endpoint |
|---------|--------|----------|
| Register | `POST` | `/api/auth/register` |
| Login | `POST` | `/api/auth/login` |
| Logout | `POST` | `/api/auth/logout` |
| Get Songs | `GET` | `/api/music` |
| Upload Song | `POST` | `/api/music/upload` |
| Get Albums | `GET` | `/api/music/albums` |

---

## 🎨 UI Components

This project uses [Shadcn UI](https://ui.shadcn.com/) — a collection of beautifully designed, accessible components built on Radix UI primitives.

Key components used: `Button`, `Dialog`, `Slider`, `Avatar`, `Toast`, `Tabs`, `ScrollArea`, `Dropdown Menu`, `Progress`, `Switch`, `Input`, `Label`, and more.

---

## 📦 Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^18.3.1 | UI framework |
| `typescript` | ^5.8.3 | Type safety |
| `vite` | ^5.4.21 | Build tool |
| `tailwindcss` | ^3.4.17 | Utility CSS |
| `react-router-dom` | ^6.30.1 | Client-side routing |
| `@tanstack/react-query` | ^5.83.0 | Server state management |
| `axios` | ^1.7.0 | HTTP requests |
| `react-hook-form` | ^7.61.1 | Form management |
| `zod` | ^3.25.76 | Schema validation |
| `framer-motion` | ^11.0.0 | Animations |
| `lucide-react` | ^0.462.0 | Icon library |
| `sonner` | ^1.7.4 | Toast notifications |
| `lovable-tagger` | ^1.1.13 | AI-assisted UI tooling |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 🎉

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/cool-feature`
3. **Commit** your changes: `git commit -m 'Add cool feature'`
4. **Push** to the branch: `git push origin feature/cool-feature`
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

<div align="center">

**Mukul Saini**

[![GitHub](https://img.shields.io/badge/GitHub-MUKULSAINI--76059-181717?style=for-the-badge&logo=github)](https://github.com/MUKULSAINI-76059)
[![Live Demo](https://img.shields.io/badge/🚀_Live_App-spotify--clone-1DB954?style=for-the-badge)](https://spotify-clone-frontend-vert.vercel.app)

*If you found this project helpful, consider giving it a ⭐ — it means a lot!*

</div>

---

<div align="center">

**🔗 Related Repositories**

[🔧 Backend Repo](https://github.com/MUKULSAINI-76059/Spotify-Clone-Backend) &nbsp;·&nbsp; [🌐 Live Demo](https://spotify-clone-frontend-vert.vercel.app)

<br/>

Made with ❤️ and 🎵 by Mukul Saini

</div>
