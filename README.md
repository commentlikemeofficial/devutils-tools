# DevUtils - Micro-Tools SaaS Platform

A modern, fast, and privacy-focused collection of developer tools built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui.

![DevUtils Screenshot](screenshot.png)

## 🚀 Features

- **LinkedIn Character Counter** - Count characters, words, and preview LinkedIn posts, comments, headlines, and about sections
- **JSON Formatter** - Format, minify, and validate JSON with error highlighting
- **Token Counter** - Estimate GPT-4, Claude, and other LLM token counts using tiktoken-style encoding

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Token Counting:** js-tiktoken

## 📦 Installation

```bash
# Clone the repository
git clone <repo-url>
cd my-app

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 🔧 Build for Production

```bash
# Build static export
npm run build

# Output will be in the `dist` folder
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with default settings

### Static Hosting

The project is configured for static export. Simply upload the `dist` folder to any static hosting provider (Netlify, Cloudflare Pages, GitHub Pages, etc.)

## 📁 Project Structure

```
my-app/
├── app/                    # Next.js app directory
│   ├── tools/             # Tool pages
│   │   ├── linkedin-counter/
│   │   ├── json-formatter/
│   │   └── token-counter/
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── not-found.tsx      # 404 page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── navbar.tsx        # Navigation bar
│   ├── theme-provider.tsx # Dark mode provider
│   └── theme-toggle.tsx   # Theme switcher
├── lib/
│   └── utils.ts          # Utility functions
├── dist/                 # Build output
└── next.config.ts        # Next.js configuration
```

## 🎨 Customization

### Adding a New Tool

1. Create a new folder in `app/tools/[tool-name]/`
2. Add `layout.tsx` with metadata
3. Add `page.tsx` with your tool component
4. Update `components/navbar.tsx` to include the new tool
5. Update `app/page.tsx` to add the tool card

### Theming

The project uses CSS variables for theming. Edit `app/globals.css` to customize colors.

Dark mode is supported out of the box via the theme toggle in the navbar.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com) for the beautiful UI components
- [Next.js](https://nextjs.org) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS
- [js-tiktoken](https://github.com/dqbd/tiktoken) for token counting
