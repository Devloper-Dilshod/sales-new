# SalesNews.uz — Telegram Premium & Stars Hub

A premium, animated single-page web application for the **SalesNews** Telegram ecosystem. Built with smooth 3D effects, Lottie premium emoji animations, and a polished glassmorphism UI.

## ✨ Features

- **Premium Telegram-style UI** — Glassmorphism panels, gradients, and micro-animations
- **Animated Brand Logo** — Custom rotating Telegram Premium-style verification badge
- **Lottie Premium Emojis** — Animated sticker/emoji badges rendered via `@lottiefiles/lottie-player`
- **3D Team Carousel** — Rotating 3D admin card showcase with orbiting team members
- **Sticker Showcase** — Auto-rotating animated sticker preview linked to the Telegram sticker pack
- **Uptime Counter** — Live counter showing days since the channel launched (18.06.2025)
- **Ecosystem Links** — Direct links to the main channel, guarantee forum, group chat, bot, and NFT collection
- **Market / Shop** — Pricing cards for Telegram Premium & Stars packages
- **Smooth Page Navigation** — Animated tab switching between Home, Ecosystem, Market, and Team pages
- **Background Particles** — Subtle floating particle animation for depth
- **Loading Screen** — Premium animated loader with spinning badge

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| [Vite](https://vitejs.dev) | Dev server & build bundler |
| [Tailwind CSS](https://tailwindcss.com) (CDN) | Utility-class styling |
| [Vanilla CSS](./index.css) | Custom animations, glassmorphism, 3D effects |
| [@lottiefiles/lottie-player](https://lottiefiles.com) | Animated premium emoji rendering |
| [Font Awesome 6](https://fontawesome.com) | Icon library |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs at **http://localhost:5173**

## 📁 Project Structure

```
SalesNews/
├── index.html       # Main HTML entry point
├── app.js           # Core app logic (navigation, animations, emoji renderer)
├── index.css        # Custom styles, animations, 3D carousel
├── asstes/          # Lottie JSON files for premium emojis (logo.json, 0-6.json)
├── stickers/        # Lottie sticker animations for showcase
└── dist/            # Production build output (git-ignored)
```

## 🔗 Links

| Resource | URL |
|----------|-----|
| Main Channel | [@ekspres](https://t.me/ekspres) |
| Guarantee Forum | [@garantliy](https://t.me/garantliy) |
| Sticker Pack | [t.me/addemoji/Sales_news](https://t.me/addemoji/Sales_news) |
| NFT Collection | [GetGems](https://getgems.io/collection/EQCSHymtT2iQHBbU5Y6w4uhMsFg44vsKAbptENupJgPo6XYU) |

## 📄 License

ISC © SalesNews Team
