# Lite React App

This is a React application that can run directly from the filesystem without requiring a server. It demonstrates the use of React hooks (useState and useEffect) in a serverless environment.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

3. Open the application:
- Navigate to the `dist` folder
- Double-click on `index.html` to open it in your browser

## Development

To run the development server:
```bash
npm run dev
```

## Features

- Uses React 18
- Implements useState and useEffect hooks
- Works without a server
- Can be opened directly from the filesystem
- No CORS issues
- Bundled with webpack for optimal performance

## How it works

The application is configured to use relative paths (`./`) for all assets, which allows it to work when opened directly from the filesystem. The webpack configuration is set up to generate a bundle that can be used without a server. 