# Joby - Job Search Assistant

A Next.js application that helps you find and manage job opportunities.

## Project Structure

```
job-agent-app/
├── pages/         # Next.js pages and API routes
│   └── api/       # Backend API routes
│   └── index.js   # Main page
├── components/    # Reusable React components
├── scrapers/      # Web scraping scripts
│   └── linkedin/  # LinkedIn scraper
├── lib/           # Utility functions
├── public/        # Static files
├── styles/        # CSS styles
├── .gitignore
├── next.config.js
├── package.json
└── README.md
```

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Job search across multiple platforms
- Automated job application tracking
- Customizable job alerts
- Resume management
- Application status tracking

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- Puppeteer (for web scraping)
- Vercel (for deployment)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
