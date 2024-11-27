# Modern React Application with Vite

A modern React application built with Vite, featuring lightning-fast HMR (Hot Module Replacement), optimized builds, and a modern development experience.

## About Vite

Vite (French word for "fast", pronounced `/vit/`) is a modern build tool that significantly improves the development experience. Created by Evan You (creator of Vue.js), Vite offers:

- **Lightning Fast Cold Start**: Leverages native ES modules to avoid bundling during development
- **Instant Hot Module Replacement (HMR)**: Updates your app without refreshing the page
- **True On-Demand Compilation**: Only compiles what's needed, when needed
- **Optimized Build**: Uses Rollup for highly optimized production builds
- **Out-of-the-box Support**: Includes support for TypeScript, JSX, CSS, and more

## Features

- **Vite Dev Server** - Lightning-fast development with HMR
- **React 18** - Latest React features and improvements
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Axios** - HTTP requests handling
- **React Icons** - Comprehensive icon library
- **React Loader Spinner** - Loading animations

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (version 14.0.0 or higher)
- npm (version 6.0.0 or higher)

## Getting Started with Vite

This project was bootstrapped with Vite using the following command:
```bash
npm create vite@latest my-react-app -- --template react
```

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd react-app
```

2. Install dependencies:
```bash
npm install
```

## Dependencies

Here are the main dependencies used in this project:

- **React** (v18.3.1) - A JavaScript library for building user interfaces
- **React DOM** (v18.3.1) - React package for DOM rendering
- **React Router DOM** (v6.28.0) - Declarative routing for React applications
- **Axios** (v1.7.7) - Promise-based HTTP client
- **React Icons** (v5.3.0) - Popular icon libraries
- **React Loader Spinner** (v4.0.0) - Loading animations
- **Tailwind CSS** (v3.4.14) - Utility-first CSS framework

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode with Vite's dev server.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.
- Features instant HMR (Hot Module Replacement)
- No bundling during development
- Instant server start

### `npm run build`

Builds the app for production to the `dist` folder.
- Optimized with Rollup
- Code splitting out of the box
- CSS minification and optimization

### `npm run preview`

Locally preview the production build.
- Serves the production build locally
- Useful for testing the build before deployment

## Project Structure

```
react-app/
  ├── dist/              # Production build files
  ├── node_modules/      # Dependencies
  ├── public/            # Public assets
  ├── src/              # Source files
  │   ├── controllers/  # Business logic and API calls
  │   ├── models/       # Data models and types
  │   ├── utils/        # Utility functions
  │   ├── views/        # UI components and pages
  │   ├── App.css      # Main stylesheet
  │   ├── App.jsx      # Main App component
  │   ├── index.css    # Global styles
  │   └── main.jsx     # Application entry point
  ├── .gitignore       # Git ignore file
  ├── eslint.config.js # ESLint configuration
  ├── index.html       # HTML entry point
  ├── package.json     # Project dependencies and scripts
  ├── package-lock.json # Locked dependencies
  ├── README.md        # Project documentation
  └── vite.config.js   # Vite configuration
```

## Vite Configuration

The `vite.config.js` file in your project root contains Vite-specific configurations:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  // Add any other custom configurations here
})
```

## Development with Vite

### Hot Module Replacement (HMR)
- Changes to React components are instantly reflected
- Preserves component state during updates
- No page reload needed for most changes

### Development Server Features
- Native ESM-based dev server
- Automatic port detection
- Network access for testing on other devices
- HTTPS support with automatic certificates

## Building for Production

When running `npm run build`, Vite:
1. Bundles your code with Rollup
2. Applies optimizations like:
   - Code splitting
   - Tree shaking
   - Asset optimization
   - CSS minification
3. Generates static assets in the `dist` folder

## Usage

1. Create new components in the `src/views` directory
2. Add business logic in `src/controllers`
3. Define data models in `src/models`
4. Add utility functions in `src/utils`
5. Configure routes in `App.jsx`
6. Use Tailwind CSS for styling
7. Utilize react-icons for icons
8. Implement loading states using react-loader-spinner
9. Make API calls using axios in controllers

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Support

For support, email <pavank@qtiminds.com> , <shivak@qtiminds.com> or open an issue in the repository.