# Subtraction Learning App - Offline Version

This is a completely offline React application for learning subtraction concepts. The app runs entirely in the browser without any build tools or CDN dependencies.

## Features

- **Completely Offline**: No internet connection required after initial download
- **No Build Process**: Uses Babel browser transform for JSX compilation
- **No CDN Dependencies**: All React, ReactDOM, and Babel files are included locally
- **Interactive Learning**: Step-by-step subtraction learning with visual car examples

## How to Run

1. **Simple File Opening**: Just open `index.html` in any modern web browser
2. **Local Server** (recommended): 
   - Python: `python -m http.server 8000`
   - Node.js: `npx serve .`
   - Any other local server

3. Navigate to `http://localhost:8000` in your browser

## File Structure

```
├── index.html              # Main HTML file with React/Babel scripts
├── styles.css              # Combined CSS styles
├── App.js                  # Main App component
├── Outlet.js               # Router-like component
├── main.js                 # Application initialization
├── components/             # React components
│   ├── Car.js
│   ├── CarTwo.js
│   ├── CrossIcon.js
│   ├── ErrorMessage.js
│   ├── ErrorMessageKeypad.js
│   ├── FirstPages.js
│   ├── Keypad.js
│   └── Main.js
├── src/assets/             # Images and assets
│   ├── bg.png
│   ├── car.png
│   └── hint.png
├── react.development.js    # React library
├── react-dom.development.js # ReactDOM library
└── babel.min.js           # Babel for JSX transformation
```

## How It Works

1. **React & ReactDOM**: Loaded from local files instead of CDN
2. **Babel Browser Transform**: Compiles JSX syntax in the browser
3. **Component Loading**: Each component is loaded as a separate script with `type="text/babel"`
4. **Global Scope**: Components are attached to `window` object for cross-component access

## Learning Flow

1. **Introduction**: Shows 5 cars and explains subtraction concept
2. **Interactive Step**: Click on 3 cars to cross them out
3. **Counting**: Use keypad to enter the number of remaining cars
4. **Validation**: Get feedback and proceed to next challenge

## Browser Compatibility

- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge (recent versions)
- Babel handles JSX transformation in real-time

## No Dependencies Required

- ✅ No npm install
- ✅ No build process
- ✅ No internet connection
- ✅ No CDN calls
- ✅ Works offline completely