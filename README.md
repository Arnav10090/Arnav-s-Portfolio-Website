<div align="center">

# 🚀 Modern Portfolio Website

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

**A production-ready, high-performance portfolio website built with modern web technologies**

[Live Demo](#) • [Documentation](./DEPLOYMENT.md) • [Report Bug](#) • [Request Feature](#)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎨 **Design & UX**
- ⚡ Lightning-fast performance
- 📱 Fully responsive design
- 🌓 Dark/Light theme support
- ✨ Smooth animations & transitions
- 🎯 Modern, clean UI/UX

</td>
<td width="50%">

### 🛠️ **Technical Excellence**
- ♿ WCAG 2.1 AA accessibility
- 🚀 Optimized Core Web Vitals
- 🔒 Enterprise-grade security
- 📊 Built-in analytics
- 🌐 SEO optimized

</td>
</tr>
</table>

---

## 🏗️ Tech Stack

<div align="center">

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **UI Library** | React 19 |
| **Icons** | React Icons |
| **Analytics** | Vercel Analytics & Speed Insights |
| **Deployment** | Vercel |
| **Email** | Formspree Integration |

</div>

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm installed
- Git for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio-website.git

# Navigate to project directory
cd portfolio-website

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## 📁 Project Structure

```
portfolio-website/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/
│   │   ├── layout/            # Header, Footer
│   │   ├── sections/          # Hero, About, Projects, etc.
│   │   └── ui/                # Reusable UI components
│   ├── contexts/              # React contexts (Theme)
│   ├── data/                  # Content & configuration
│   └── lib/                   # Utilities & helpers
├── public/                     # Static assets
│   ├── images/                # Images & media
│   └── resume/                # Resume PDF
└── ...config files
```

---

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at `localhost:3000` |
| `npm run build` | Create optimized production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Run TypeScript type checking |

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Contact Form
NEXT_PUBLIC_FORMSPREE_ENDPOINT=your_formspree_endpoint
PORTFOLIO_OWNER_EMAIL=your-email@example.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Analytics (Optional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=
```

> 💡 See `.env.example` for a complete template

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

<div align="center">

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

</div>

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy! 🎉

**Automatic Features:**
- ✅ CI/CD pipeline
- ✅ Preview deployments for PRs
- ✅ Custom domain support
- ✅ SSL certificates
- ✅ Global CDN

📖 **Detailed Guide:** See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment instructions.

---

## 🎨 Customization

### Update Content

Edit files in `src/data/`:
- `metadata.ts` - Site metadata & SEO
- `projects.ts` - Project showcase
- `experience.ts` - Work experience
- `skills.ts` - Skills & technologies
- `contact.ts` - Contact information

### Modify Styling

- **Colors:** Edit `tailwind.config.ts`
- **Components:** Modify files in `src/components/`
- **Theme:** Update `src/contexts/ThemeContext.tsx`

---

## 📊 Performance

<div align="center">

| Metric | Score |
|--------|-------|
| Performance | 🟢 95+ |
| Accessibility | 🟢 100 |
| Best Practices | 🟢 100 |
| SEO | 🟢 100 |

*Lighthouse scores on production build*

</div>

---

## 🔒 Security

- ✅ Security headers configured
- ✅ Input validation & sanitization
- ✅ Environment variables protection
- ✅ No sensitive data exposure
- ✅ HTTPS enforced

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💬 Contact

Have questions or suggestions? Feel free to reach out!

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yourusername)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/yourusername)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:your-email@example.com)

</div>

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ using Next.js

</div>
