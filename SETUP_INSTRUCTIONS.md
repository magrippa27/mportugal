# Multi-Language Author Website - Setup Instructions

## What's Been Created

Your Astro + TinaCMS starter has been extended with:

### ✅ Multi-Language Support
- English (`/en/*`) and Spanish (`/es/*`) routes
- Language switcher in navigation
- i18n utilities for translations

### ✅ Content Collections
- **Books**: Radio, Tobacco, and Other categories
- **Blog Posts**: With categories and language support
- **Pages**: About pages in both languages

### ✅ Example Content
- 5 books (10 files total, en/es)
- 5 blog posts (10 files total, en/es)
- About pages in both languages

### ✅ New Pages
- Home page (`/[lang]/index.astro`)
- About page (`/[lang]/about.astro`)
- Books index and detail pages
- Blog index, post detail, and category pages
- Radio hub page (`/[lang]/radio/index.astro`)
- Tobacco hub page (`/[lang]/tobacco/index.astro`)

### ✅ Components
- MainLayout with SEO
- SiteHeader with navigation
- SiteFooter
- LanguageSwitcher
- BookCard and PostCard
- MobileNav (React component)

### ✅ Styling
- Tailwind CSS configured
- Custom color palette for readability
- Responsive, accessible design
- Large fonts optimized for older users

## Next Steps

### 1. Regenerate TinaCMS Schema

The TinaCMS schema needs to be regenerated to include the new books collection:

```bash
cd /Users/manufao/Projects/University/mportugal/mportugal
npm run dev
```

This will automatically regenerate the TinaCMS schema files.

### 2. Test the Site

Once the dev server is running:
- Visit `http://localhost:4321` - should redirect to `/en/`
- Check `/en/` and `/es/` versions of all pages
- Test language switcher
- Access TinaCMS admin at `http://localhost:4321/admin`

### 3. Customize Content

Edit content through TinaCMS or directly:
- Books: `src/content/books/*.mdx`
- Blog posts: `src/content/blog/*.mdx`
- About pages: `src/content/page/about.*.mdx`

### 4. Update Placeholders

Replace placeholder content:
- Author name: Search for "Author Name" in `src/i18n/utils.ts`
- Images: Replace placeholder images in `/public/`
- Download URLs: Update `downloadUrl` in book frontmatter

### 5. Git Setup

Initialize and push to your university GitHub:

```bash
cd /Users/manufao/Projects/University/mportugal/mportugal
git init
git config user.name "Your Name"
git config user.email "your.university.email@example.com"
git config core.sshCommand "ssh -i ~/.ssh/id_ed25519_university"
git add .
git commit -m "Initial commit: Multi-language author website"
git remote add origin git@github.com-university:YOUR_USERNAME/mportugal.git
git branch -M main
git push -u origin main
```

## Project Structure

```
mportugal/
├── src/
│   ├── components/
│   │   ├── BookCard.astro
│   │   ├── PostCard.astro
│   │   ├── SiteHeader.astro
│   │   ├── SiteFooter.astro
│   │   ├── LanguageSwitcher.astro
│   │   └── react/
│   │       └── MobileNav.tsx
│   ├── content/
│   │   ├── blog/
│   │   │   ├── *.en.mdx (English posts)
│   │   │   └── *.es.mdx (Spanish posts)
│   │   ├── books/
│   │   │   ├── *.en.mdx (English books)
│   │   │   └── *.es.mdx (Spanish books)
│   │   ├── page/
│   │   │   ├── about.en.mdx
│   │   │   └── about.es.mdx
│   │   └── config.ts
│   ├── i18n/
│   │   └── utils.ts (translations and language utilities)
│   ├── layouts/
│   │   └── MainLayout.astro
│   ├── pages/
│   │   ├── index.astro (redirects to /en/)
│   │   └── [lang]/
│   │       ├── index.astro (home)
│   │       ├── about.astro
│   │       ├── books/
│   │       ├── blog/
│   │       ├── radio/
│   │       └── tobacco/
│   └── styles/
│       └── global.css
├── tina/
│   ├── collections/
│   │   ├── blog.ts (updated with language/categories)
│   │   └── books.ts (new collection)
│   └── config.ts (updated with books collection)
├── tailwind.config.cjs
└── astro.config.mjs

```

## Features

### SEO Optimized
- Meta tags for all pages
- Open Graph and Twitter cards
- Canonical URLs
- Language meta tags

### Accessible
- Semantic HTML5
- ARIA labels
- Keyboard navigation
- High contrast colors
- Large, readable fonts

### Performance
- Static site generation (SSG)
- Minimal JavaScript (only for mobile nav)
- Optimized images
- Fast page loads

### Content Management
- TinaCMS for easy editing
- Git-based workflow
- Markdown/MDX support
- Live preview in admin

## Troubleshooting

### TinaCMS errors
Run `npm run dev` to regenerate the schema

### Build errors
Run `npm install` to ensure all dependencies are installed

### Type errors
Run `npx astro sync` to regenerate type definitions

### Styling issues
Ensure Tailwind CSS is properly configured in `astro.config.mjs`

## Support

For issues or questions, refer to:
- [Astro Documentation](https://docs.astro.build)
- [TinaCMS Documentation](https://tina.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

