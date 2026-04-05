# Vue Progressive Web App with Vercel Analytics

A Vue 3 progressive web application example with Vercel Web Analytics integration.

## Features

- **Vue 3** - Modern Vue framework with Composition API
- **Vite** - Fast build tool and development server
- **Vercel Web Analytics** - Track page views and user interactions

## Vercel Analytics Integration

This project demonstrates the correct installation of Vercel Web Analytics for Vue applications following the official Vercel documentation.

### Installation Steps

1. Install the @vercel/analytics package:
```bash
npm install @vercel/analytics
```

2. Import and add the Analytics component to your main App.vue:
```vue
<script setup>
import { Analytics } from '@vercel/analytics/vue'
</script>

<template>
  <Analytics />
  <!-- Your app content -->
</template>
```

### Notes

- The Analytics component is added at the root level in `src/App.vue`
- Vue Router is included as it's a peer dependency of @vercel/analytics/vue
- Analytics will automatically track page views and navigation events

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or pnpm package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
vue-pwa-example/
├── src/
│   ├── components/     # Vue components
│   ├── App.vue        # Root component with Analytics
│   └── main.js        # Application entry point
├── public/            # Static assets
├── package.json       # Project dependencies
└── vite.config.js     # Vite configuration
```

## Deployment

This project is ready to be deployed to Vercel. Simply:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect the Vite configuration and deploy

After deployment, enable Vercel Analytics in your project dashboard to start collecting data.

## Documentation

- [Vercel Analytics Quickstart](https://vercel.com/docs/analytics/quickstart)
- [Vue Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)

## License

MIT
