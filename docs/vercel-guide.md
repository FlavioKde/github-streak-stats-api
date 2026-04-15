# Vercel deployment guide

This guide explains how to deploy your own private instance of
GitHub Streak Stats Api
Each user runs their own serverless API, with no shared limits and no dependency on external servers.

## 🎯 Why deploy your own instance?

The original project (and many forks) still route requests through a shared backend.

This causes:
- rate limit issues
- concurrency problems
- inconsistent streak data
- random failures

This project is designed for true self‑hosting:
- every user gets their own API
- every user uses their own GitHub rate limits
- no shared traffic
- no bottlenecks
- no dependency on this project

Deploying your own instance ensures 100% reliability.



## Prerequisites

- Account in [Vercel](https://vercel.com) (free)
- Account in GitHub
- This repository fork (optional but recommended)

No GitHub token is required to run the project.
No database is required.
No configuration is required.

## Method 1: Deploy with one click (RECOMMENDED)

Click the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/FlavioKde/github-streak-stats-api)

Deploy with Vercel (vercel.com)

Vercel will:
1. 	Clone the repository
2.  Create a new project
3. 	Configure the project
4. 	Prompt you to add environment variables

## 🔐 GitHub Token (Required)

This project requires a GitHub token to work.

Without it, the API will return a configuration error.

### Why?

- GitHub GraphQL API requires authentication
- Avoids strict anonymous rate limits
- Ensures stable and reliable responses

### How to create it

1. Go to GitHub → Settings → Developer Settings → Personal Access Tokens
2. Create a **Classic Token**
3. Select:
   - `public_repo`

### Add it to Vercel

Add the following environment variable:

```bash

GITHUB_TOKEN=your_token_here

```

Then deploy

### After deployment

When finished, your API will be available at:

```bash

https://<your-project>.vercel.app/api/streak/svg?user=YOUR_GITHUB_USERNAME

```

⚠️ Note:
The root URL (/) will return 404.
This is expected — this project only exposes API endpoints.

## Method 2: Manual deployment

```bash
# 1. Clone this project
git clone https://github.com/FlavioKde/github-streak-stats-api.git

# 2. Install Vercel CLI
npm i -g vercel

# 3. Deployment init
vercel

# 4. Follow the instructions
(Vercel will ask for project name, scope, etc.)

# 5. To production:
vercel --prod

```
Your production URL will look like:

```bash

https://<your-project>.vercel.app

```

## 🧪 Testing your deployment

If everything is working correctly, you should see a generated SVG image.

If you see an error SVG, check the troubleshooting section below.


Try opening:

```bash

https://<your-project>.vercel.app/api/streak/svg?user=YOUR_USERNAME

```

## 🧩 Using it in your GitHub README

Add this to your README:

```bash

![GitHub Streak](https://<your-project>.vercel.app/api/streak/svg?user=YOUR_USERNAME&theme=dark)

```

## ⚙️ Optional: Environment Variables (Advanced Users)

This project works out of the box with no configuration.

However, you can optionally provide:

### GITHUB_TOKEN

## 🔐 GitHub Token (Optional but recommended)

This project works without a GitHub token using public GraphQL queries.

However, providing a `GITHUB_TOKEN` is recommended for:

- higher rate limits
- better reliability
- avoiding anonymous request throttling

To configure it:

```bash

GITHUB_TOKEN=your_token_here

```

## 🧯 Troubleshooting

❌ The SVG shows an error
Check that:
• 	the  `user`parameter is correct
• 	your GitHub username exists
• 	your Vercel project is deployed correctly
❌ Vercel shows a 500 error
Try redeploying:

```bash

vercel --prod

```

## ❌ The SVG does not update

GitHub caches images aggressively.

Use the  parameter:

```bash

&v=2

```

## ❓ FAQ

**Do I need a GitHub token?**
No. This project uses public GitHub GraphQL queries.

**Does this consume my GitHub rate limit?**
Yes — but only for your own instance, not shared with others.

**Can I use this in my GitHub README?**
Yes, that’s the main purpose.

**Does it cost money?**
No.
Vercel’s free tier is more than enough.

## 🎉 Done!
Your private instance is ready.
You now have a reliable, fast, serverless GitHub streak API — fully under your control.