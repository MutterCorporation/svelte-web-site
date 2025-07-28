# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server (runs on port 5175)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking and validation
npm run check
npm run check:watch

# Code quality
npm run lint     # ESLint + Prettier check
npm run format   # Auto-format with Prettier

# Testing
npm run test     # Playwright e2e tests

# Storybook (component documentation)
npm run storybook      # Dev server on port 6006
npm run build-storybook
```

## Architecture Overview

This is a **SvelteKit application** for MutterCorp, a technology company specializing in AI/ML solutions and business applications. The project uses **Svelte 5 with runes** (experimental) and follows a modular architecture.

### Key Technologies
- **SvelteKit** with Svelte 5 runes (experimental)
- **TailwindCSS** + **Flowbite** for styling
- **Playwright** for e2e testing
- **Storybook** for component documentation
- **Vite** as build tool with proxy to backend on port 3001

### Project Structure

```
src/
├── routes/                    # SvelteKit file-based routing
│   ├── +layout.svelte        # Global layout with navigation
│   ├── +page.svelte          # Homepage
│   ├── admin/                # Admin dashboard pages
│   ├── blog/                 # Blog system with tenant support
│   │   └── [tenantCode]/     # Multi-tenant blog structure
│   ├── solucoes/             # Solution pages (Portuguese)
│   └── login/                # Authentication
├── components/               # Reusable Svelte components
├── lib/                      # Utilities, stores, and i18n
│   ├── i18n/                # Internationalization (pt-br, en)
│   └── *Store.js            # Svelte stores (theme, cart, toast)
└── services/                 # API services and business logic
    └── services/             # Core service infrastructure
```

### Service Architecture

The application now uses **simple, page-specific services** for better maintainability:
- **Page-level services**: Each route has its own `service.js` file
- **Simple functions**: Direct API calls without complex abstractions  
- **Easy to understand**: Clear, focused functions for specific features
- **No dependencies**: Each service is self-contained and independent

#### Service Locations:
- `/src/routes/service.js` - Homepage services (contact, stats)
- `/src/routes/blog/service.js` - Blog services (fetchBlogPost, fetchSinglePost)
- `/src/routes/admin/service.js` - Admin services (leads, projects)
- `/src/routes/login/service.js` - Auth services (login, logout)
- `/src/routes/solucoes/service.js` - Solutions services
- `/src/routes/task-doro/service.js` - Pomodoro timer services
- `/src/routes/solucoes/cryptostomp/service.js` - Crypto analysis services

### Key Features

1. **Multi-tenant Blog System**: Support for tenant-specific blog content via `[tenantCode]` routing
2. **Admin Dashboard**: Complete admin interface with product management, lead tracking
3. **Theme System**: Dark/light mode with CSS variables and `themeStore.js`
4. **Internationalization**: Portuguese/English support via `lib/i18n/`
5. **Special Applications**: CryptoStomp (crypto analysis), Task-doro (Pomodoro timer)

### API Integration

- **Backend proxy**: Vite proxies `/api` to `localhost:3001`
- **External APIs**: Integration with Google Trends, Worldcoin, Vercel Analytics
- **Authentication**: Token-based auth with secure storage

### Styling Approach

- **TailwindCSS** with Flowbite components
- **CSS custom properties** for theming in `app.css`
- **Responsive design** with mobile-first approach
- **Accessibility features**: Skip links, focus management, reduced motion support

### Configuration Notes

- **Svelte 5 runes enabled** in `svelte.config.js`
- **TypeScript support** via JSDoc (`.d.ts` files)
- **ESLint + Prettier** for code quality
- **Playwright** configured for production build testing

### Development Workflow

1. Use `npm run dev` for development (port 5175)
2. Run `npm run check` before committing for type safety
3. Use `npm run lint` to ensure code quality
4. Test with `npm run test` (Playwright e2e)
5. Admin routes hide navigation, login routes have special handling

### Special Route Handling

- **Navigation hiding**: Admin (`/admin/*`) and login (`/login`) routes hide header/footer
- **SEO optimization**: Canonical URLs, meta tags in `+layout.svelte`
- **PWA support**: Meta tags and theme configuration included