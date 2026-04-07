# 🔥GitHub Streak Stats Api - Vercel Self-Hosted

> 🚀 Self-hosted GitHub streak stats with zero shared limits and full control.

A modern, self‑hosted, serverless GitHub streak stats API.

**Inspired by [GitHub Readme Streak Stats](https://github.com/denvercoder1/github-readme-streak-stats).**


This project was created to solve a real-world problem:

concurrency issues, rate limits, and unreliable data when using shared public endpoints.

The original project is excellent, but even when deploying it to Vercel or Heroku, all requests still passed through the author’s server — meaning:

- 	shared rate limits
- 	random failures
- 	inconsistent streak data
- 	no true self‑hosting

This project solves those issues completely.

## Why this project exists

I wanted a version that:

- 	runs entirely on my own Vercel account
- 	does not depend on any external server
- 	avoids concurrency issues
- 	avoids shared GitHub rate limits
- 	is stable, predictable and fast
- 	has a clean architecture designed for serverless

So I rebuilt the project with:

- 	a new folder structure
- 	a clean architecture
- 	dedicated serverless API routes
- 	isolated domain logic
- 	a robust caching system
- 	predictable error handling
- 	and one‑click deployment for anyone

Now every user gets their own private instance, with their own GitHub rate limits and zero interference from others.

## Tech Stack

This project is built with:

- 	Node.js (ESM)
- 	Vercel Serverless Functions
- 	GitHub GraphQL API
- 	Pure SVG rendering (no canvas, no images)

## Caching Strategy

- 	Vercel CDN cache
- 	1‑hour internal cache
- 	12‑hour historical cache

## Testing

-   Unit + integration testing with Vitest

## Deploy your own instance (recommended)

## 🚀 Deploy your own instance

Each user runs their own private API on Vercel.

No shared limits. No external dependencies.

### One-click deploy (option 1)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/FlavioKde/github-streak-stats-api)

### Steps

1. Click the deploy button  
2. Connect your GitHub account  
3. (Optional) Add your `GITHUB_TOKEN`  
4. Deploy  

Your API will be available at:

https://your-project.vercel.app/api/streak/svg?user=YOUR_USERNAME

### Option 2: Use public endpoint (LIMITED)

You can use: `https://tu-api.vercel.app/api/stats?user=USUARIO`
⚠️ **Rate limits apply** - For personal use, auto-expand is recommended

## ✨ Features added in this project

- ✅ **Serverless API Routes** - Runs on Vercel Functions
- ✅ **One-click deployment** - Deploy instantly with Vercel
- ✅ **Automatic scaling** - Vercel handles traffic spikes
- ✅ **Environment variables** - Easy configuration via Vercel dashboard

## 🧠 How it works

This project uses a clean, modular architecture:

- /api → serverless endpoints
- /lib/github → GitHub API integration
- /lib/streak → pure streak calculation logic
- /lib/render → SVG + JSON rendering
- /lib/cache → caching system
- /lib/http → error handling
- /lib/themes → theme system

Full details in:

📘 docs/architecture.md

Deployment guide:

📘 docs/vercel-guide.md

## 🎨 Themes Preview

Use any theme like this:

```bash

/api/streak/svg?user=FlavioKde&theme=dark

```

Examples:

🌑 Dark
https://github-readme-streak-stats-ashy-mu.vercel.app/api/streak/svg?user=FlavioKde&theme=dark&v=1

🌕 Light
https://github-readme-streak-stats-ashy-mu.vercel.app/api/streak/svg?user=FlavioKde&theme=light&v=1

🧛 Dracula
https://github-readme-streak-stats-ashy-mu.vercel.app/api/streak/svg?user=FlavioKde&theme=dracula&v=1

❄️ Nord
https://github-readme-streak-stats-ashy-mu.vercel.app/api/streak/svg?user=FlavioKde&theme=nord&v=1

🎌 Tokyo Night
https://github-readme-streak-stats-ashy-mu.vercel.app/api/streak/svg?user=FlavioKde&theme=tokyo&v=1

🌙 Solarized Dark
https://github-readme-streak-stats-ashy-mu.vercel.app/api/streak/svg?user=FlavioKde&theme=solarized_dark&v=1

🌅 Solarized Light
https://github-readme-streak-stats-ashy-mu.vercel.app/api/streak/svg?user=FlavioKde&theme=solarized_light&v=1

🎨 Monokai
https://github-readme-streak-stats-ashy-mu.vercel.app/api/streak/svg?user=FlavioKde&theme=monokai&v=1

🟫 Gruvbox Dark
https://github-readme-streak-stats-ashy-mu.vercel.app/api/streak/svg?user=FlavioKde&theme=gruvbox_dark&v=1

🟨 Gruvbox Light
https://github-readme-streak-stats-ashy-mu.vercel.app/api/streak/svg?user=FlavioKde&theme=gruvbox_light&v=1

🐱 Catppuccin Latte
https://github-readme-streak-stats-ashy-mu.vercel.app/api/streak/svg?user=FlavioKde&theme=catppuccin_latte&v=1

🐱 Catppuccin Frappe
https://github-readme-streak-stats-ashy-mu.vercel.app/api/streak/svg?user=FlavioKde&theme=catppuccin_frappe&v=1

🐱 Catppuccin Macchiato
https://github-readme-streak-stats-ashy-mu.vercel.app/api/streak/svg?user=FlavioKde&theme=catppuccin_macchiato&v=1

🐱 Catppuccin Mocha
https://github-readme-streak-stats-ashy-mu.vercel.app/api/streak/svg?user=FlavioKde&theme=catppuccin_mocha&v=1

🔵 One Dark Pro
https://github-readme-streak-stats-ashy-mu.vercel.app/api/streak/svg?user=FlavioKde&theme=one_dark_pro&v=1

**Important Note**

- The parameter &v=1 is to break the cache when you update the design.
- If you change something, raise it to &v=2, &v=3, etc.


## 📈 Change history

Consult [CHANGELOG.md](CHANGELOG.md) to see all the modifications specific to this project for Vercel.

## 🧪 Testing

This project uses Vitest and follows a clean testing strategy.
See:

📘 docs/architecture.md → Testing


## 📋 Documentation

- **[CHANGELOG.md](CHANGELOG.md)** - Change history of this project
- **[Original doc](docs/)** - Features and use of the base project 
- **[Doc to Vercel deploy](docs/vercel-guide.md)** -(docs/vercel-guide.md)
- **[architecture](docs/architecture.md)** -(docs/architecture.md)


## 🛣️ Roadmap

This project is actively evolving. Planned features include:

- 	Customizable error rendering
- 	Internationalization (i18n)
- 	Extended GitHub statistics (PRs, issues, languages, activity heatmaps)
- 	Optional visit tracking
- 	Theme System 2.0
- 	Plugin system
- 	Documentation website

Full roadmap:
📘 docs/architecture.md → Roadmap


## ❤️ Credits

Based on the amazing work of:
https://github.com/denvercoder1/github-readme-streak-stats

This project exists thanks to that foundation

## 🧩 License

MIT — free to use, modify and deploy.
